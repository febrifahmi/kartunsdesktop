import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { CreateStatusCookie, ReadCookie, resizeImage } from '../../config/utils';
import { APIURLConfig } from '../../config';

export const PgTraining = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    let cookie = ReadCookie()

    const [selected, setSelected] = useState("");
    const [trainingwebinars, setTrainingWebinars] = useState([])

    const TrainingWebinar = () => {
        const [judulwebinar, setJudulWebinar] = useState("")
        const [descwebinar, setDescWebinar] = useState("")
        const [tekswebinar, setTeksWebinar] = useState("");
        const [startdate, setStartDate] = useState("");
        const [enddate, setEndDate] = useState("");
        const [level, setLevel] = useState("");
        const [price, setPrice] = useState("");
        const [webinarimgurl, setWebinarImgUrl] = useState("");
        const [file, setFile] = useState();

        var newFormData = new FormData();

        const handleChangeWebinar = (e) => {
            // ... get data form
            newFormData[e.target.name] = e.target.value.trim()
            if (newFormData["webinartitle"] !== undefined) {
                setJudulWebinar(newFormData["webinartitle"])
            }
            if (newFormData["webinardesc"] !== undefined) {
                setDescWebinar(newFormData["webinardesc"])
            }
            if (newFormData["webinartext"] !== undefined) {
                setTeksWebinar(newFormData["webinartext"])
            }
            if (newFormData["startdate"] !== undefined) {
                setStartDate(newFormData["startdate"])
            }
            if (newFormData["enddate"] !== undefined) {
                setEndDate(newFormData["enddate"])
            }
            if (newFormData["level"] !== undefined) {
                setLevel(newFormData["level"])
            }
            if (newFormData["price"] !== undefined) {
                setPrice(newFormData["price"])
            }
            console.log({
                webinartitle: judulwebinar,
                webinardesc: descwebinar,
                webinartext: tekswebinar,
                startdate: startdate,
                enddate: enddate,
                level: level,
                price: price,
                webinarimgurl: webinarimgurl,
                file: file,
                author_id: cookie.iduser,
            })
        }

        const getBase64 = async (file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        const handleFileChange = async (event) => {
            const file = await event.target.files[0];
            // console.log(file);
            setWebinarImgUrl(file.name);
            // Convert data to base64
            let img = await getBase64(file)
            console.log("Image file: ", img)
            setFile(img);
        }

        const handleSubmitWebinar = async (e) => {
            e.preventDefault()
            console.log({
                "webinartitle": judulwebinar,
                "webinardesc": descwebinar,
                "webinartext": tekswebinar,
                "startdate": startdate,
                "enddate": enddate,
                "level": level,
                "price": price,
                "webinarimgurl": webinarimgurl,
                "file": file,
            })
            // ... submit to RestAPI using fetch api
            const response = await fetch(APIURLConfig.baseurl + APIURLConfig.webinarsendpoint + "create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`
                },
                body: JSON.stringify({
                    "webinartitle": judulwebinar,
                    "webinardesc": descwebinar,
                    "webinartext": tekswebinar,
                    "startdate": startdate,
                    "enddate": enddate,
                    "level": level,
                    "price": price,
                    "webinarimgurl": webinarimgurl,
                    "file": file,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    return data
                })
                .catch((err) => console.log(err))
            return response
        }


        return (
            <>
                <div className='flex flex-col bg-slate-700 rounded-md p-2'>
                    <h3 className='font-bold text-lg text-green-500 px-6 pt-6'>Buat Training Webinar</h3>
                    <div className='text-slate-500 mt-5 px-6'>
                        <form method='post'>
                            <div className="flex">
                                <input className="grow rounded h-12" name="webinartitle" type={"text"} placeholder=" Judul webinar" onChange={handleChangeWebinar} />
                            </div>
                            <div className="flex py-6">
                                <input className="grow rounded h-12" name="webinardesc" type={"text"} placeholder=" Deskripsi webinar" onChange={handleChangeWebinar} />
                            </div>
                            <div className="flex pb-6 items-center">
                                <label className='text-white mr-4'>Tanggal mulai</label>
                                <input className="grow rounded h-12" name="startdate" type={"date"} onChange={handleChangeWebinar} />
                            </div>
                            <div className="flex pb-6 items-center">
                                <label className='text-white mr-4'>Tanggal selesai</label>
                                <input className="grow rounded h-12" name="enddate" type={"date"} onChange={handleChangeWebinar} />
                            </div>
                            <div className="flex items-center pb-6">
                                <label className="text-white mr-4">Level materi training</label>
                                <select name="level" className="text-slate-600 h-10 rounded-md" onChange={handleChangeWebinar} >
                                    <option value='Beginner' >Beginner</option>
                                    <option value='Intermediate'>Intermediate</option>
                                    <option value='Expert'>Expert</option>
                                </select>
                            </div>
                            <div className="flex pb-6">
                                <input className="grow rounded h-12" name="price" type={"text"} placeholder=" Biaya webinar (Rp. tanpa titik/koma)" onChange={handleChangeWebinar} />
                            </div>
                            <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue="<p>Silahkan tuliskan isi silabus materi webinar terbaru KartUNS di sini.</p>"
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
                                onEditorChange={(newText) => setTeksWebinar(newText)}
                            />
                            <input type="hidden" id="webinartext" name="webinartext" value={tekswebinar}></input>
                            <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                                <div className='flex'>
                                    <label className='mr-6'>Upload gambar/poster webinar (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                    <input type="file" name="imagefile" accept="image/*" onChange={handleFileChange} />
                                </div>
                            </div>
                            <input type="hidden" id="" name="webinarimgurl" value={webinarimgurl}></input>
                            <div className='flex justify-center'>
                                <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmitWebinar}>Rekam Training  Webinar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    const DaftarTrainingWebinar = (props) => {
        const data = props.data;
        return (
            <>
                <hr className="border-slate-700 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Daftar Training Webinar KartUNS</h3>
                    <div className='py-4'>
                        {data !== undefined && data.length !== 0 ?
                            data.slice(0, 10).map((item) => (
                                <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-col gap-4 my-2 rounded-md' key={item.idwebinar}>
                                    <div className='flex flex-row gap-4'>
                                        <div className='rounded-md flex hover:outline hover:outline-[1px] hover:outline-slate-600 w-1/6'>
                                            <img className='object-fill rounded-md' src={item.webinarimgurl !== undefined || item.webinarimgurl !== null || item.webinarimgurl !== "" ? APIURLConfig.baseurl + "static/uploads/" + item.webinarimgurl : 'static/img/noimage.png'}></img>
                                        </div>
                                        <div className='flex flex-col gap-2 w-11/12'>
                                            <div className='text-sm font-bold'>
                                                {item.webinartitle}
                                            </div>
                                            <div className='text-xs text-slate-400'>
                                                <span className='font-bold'>Deskripsi:</span> {item.webinardesc}
                                            </div>
                                            <div className='text-xs text-slate-400'>
                                                <span className='font-bold'>Level:</span> {item.level}
                                            </div>
                                            <div className='text-xs text-slate-400'>
                                                <span className='font-bold'>Price:</span> {Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}
                                            </div>
                                            <div className='text-xs text-slate-500'>
                                                <p>Published: {item.created_at}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            "Belum ada data training webinar di dalam sistem."
                        }
                    </div>
                </div>
            </>
        )
    }

    const OnlineCourse = () => {
        return (
            <>
                <div className='flex flex-col bg-slate-700 rounded-md p-2'>
                    <h3 className='font-bold text-lg text-green-500 px-6 pt-6'>Buat Online Course</h3>
                    <div className='py-4 px-6'>
                        Under development
                    </div>
                </div>
            </>
        )
    }

    const DaftarOnlineCourse = () => {
        return (
            <>
                <div>

                </div>
            </>
        )
    }

    const getTrainingWebinars = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.webinarsendpoint + "all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch((err) => console.log(err))
        return response
    }

    useEffect(() => {
        CreateStatusCookie("Pengelolaan Persuratan");
        getTrainingWebinars()
            .then((isi) => {
                // console.log(isi);
                setTrainingWebinars(isi)
            })
            .catch((err) => console.log(err))
        console.log(trainingwebinars)
    }, [])

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Manajemen Training</h3>
                <div className="flex flex-col gap-2 mt-5 pb-10">
                    <div className="flex flex-row justify-center bg-slate-700 gap-6 rounded-md py-6">
                        <button className={selected === "webinar" ? "bg-slate-600 outline outline-green-500 outline-[1px] px-6 py-2 rounded-md font-bold" : "bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"} onClick={() => setSelected("webinar")}>Webinar</button>
                        <button className={selected === "onlinecourse" ? "bg-slate-600 outline outline-sky-500 outline-[1px] px-6 py-2 rounded-md font-bold" : "bg-sky-600 hover:bg-sky-700 px-6 py-2 rounded-md"} onClick={() => setSelected("onlinecourse")}>Online Course</button>
                    </div>
                    {selected === "webinar" ? <TrainingWebinar /> : ""}
                    {selected === "onlinecourse" ? <OnlineCourse /> : ""}
                </div>
                {selected === "webinar" ? <DaftarTrainingWebinar data={trainingwebinars.trainingwebinars} /> : ""}
                {selected === "onlinecourse" ? <DaftarOnlineCourse /> : ""}
            </div>
        </>
    )
}