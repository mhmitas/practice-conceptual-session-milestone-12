import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from "react-hook-form"
import axios from 'axios'
import useAuth from '../../hooks/useAuth'
import { ImSpinner2 } from "react-icons/im";
import toast from 'react-hot-toast'
import { saveUserInDb } from '../../api/utils/utils'

const SignUp = () => {
  const navigate = useNavigate()
  const { createUser, updateUserProfile, signInWithGoogle, loading, setLoading } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (userData) => {
    try {
      // taking image for upload.
      const formData = new FormData()
      // First e file nite vul hoyechilo
      formData.append('image', userData.image[0])
      // uploading at imgBB and get link
      // Always use POST when uploading local files
      let imageUrl;
      if (userData.image[0]) {
        const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
        imageUrl = data.data?.display_url;
      }
      // Sign up using email and password;
      const result = await createUser(userData.email, userData.password)
      // console.log(result.user);
      // update user profile
      await updateUserProfile(userData.name, imageUrl)
      navigate('/')
      //  save user in DB  
      await saveUserInDb(result.user)
      toast.success('Sign up successfull')
    }
    catch (err) {
      console.error(err);
      toast.error(err.message)
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    try {
      const result = await signInWithGoogle()
      // console.log(result.user);
      await saveUserInDb(result.user)
      navigate('/')
      toast.success('Sign up successfull')
    }
    catch (err) {
      console.error(err);
      toast.error(err.message)
      setLoading(false)
    }
  }


  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 shadow-xl text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to StayVista</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                {...register("name")}
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                // required
                type='file'
                {...register("image")}
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                {...register("email")}
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                {...register("password")}
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading && true}
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white disabled:cursor-wait'
            >
              {loading ? <ImSpinner2 className='animate-spin m-auto' size={23} /> : 'Continue'}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <button
          onClick={handleGoogleSignIn}
          disabled={loading && true}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer disabled:cursor-wait'>
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-blue-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
