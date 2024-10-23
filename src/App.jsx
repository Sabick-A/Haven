import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { login, logout } from "./store/authSlice";
import authService from "./appwrite/auth";
import { Container, Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <Header />
            <>
                {loading ? (
                    <div className="text-center flex-grow flex-col gap-4 w-full flex items-center justify-center">
                        <div class="w-40 h-40 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                            <div class="w-40 h-40 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow">
                        <Outlet />
                    </div>
                )}
            </>
            <Footer />
        </Container>
    );
}

export default App;
