import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook'

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
            console.log(e);
        }
    }

    const loginHandler = async () => {
    try {
        const data = await request('/api/auth/login', 'POST', {...form})
        auth.login(data.token, data.userId)
    } catch (e) {}
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>short link</h1>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">Authorization</span>

                    <div className="input-field">
                        <input 
                            id="email" 
                            type="text" 
                            className="yellow-input"
                            name='email'
                            onChange={changeHandler}
                        />
                        <label htmlFor="email">email</label>
                    </div>


                    <div className="input-field">
                        <input 
                            id="password" 
                            type="password" 
                            className="yellow-input"
                            name='password'
                            onChange={changeHandler}
                        />
                        <label htmlFor="email">password</label>
                    </div>

                    </div>
                    <div className="card-action">
                        <button 
                            className='btn yellow darken-4' 
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            log in
                        </button>
                        <button 
                            className='btn grey lighten-1 black-text'
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage