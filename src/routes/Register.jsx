import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { APIURLConfig } from "../config";
import { CreateStatusCookie } from '../config/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
    const navigate = useNavigate();
    const navLanding = () => navigate("/");
    const kebijakan = () => navigate("/kebijakan");

    CreateStatusCookie("Register User")

    const failed = () => toast.warning("Registration Failed! User may already exist!");

    const initialFormData = Object.freeze({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        is_alumni: 0,
        password: ""
    });

    const [formData, updateFormData] = useState(initialFormData);
    const handleChange = (e) => {
        // ... get data form    
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    }
    console.log(formData);
    // console.log(APIURLConfig.baseurl+APIURLConfig.loginendpoint)
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(formData);
        // ... submit to RestAPI using fetch api
        const response = await fetch(APIURLConfig.baseurl + APIURLConfig.registerendpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data["code"] === "success") {
                    navLanding()
                } else {
                    failed()
                }
            })
    }

    return (
        <>
            <div className="h-full w-full flex flex-col justify-around bg-landing-bg2 bg-cover">
                <div className="flex flex-row flex-wrap gap-8 justify-center items-center align-middle text-white">
                    <div>
                        <form className="w-96" method="post">
                            <div className="flex flex-col items-center rounded-lg bg-slate-900 py-6 px-4 gap-4">
                                <h2 className="text-slate-500 font-bold text-2xl mb-4">KartUNS Register</h2>
                                <div className="w-full">
                                    <input className="rounded-sm h-8 text-slate-800 w-full" type="text" name="username" placeholder=" Username" onChange={handleChange} />
                                </div>
                                <div className="w-full">
                                    <input className="rounded-sm h-8 text-slate-800 w-full" type="text" name="first_name" placeholder=" First name" onChange={handleChange} />
                                </div>
                                <div className="w-full">
                                    <input className="rounded-sm h-8 text-slate-800 w-full" type="text" name="last_name" placeholder=" Last name" onChange={handleChange} />
                                </div>
                                <div className="w-full">
                                    <input className="rounded-sm h-8 text-slate-800 w-full" type="text" name="email" placeholder=" Email" onChange={handleChange} />
                                </div>
                                <div className="w-full flex justify-between items-center gap-x-6">
                                    <label className="text-white">Alumni?</label>
                                    <select name="is_alumni" className="text-slate-600" onChange={handleChange} >
                                        <option name="is_alumni" value={0} >No</option>
                                        <option name="is_alumni" value={1}>Yes</option>
                                    </select>
                                </div>
                                <div className="w-full flex justify-between items-center gap-x-6">
                                    <label className="text-white">Mahasiswa Arsitektur UNS aktif?</label>
                                    <select name="is_mhsarsuns" className="text-slate-600" onChange={handleChange} >
                                        <option name="is_mhsarsuns" value={0} >No</option>
                                        <option name="is_mhsarsuns" value={1}>Yes</option>
                                    </select>
                                </div>
                                <div className="w-full">
                                    <input className="rounded-sm h-8 text-slate-800 w-full" type="password" name="password" placeholder=" Password" onChange={handleChange} />
                                </div>
                                <button className="bg-green-500 py-2 px-4 rounded-md text-white font-bold w-full mt-2" type="submit" value="Register" onClick={handleSubmit}>Register</button>
                                <div className="flex gap-4 justify-between mt-4">
                                    <p className="text-white">Sudah punya akun?</p>
                                    <button className="text-cyan-600 font-bold" onClick={navLanding} >Login</button>
                                </div>
                                <button className="text-sm text-slate-500" onClick={kebijakan}>
                                    *) Kebijakan privasi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}