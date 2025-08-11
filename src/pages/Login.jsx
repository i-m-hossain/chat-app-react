import { useState } from "react";
import { apiUrl } from "../config/url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try{
            const response = await axios.post(`${apiUrl}/login`, {
                email,
                password
            });
            localStorage.setItem("token", response.data.access_token);
            navigate('/')
        } catch {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>
                    {error && <p className="text-error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Password</label>
                            <input
                                type="password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <a href="/register" className="link link-primary">
                            Create an account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
