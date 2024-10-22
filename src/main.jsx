import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./store/store.js";
import {
    AllPosts,
    AuthLayout,
    EditPost,
    Login,
    MyPosts,
    NewPost,
    Page404,
    ShowPost,
    SignUp,
} from "./components/index.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // Public Routes
            { index: true, element: <AllPosts /> }, // Default route for "/"
            { path: "login", element: <AuthLayout authentication={false}><Login /></AuthLayout>  },
            { path: "signup", element: <AuthLayout authentication={false}><SignUp /></AuthLayout> },

            // Post Routes
            { path: "post", element: <AuthLayout authentication={true}><MyPosts /></AuthLayout> },
            { path: "post/new", element: <AuthLayout authentication={true}> <NewPost /> </AuthLayout>},
            { path: "post/:slug", element: <ShowPost /> },
            { path: "post/edit/:slug", element: <AuthLayout authentication={true}> <EditPost /></AuthLayout> },

            //404 Route
            { path: "*", element: <Page404/> },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
