import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";


function LogoutBtn() {

    const dispatch = useDispatch();
    const logouthandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        }).catch((error)=>{
            console.log(error);
            throw error;
        });
    }
    return (
        <button
            onClick={logouthandler}
            className="w-[125px] bg-black h-[45px] my-4.5 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
        >
           Logout
        </button>
    );
}

export default LogoutBtn;
