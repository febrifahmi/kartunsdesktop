import { useState } from "react";
import { ReadCookieLocal, resizeImage } from "../config/utils"
import { ShowUsername } from "./GetUsername";
import { ValidateInputForm } from "../config/formvalidation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIURLConfig } from "../config";

export const UbahPassword = (props) => {
    const setstatus = props.status

    let cookie = ReadCookieLocal()

    const failed = (errmsg) => toast.error(errmsg);
    const success = (msg) => toast.success(msg);

    const [passvalid, setPassValid] = useState(false);
    const [newpass, setNewPass] = useState("")

    var newFormData = new FormData();

    const handleChange = (e) => {
        // ... get data form
        newFormData[e.target.name] = e.target.value.trim()
        if (newFormData["password1"] !== undefined && newFormData["password2"] !== undefined) {
            if (newFormData["password1"] === newFormData["password2"]) {
                setPassValid(true)
                setNewPass(newFormData["password1"])
            } else {
                setPassValid(false)
            }
        }
        console.log({
            password: newpass,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target);
        console.log({
            "password": newpass,
        })

        let cekdata = {
            "password": newpass,
        }

        const validation = ValidateInputForm(cekdata)

        if (validation.message === undefined) {
            // ... submit to RestAPI using fetch api
            const response = await fetch(APIURLConfig.baseurl + APIURLConfig.userendpoint + "update/" + cookie.iduser, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`
                },
                body: JSON.stringify({
                    "password": newpass,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    return data
                })
                .catch((err) => console.log(err))
            if (response.code === "success") {
                success("Sukses melakukan pembaruan password pengguna.")
                // setSubmitted(true)
                setTimeout(() => {
                    setstatus("submitted")
                }, 1000);
            }
            return response
        } else {
            failed(validation.message)
        }
    }

    return (
        <>
            <div className="flex flex-col rounded-md mt-8 p-10 border-dotted border-[1px] border-slate-500">
                <h3 className='font-bold text-center text-lg text-green-500'>Update Password</h3>
                <div className="gap-2 flex flex-col">
                    <form method="put">
                        <div className="flex pt-6 items-center gap-4 text-slate-500">
                            <input className="grow rounded h-12" name="password1" type={"password"} placeholder=" New password" onChange={handleChange} />
                        </div>
                        <div className="flex flex-row py-6 items-center gap-4 text-slate-500">
                            <input className="grow rounded h-12" name="password2" type={"password"} placeholder="Retype new password" onChange={handleChange} />
                            <div>{passvalid === false ? <span className="bg-red-500 px-2 rounded-md text-sm text-white">password belum cocok</span> : <span className="bg-green-500 px-2 rounded-md text-sm text-white">password cocok</span>}</div>
                        </div>
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Update Password</button>
                        </div>
                    </form>
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