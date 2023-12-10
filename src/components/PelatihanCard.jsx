import { useState, useEffect } from "react"
import { APIURLConfig } from "../config"
import { ImageExist, truncate, CheckWebinarDate, getTodayDate, ReadCookieLocal } from "../config/utils"
import { MdInfoOutline } from "react-icons/md";
import { useRef } from "react";
import { ValidateInputForm } from "../config/formvalidation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShowUsername } from "./GetUsername";
import { Purify } from "../config/utils";
import * as ReactDOM from 'react-dom';

export const PelatihanCard = () => {
    const [webinars, setWebinars] = useState([])
    const [iddaftar, setIdDaftar] = useState(-1)
    const [thiswebinar, setThisWebinar] = useState({})
    const [peserta, setPeserta] = useState({});
    const [submitted, setSubmitted] = useState(false)

    const failed = (errmsg) => toast.error(errmsg);
    const success = (msg) => toast.success(msg);

    let cookie = ReadCookieLocal()

    const ref = useRef(-1)

    const getWebinars = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.webinarsendpoint + "all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data
            })
            .catch((err) => console.log(err))
        return response
    }

    const WebinarSaya = (props) => {
        const data = props.peserta
        console.log("Datanya: ", data)
        const ListPelatihan = () => {
            if (data.pesertawebinar !== undefined) {
                data.pesertawebinar.map((item) => {
                    console.log("Data item: ", item)
                    console.log("Webinar ", webinars)
                    if (webinars && webinars.trainingwebinars.length > 0) {
                        webinars.trainingwebinars.map((webinar) => {
                            console.log("Training id: ", item.training_id)
                            console.log("User id: ", item.user_id)
                            console.log("Webinar id: ", webinar.idwebinar)
                            console.log("Iduser: ", cookie.iduser)
                            if (item.user_id == cookie.iduser && item.training_id == webinar.idwebinar) {
                                console.log("User terdaftar di pelatihan ", item.training_id)
                                console.log(webinar.webinartitle);
                                return (
                                    <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-row gap-4 my-2 rounded-md' key={webinar.idwebinar}>
                                        <div className='rounded-md flex hover:outline hover:outline-[1px] hover:outline-slate-600 w-1/6'>
                                            <img className='object-fill rounded-md' src={webinar.webinarimgurl !== undefined && ImageExist(APIURLConfig.baseurl + "static/uploads/" + webinar.webinarimgurl) ? APIURLConfig.baseurl + "static/uploads/" + webinar.webinarimgurl : APIURLConfig.baseurl + 'static/img/noimage.png'}></img>
                                        </div>
                                        <div className='flex flex-col gap-2 w-5/6'>
                                            <div className='text-sm font-bold'>
                                                {webinar.webinartitle}
                                            </div>
                                            <div className='text-xs text-slate-400'>
                                                {webinar.webinardesc}
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return "Error"
                            }
                        }
                        )
                    }
                })
            }
        }
        return (
            <>
                <div className="my-4">
                    <h3 className='font-bold text-lg text-green-500'>Daftar Pelatihan yang Saya Ikuti</h3>
                    {/* <div id="webinarsaya">
                    </div> */}
                    <ListPelatihan />
                </div>
            </>
        )
    }

    const FormDaftarPelatihan = (props) => {
        const data = props.data

        const handleSubmit = async (e) => {
            e.preventDefault()
            // console.log(e.target);
            console.log({
                "namapeserta": cookie.name,
                "training_id": data.idwebinar,
                "user_id": cookie.iduser,
            })

            let cekdata = {
                "namapeserta": cookie.name,
                "training_id": data.idwebinar,
                "user_id": cookie.iduser,
            }

            const validation = ValidateInputForm(cekdata)

            // kurang validasi apakah peserta sudah daftar di pelatihan ini (bisa ditempatkan di tombol daftar jadi disabled saja)

            if (validation.message === undefined) {
                // ... submit to RestAPI using fetch api
                const response = await fetch(APIURLConfig.baseurl + APIURLConfig.pesertawebinarsendpoint + "create", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookie.token}`
                    },
                    body: JSON.stringify({
                        "namapeserta": cookie.name,
                        "training_id": data.idwebinar,
                        "user_id": cookie.iduser,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        return data
                    })
                    .catch((err) => console.log(err))
                if (response.code !== undefined && response.code === "success") {
                    success("Sukses mendaftarkan diri mengikuti pelatihan.")
                    setSubmitted(true)
                } else {
                    failed("Gagal mendaftarkan diri mengikuti pelatihan. Anda mungkin sudah terdaftar!")
                }
                return response
            } else {
                failed(validation.message)
            }
        }



        return (
            <>
                {data && data.idwebinar !== undefined ? (
                    <div className="flex flex-col gap-4 border-[1px] border-slate-700 rounded-xl p-5">
                        <div className="text-sky-500">
                            <span className="px-2 text-sm rounded-full border-[1px] border-sky-500 hover:border-none hover:bg-sky-700 hover:text-white">Form Daftar Pelatihan {data.idwebinar}</span>
                        </div>
                        <div>
                            <div className="flex flex-col gap-4">
                                <div className="text-xl text-center font-bold text-slate-300">{data.webinartitle}</div>
                                <div className="flex justify-center w-full">
                                    <div>
                                        <img className="object-cover rounded-xl" src={APIURLConfig.baseurl + "static/uploads/" + data.webinarimgurl} ></img>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row gap-2 text-sm text-slate-400">
                                        <div className="bg-slate-700 px-2 rounded-full hover:bg-slate-900">Pelaksanaan: <span>{data.startdate} s.d {data.enddate}</span></div>
                                        <div className="bg-slate-700 px-2 rounded-full hover:bg-slate-900">Biaya: <span>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(data.price)}</span></div>
                                        <div className="bg-slate-700 px-2 rounded-full hover:bg-slate-900">{data.level}</div>
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        {data.webinardesc}
                                    </div>
                                    <hr className="border-slate-700 my-2 border-dotted" />
                                    <div className="text-slate-400" dangerouslySetInnerHTML={{ __html: data.webinartext ? Purify(data.webinartext) : "" }}></div>
                                    <hr className="border-slate-700 my-2 border-dotted" />
                                    <div className='flex justify-center'>
                                        {/* {peserta.pesertawebinar !== undefined ? peserta.pesertawebinar.map((item) => {
                                            if (item.user_id == cookie.iduser) {
                                                if (item.training_id == data.idwebinar) {
                                                    console.log("Item peserta", item)
                                                    return <button className='bg-slate-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' disabled>Sudah Terdaftar</button>
                                                } 
                                            }
                                        })
                                            :
                                            ""
                                        } */}


                                        <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Daftar Pelatihan Ini</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : "Data undefined"}

            </>
        )
    }

    const getPesertaPelatihan = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.pesertawebinarsendpoint + cookie.iduser, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data
            })
            .catch((err) => console.log(err))
        return response
    }

    useEffect(() => {
        getWebinars()
            .then((isi) => {
                // console.log(isi);
                setWebinars(isi)
            })
            .catch((err) => console.log(err))
        getPesertaPelatihan()
            .then((isi) => {
                // console.log("Isi artikel: ",isi.articles);
                setPeserta(isi)
            })
            .catch((err) => console.log(err))
        // console.log("Peserta: ",peserta)
        // console.log("Webinar: ",webinars)
    }, [submitted])

    return (
        <>
            <div>
                <h3 className="text-sky-500 font-bold">Daftar Pelatihan/Webinar KartUNS</h3>
                <div className="flex flex-row flex-nowrap gap-4 p-4 bg-slate-800 border-solid border-[1px] border-slate-700 rounded-lg my-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-thumb-slate-600 overflow-x-auto">
                    {webinars.trainingwebinars !== undefined && webinars.trainingwebinars.length > 0 ?
                        webinars.trainingwebinars.slice(0, 30).map((item) => (
                            <div className="flex-none w-1/6" key={item.idwebinar}>
                                <div className="flex flex-col flex-nowrap justify-start p-2 gap-4 bg-slate-900 hover:bg-black hover:border-t-[1px] hover:border-t-solid hover:border-green-500 rounded-md my-2" key={item.idwebinar}>
                                    <div className="flex flex-col gap-4">
                                        <img className=' object-cover rounded-md w-full h-20' src={item.webinarimgurl !== undefined && ImageExist(APIURLConfig.baseurl + "static/uploads/" + item.webinarimgurl) ? APIURLConfig.baseurl + "static/uploads/" + item.webinarimgurl : 'static/img/noimage.png'}></img>
                                        {/* buat if end date adalah kemarin maka button disable */}
                                        {
                                            CheckWebinarDate(item.startdate, getTodayDate()) === true ?
                                                <button className="px-2 rounded-full bg-orange-500 hover:bg-orange-700 text-white font-bold text-sm" onClick={() => {
                                                    setIdDaftar(parseInt(item.idwebinar))
                                                    setThisWebinar(item)
                                                    console.log("This webinar: ", thiswebinar);
                                                }}>Daftar</button>
                                                :
                                                <button className="px-2 rounded-full bg-slate-500  text-white font-bold text-sm" disabled>Terlaksana</button>
                                        }

                                    </div>
                                    <div className="flex flex-col text-xs gap-2">
                                        <div>{truncate(item.webinartitle, 40, 8)}</div>
                                        <div className="text-sky-500">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                                            item.price,
                                        )}</div>
                                        <div>Tanggal: {item.startdate} s.d {item.enddate}</div>
                                        <div className="text-slate-500 font-bold">{item.level}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        <div className="text-slate-500 flex flex-row gap-2 items-center">
                            <MdInfoOutline />
                            Belum ada pelatihan yang ditawarkan.</div>
                    }
                </div>
                <div>
                    {thiswebinar.idwebinar !== undefined ?
                        <FormDaftarPelatihan data={thiswebinar} /> : ""
                    }
                </div>
            </div >
            <hr className="border-slate-700 mt-8 border-dotted" />
            <div>
                {peserta !== undefined || peserta.pesertawebinar.length > 0 ?
                    <WebinarSaya peserta={peserta} /> : ""
                }
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