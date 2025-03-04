import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.user);

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const response = await axios.post(`http://localhost:5000/api/users/login`, { email, password });
            dispatch(loginSuccess({ user: response.data.user, token: response.data.token }));
            localStorage.setItem('authToken', response.data.token);
            navigate('/restaurants');
        } catch (error) {
            dispatch(loginFailure(error.response?.data?.message || 'Login Failed'))
        }
    };

    return (
        <div className="form-container">
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input style={{ width: "215px", height: "30px" }}
                            type="email"
                            required
                            name="email"
                            placeholder="Enter Email ID..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input style={{ width: "215px", height: "30px" }}
                            type={passwordShown ? "text" : "password"}
                            required
                            name="password"
                            placeholder="Enter Password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i onClick={togglePassword}>
                            {passwordShown ? (
                                <AiOutlineEye />
                            ) : (
                                <AiOutlineEyeInvisible />
                            )}
                        </i>
                    </div>
                    <div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in' : "Login"}
                        </button>
                        {error && <p className="error">{error}</p>}
                    </div>
                </form>
                <span>Don't have account?</span>
                <Link to="/register">
                    Click here!
                </Link>
            </div>
        </div>
    )
}

export default Login;