import React from "react";
import { Container } from "../";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate=useNavigate()

    const navItems = [
        {
            name: "Dashboard",
            slug: "/",
            active: true,
            svg: (
                <svg
                    className="lucide lucide-rocket text-cyan-500 dark:text-cyan-400"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#06B6D4"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="33"
                    width="33"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
            ),
        },
        {
            name: "Articles",
            slug: "/articles",
            active: true,
            svg: (
                <svg
                    className="lucide lucide-newspaper text-blue-400 dark:text-blue-600"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#60A5FA"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="33"
                    width="33"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                    <path d="M18 14h-8"></path>
                    <path d="M15 18h-5"></path>
                    <path d="M10 6h8v4h-8V6Z"></path>
                </svg>
            ),
        },
        {
            name: "Notes",
            slug: "/notes",
            active: true,
            svg: (
                <svg
                    className="lucide lucide-sticky-note text-yellow-400 dark:text-yellow-600"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#FACC14"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="33"
                    width="33"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"></path>
                    <path d="M15 3v6h6"></path>
                </svg>
            ),
        },
        {
            name: "Reviews",
            slug: "/reviews",
            active: true,
            svg: (
                <svg
                    className="lucide lucide-star text-orange-400 dark:text-orange-600"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#FB923C"
                    fill="#FB923C"
                    viewBox="0 0 24 24"
                    height="33"
                    width="33"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
            ),
        },
    ];

    const authItems = [
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
    ];
    return (
        <Container>
            <nav className="flex w-full justify-between px-20 py-12 items-center bg-white">
                <h1 className="text-2xl text-gray-800 font-bold">Haven</h1>
                <div className="flex items-center gap-14 navItems">
                    {navItems.map((item) =>
                        item.active ? (
                            <button onClick={()=>navigate(item.slug)} key={item.name} className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-3  text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#FACC14] h-12 rounded-md px-5">
                                {item.svg}
                                {item.name}
                            </button>
                        ) : null
                    )}
                </div>
                <div className="auth flex items-center gap-14">
                    {authItems.map((item)=>
                        item.active?(
                            <button onClick={()=>navigate(item.slug)} key={item.name} className="w-[125px] bg-black h-[45px] my-4.5 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                                {item.name}
                            </button>
                        ):null
                    )}

                    {
                        authStatus&& (
                            <LogoutBtn />
                        )
                    }
                </div>
            </nav>
        </Container>
    );
}

export default Header;
