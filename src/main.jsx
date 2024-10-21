import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import store from './store/store.js'
import { AuthLayout, Login,NewPost,PostCard,SignUp } from './components/index.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
          path:"/",
          element:<PostCard/>
        },
        {
          path:"/login",
          element:<Login/>,
          children:[

          ]
        },
        {
          path:"/signup",
          element:<SignUp/>,
          children:[

          ]
        },
        {
          path:"/post",
          element: <AuthLayout ><NewPost/></AuthLayout>,
          children:[

          ]
        }
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
