import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import DashBoard from './DashBoard'
import AddRoom from '../pages/dashboard/host/add-room/AddRoom'
import PrivateRoute from './PrivateRoute'
import MyListings from '../pages/dashboard/host/my-listing/MyListings'
import ManageUsers from '../pages/dashboard/admin/ManageUsers'
import HostRoutes from './HostRoutes'
import AdminRoutes from './AdminRoutes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <RoomDetails />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashBoard /></PrivateRoute>,
    children: [
      // host related routes
      {
        path: 'add-room',
        element: <PrivateRoute>
          <HostRoutes>
            <AddRoom />
          </HostRoutes>
        </PrivateRoute>
      },
      {
        path: 'my-listings',
        element: <PrivateRoute>
          <HostRoutes>
            <MyListings />
          </HostRoutes>
        </PrivateRoute>
      },
      // Admin related routes
      {
        path: 'manage-users',
        element: <AdminRoutes>
          <ManageUsers />
        </AdminRoutes>
      },

    ]
  }
])
