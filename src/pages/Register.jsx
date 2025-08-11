import { useState } from "react";
import { apiUrl } from "../config/url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
       const navigate =useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(`${apiUrl}/register`, {
                name,
                email,
                password,
                password_confirmation,
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
                    <h2 className="text-center text-2xl font-bold">Register</h2>
                    {error && <p className="text-error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
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
                        <div className="form-control">
                            <label className="label">Confirm Password</label>
                            <input
                                type="password"
                                className="input input-bordered"
                                value={password_confirmation}
                                onChange={(e) =>
                                    setPasswordConfirmation(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <a href="/login" className="link link-primary">
                            Already have an account?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
