import React, { useState } from "react";
import { registerFailure, registerStart, registerSuccess } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import axios from "axios";
import '../css/login.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: 'customer'
    });
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch(registerStart());
        try {
            const response = await axios.post('http://localhost:5000/api/users/register_user', formData);
            dispatch(registerSuccess({ user: response.data.user, token: response.data.token }));
            localStorage.setItem('authToken', response.data.token);
            navigate('/');
        } catch (error) {
            dispatch(registerFailure(error.response?.data?.message || 'Registration Failed'))
        }
    }
    return (
        <div className="form-container">
            <div>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Username</label>
                        <input style={{ width: "215px", height: "30px" }}
                            type="text"
                            required
                            name="username"
                            placeholder="Enter Name..."
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input style={{ width: "215px", height: "30px" }}
                            type="email"
                            required
                            name="email"
                            placeholder="Enter Email ID..."
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input style={{ width: "215px", height: "30px" }}
                            type={passwordShown ? "text" : "password"}
                            required
                            name="password"
                            placeholder="Enter Password..."
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <i onClick={togglePassword}>
                            {passwordShown ? (
                                <AiOutlineEye />
                            ) : (
                                <AiOutlineEyeInvisible />
                            )}
                        </i>
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input style={{ width: "215px", height: "30px" }}
                            type="text"
                            required
                            name="phone"
                            placeholder="Enter Contact Number..."
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input style={{ width: "215px", height: "30px" }}
                            type="text"
                            required
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select style={{ width: "215px", height: "30px" }}
                            name="role"
                            value={formData.role}
                            onChange={handleChange}>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-secondary mt-2 p-5 pt-2 pb-2" type="submit" disabled={loading}>
                            {loading ? 'Registering..' : 'Register'}
                        </button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </form>
                <span>Don't have account?</span>
                <Link to="/">
                    Click here!
                </Link>
            </div>
        </div>
    );
}

export default Register;