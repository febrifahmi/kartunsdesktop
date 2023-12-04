import { useState, useEffect } from "react"
import { APIURLConfig } from "../config"
import { ImageExist, truncate, CheckWebinarDate, getTodayDate } from "../config/utils"
import { MdInfoOutline } from "react-icons/md";
import { useRef } from "react";

export const PelatihanCard = () => {
    const [webinars, setWebinars] = useState([])
    const [iddaftar, setIdDaftar] = useState(-1)
    const [thiswebinar, setThisWebinar] = useState({})

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

    const FormDaftarPelatihan = (props) => {
        const data = props.data

        return (
            <>
                {data && data.idwebinar !== undefined ? (
                    <div className="flex flex-col gap-4 border-[1px] border-slate-700 rounded-xl p-5">
                        <div className="text-sky-500">
                            Form Daftar Pelatihan <span>{data.idwebinar}</span>
                        </div>
                        <div>
                            <div className="flex flex-col gap-4">
                                <div className="text-xl text-center">{data.webinartitle}</div>
                            </div>
                        </div>
                    </div>
                ) : "Data undefined"}

            </>
        )
    }

    useEffect(() => {
        getWebinars()
            .then((isi) => {
                // console.log(isi);
                setWebinars(isi)
            })
            .catch((err) => console.log(err))
        console.log(webinars.trainingwebinars)
    }, [])

    return (
        <>
            <div>
                <h3 className="text-sky-500 font-bold">Daftar Pelatihan/Webinar KartUNS</h3>
                <div className="flex flex-row flex-nowrap gap-4 p-4 bg-slate-800 border-solid border-[1px] border-slate-700 rounded-lg my-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-thumb-slate-600 overflow-x-auto">
                    {webinars.trainingwebinars !== undefined && webinars.trainingwebinars.length > 0 ?
                        webinars.trainingwebinars.slice(0, 30).map((item) => (
                            <div className="flex-none w-1/6">
                                <div className="flex flex-col flex-nowrap justify-start p-2 gap-4 bg-slate-900 hover:bg-black hover:border-t-[1px] hover:border-t-solid hover:border-green-500 rounded-md my-2" key={item.idwebinar}>
                                    <div className="flex flex-col gap-4">
                                        <img className=' object-cover rounded-md w-full h-20' src={item.webinarimgurl !== undefined && ImageExist(APIURLConfig.baseurl + "static/uploads/" + item.webinarimgurl) ? APIURLConfig.baseurl + "static/uploads/" + item.webinarimgurl : 'static/img/noimage.png'}></img>
                                        {/* buat if end date adalah kemarin maka button disable */}
                                        {
                                            CheckWebinarDate(item.startdate, getTodayDate()) === true ?
                                                <button className="px-2 rounded-full bg-orange-500 hover:bg-orange-700 text-white font-bold text-sm" onClick={() => {
                                                    setIdDaftar(parseInt(item.idwebinar))
                                                    setThisWebinar(item)
                                                    console.log("This webinar: ",thiswebinar);
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
        </>
    )
}