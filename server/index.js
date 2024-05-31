const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const stripe = require('stripe')(process.env.STRIPE_SK)

const port = process.env.PORT || 8000

// middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

// Verify Token Middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token
  // console.log(token)
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: 'unauthorized access' })
    }
    req.user = decoded
    next()
  })
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jt5df8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// const uri = `mongodb://localhost:27017`
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

const database = client.db('stay_vista')
const roomColl = database.collection('rooms')
const userColl = database.collection('users')
const bookingColl = database.collection('bookings')

async function run() {
  try {
    // verify admin middleware
    async function verifyAdmin(req, res, next) {
      const user = req.user
      const query = { email: user?.email }
      const result = await userColl.findOne(query)
      if (!result || result?.role !== 'admin') {
        return res.status(401).send({ message: 'unauthorized access' })
      }
      next()
    }

    // verify Host middleware
    async function verifyHost(req, res, next) {
      const user = req.user
      const query = { email: user?.email }
      const result = await userColl.findOne(query)
      if (!result || result?.role !== 'host') {
        return res.status(401).send({ message: 'unauthorized access' })
      }
      next()
    }


    // UI related APIs
    // get rooms from db
    app.get('/rooms', async (req, res) => {
      const category = req.query.category
      let query = {}
      if (category && category !== 'null') {
        query = { category: category }
      }
      const result = await roomColl.find(query).toArray()
      res.send(result)
    })

    // get room detail
    app.get('/rooms/detail/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await roomColl.findOne(query)
      res.send(result)
    })

    // users related APIs
    // save users in Database when they register in the app
    app.put('/user', async (req, res) => {
      const user = req.body
      const query = { email: user?.email }
      const isExists = await userColl.findOne(query)
      if (isExists) {
        if (user?.status === 'requested') {
          const updateDoc = { $set: { status: user?.status } }
          const result = await userColl.updateOne(query, updateDoc)
          return res.send(result)
        } else {
          return res.send({ isExists })
        }
      }
      // if new user save in db
      const userDoc = { $set: { ...user, timestamp: Date.now() } }
      const options = { upsert: true }
      const result = await userColl.updateOne(query, userDoc, options)
      res.send(result)
    })

    // get a user by email for checking user role
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email
      const query = { email: email }
      const result = await userColl.findOne(query)
      res.send(result)
    })


    // host related and accessible by host APIs
    // get all rooms added by host
    app.get('/rooms/:email', verifyToken, verifyHost, async (req, res) => {
      const email = req.params.email
      const query = { 'host.email': email }
      const result = await roomColl.find(query).toArray();
      res.send(result)
    })

    // save a room in db
    app.post('/rooms', verifyToken, verifyHost, async (req, res) => {
      const roomData = req.body;
      const result = await roomColl.insertOne(roomData)
      res.send(result)
    })

    // delete room by the host
    app.delete('/room/:id', verifyToken, verifyHost, async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await roomColl.deleteOne(query)
      res.send(result)
    })


    // Admin related APIs
    // update user role
    app.patch('/user/update-role/:email', verifyToken, verifyAdmin, async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email: email }
      const updateDoc = { $set: { ...user, timestamp: Date.now() } }
      const result = await userColl.updateOne(query, updateDoc)
      res.send(result)
    })

    app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
      const result = await userColl.find().toArray()
      res.send(result)
    })


    // save booking data in database
    app.post('/bookings', async (req, res) => {
      const bookingData = req.body
      const updateDoc = { $set: bookingData }
      const result = await bookingColl.insertOne(updateDoc)
      res.send(result)
    })


    // stripe api
    app.post('/create-payment-intent', async (req, res) => {
      const price = parseFloat(req.body.price) * 100
      if (price < 1) { return }
      // create payment intent with the order amount and currency
      const { client_secret } = await stripe.paymentIntents.create({
        amount: price,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.send({ clientSecret: client_secret })
    })


    // auth related api
    app.post('/jwt', async (req, res) => {
      const user = req.body
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '365d',
      })
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true })
    })
    // Logout
    app.get('/logout', async (req, res) => {
      try {
        res
          .clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true })
        console.log('Logout successful')
      } catch (err) {
        res.status(500).send(err)
      }
    })


    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello from StayVista Server..')
})

app.listen(port, () => {
  console.log(`StayVista is running on port ${port}`)
})
