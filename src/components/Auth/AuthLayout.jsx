import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children }) {
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    useEffect(() => {
        if (authStatus) {
            navigate("/");
        } else {
            navigate("/login");
        }
        setLoader(false);
    }, [authStatus, navigate]);
    return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
