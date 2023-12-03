import { useState, useRef } from "react";
import { ReadCookieLocal, resizeImage } from "../config/utils"
import { Editor } from '@tinymce/tinymce-react';
import { ShowUsername } from "./GetUsername";
import { ValidateInputForm } from "../config/formvalidation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIURLConfig } from "../config";

export const ProfilEdit = (props) => {
    const data = props.data
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    let cookie = ReadCookieLocal()

    const failed = (errmsg) => toast.error(errmsg);
    const success = (msg) => toast.success(msg);

    const [tentang, setTentang] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [profpic, setProfpic] = useState("")
    const [image, setImage] = useState()
    const [submitted, setSubmitted] = useState(false)

    var newFormData = new FormData();

    const handleChange = (e) => {
        // ... get data form
        newFormData[e.target.name] = e.target.value.trim()
        if (newFormData["first_name"] !== undefined) {
            setFirstName(newFormData["first_name"])
        }
        if (newFormData["last_name"] !== undefined) {
            setLastName(newFormData["last_name"])
        }
        if (newFormData["email"] !== undefined) {
            setEmail(newFormData["email"])
        }
        console.log({
            fist_name: firstname,
            last_name: lastname,
            email: email,
            profpic: profpic,
            tentang: tentang,
            file: image,
        })
    }

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const image = await resizeImage(file);
        // console.log(image);
        setProfpic(file.name);
        setImage(image);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target);
        console.log({
            "first_name": firstname,
            "last_name": lastname,
            "email": email,
            "profpic": profpic,
            "tentang": tentang,
            "file": image,
        })

        let cekdata = {
            "first_name": firstname,
            "last_name": lastname,
            "email": email,
            "tentang": tentang,
            "file": image,
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
                    "first_name": firstname,
                    "last_name": lastname,
                    "email": email,
                    "profpic": profpic,
                    "tentang": tentang,
                    "file": image,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    return data
                })
                .catch((err) => console.log(err))
            if (response.code === "success") {
                success("Sukses melakukan pembaruan data pengguna.")
                setSubmitted(true)
                localStorage.setItem("avatar", profpic)
            }
            return response
        } else {
            failed(validation.message)
        }
    }

    return (
        <>
            <div className="flex flex-col rounded-md mt-8 p-10 border-dotted border-[1px] border-slate-500">
                <h3 className='font-bold text-center text-lg text-green-500'>Update Profil</h3>
                <div className="gap-2 flex flex-col">
                    <form method="put">
                        <div className="flex pt-6 items-center gap-4 text-slate-500">
                            <input className="grow rounded h-12" name="first_name" type={"text"} placeholder={" Update nama depan anda di sini (" + cookie.name.split(" ")[0] + ")"} onChange={handleChange} />
                        </div>
                        <div className="flex pt-6 items-center gap-4 text-slate-500">
                            <input className="grow rounded h-12" name="last_name" type={"text"} placeholder={" Update nama belakang anda di sini (" + cookie.name.split(" ")[1] + ")"} onChange={handleChange} />
                        </div>
                        <div className="flex py-6 items-center gap-4 text-slate-500">
                            <input className="grow rounded h-12" name="email" type={"text"} placeholder={" Update email anda di sini (" + cookie.email + ")"} onChange={handleChange} />
                        </div>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue="<p>Silahkan tuliskan tentang profil diri anda di sini, usaha anda, dan sebagainya.</p>"
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink',
                                    'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                    'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={(newText) => setTentang(newText)}
                        />
                        <input type="hidden" id="tentang" name="tentang" value={tentang}></input>
                        <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                            <div className='flex'>
                                <label className='mr-6'>Upload profile image baru (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                <input type="file" name="imagefile" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Update Profil</button>
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