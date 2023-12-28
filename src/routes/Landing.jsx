import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { APIURLConfig } from "../config";
import { SaveCookie, ReadCookie, SaveCookieLocal, ReadCookieLocal, delay } from "../config/utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Landing = () => {
    const navigate = useNavigate();
    const navRegister = () => navigate("/register");
    const kebijakan = () => navigate("/kebijakan");
    const home = () => navigate("/home");
    const landing = () => navigate("/")
    const [loggingin, setLoggingIn] = useState(false)
    const [sessionstatus, setSessionStatus] = useState("")

    const cookie = ReadCookieLocal()

    const success = (msg) => toast.success(msg)
    const failed = (msg) => toast.warning(msg);

    const cekToken = async (id) => {
        const response = await fetch(APIURLConfig.baseurl + APIURLConfig.userendpoint + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                return data
            })
            .catch(e => failed(e.message))
        return response
    }

    const initialFormData = Object.freeze({
        username: "",
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
    // console.log(APIURLConfig.baseurl+APIURLConfig.loginendpoint)
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(formData);
        // ... submit to RestAPI using fetch api
        setLoggingIn(true)
        const response = await fetch(APIURLConfig.baseurl + APIURLConfig.loginendpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data["code"] === "success") {
                    // SaveCookie(data)
                    console.log(data)
                    SaveCookieLocal(data)
                    let cookie = ReadCookieLocal()
                    if (cookie.iduser !== undefined) {
                        success("Logging in...")
                        delay(1000).then(() => home());
                    } else {
                        failed("Failed creating cookie")
                    }
                } else {
                    failed("Login Failed! Check your username and password")
                }
            })
            .catch(e => failed(e.message + " Make sure you are connected to internet!"))
    }

    useEffect(() => {
        if (cookie && cookie.token !== undefined && cookie.token !== null && cookie.token !== "") {
            cekToken(cookie.iduser)
                .then((isi) => setSessionStatus(isi.code))
                .catch((e) => console.log(e))
            if (sessionstatus === "success") {
                home()
            } else {
                landing()
            }
        } else {
            landing()
        }
    }, [sessionstatus])

    return (
        <>
            <div className="h-full w-full flex flex-col justify-around bg-landing-bg2 bg-cover">
                <div className="flex flex-row flex-wrap gap-8 justify-center items-center align-middle text-white">
                    <div>
                        <form className="w-96" method="post">
                            <div className="flex flex-col items-center rounded-lg bg-slate-900 py-6 px-4 gap-4">
                                <h2 className="text-slate-500 font-bold text-2xl mb-4">KartUNS Login</h2>
                                <div className="w-full">
                                    <input className="rounded-sm h-8 text-slate-800 w-full" type="text" name="username" placeholder=" Username" onChange={handleChange} />
                                </div>
                                <div className="w-full">
                                    <input className="rounded-sm h-8 text-slate-800 w-full" type="password" name="password" placeholder=" Password" onChange={handleChange} />
                                </div>
                                <input className="bg-green-500 py-2 px-4 rounded-md text-white font-bold w-full mt-2" type="submit" value="Login" onClick={handleSubmit} />
                                <div className="flex gap-4 justify-between mt-4">
                                    <p className="text-white">Belum punya akun?</p>
                                    <button className="text-cyan-600 font-bold" onClick={navRegister} >Daftar</button>
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