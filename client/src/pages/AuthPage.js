import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, [])

    return (
        <div>
            <h1>Auth</h1>
        </div>
    )
}

export default AuthPage