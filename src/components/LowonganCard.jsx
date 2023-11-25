import { useState, useEffect } from "react"
import { APIURLConfig } from "../config"
import { ImageExist, truncate } from "../config/utils"
import { MdInfoOutline } from "react-icons/md";

export const LowonganCard = () => {
    const [joboffers, setJobOffers] = useState([])

    const getJobOffers = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.joboffersendpoint + "all", {
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

    useEffect(() => {
        getJobOffers()
            .then((isi) => {
                // console.log(isi);
                setJobOffers(isi)
            })
            .catch((err) => console.log(err))
        console.log(joboffers.offers)
    }, [])


    return (
        <>
            <div>
                <h3 className="text-sky-500 font-bold">Daftar Tawaran Kerja/<span className="italic">Job Offers</span></h3>
                <div className="flex flex-row flex-nowrap gap-4 p-4 bg-slate-800 border-solid border-[1px] border-slate-700 rounded-lg my-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-thumb-slate-600 overflow-x-auto">
                    {
                        joboffers.offers !== undefined && joboffers.offers.length > 0 ?
                            joboffers.offers.slice(0, 10).map((item) => (
                                <div className="flex-none w-1/6">
                                    <div className="flex flex-col flex-nowrap justify-start p-2 gap-4 bg-slate-900 hover:bg-black hover:border-t-[1px] hover:border-t-solid hover:border-green-500 rounded-md my-2" key={item.idoffer}>
                                        <div className="flex flex-col gap-4">
                                            <img className=' object-cover rounded-md w-full h-20' src={item.companylogo !== undefined && ImageExist(APIURLConfig.baseurl + "static/uploads/" + item.companylogo) ? APIURLConfig.baseurl + "static/uploads/" + item.companylogo : 'static/img/noimage.png'}></img>
                                            <button className="px-2 rounded-full bg-orange-500 hover:bg-orange-700 text-white font-bold text-sm">Apply</button>
                                        </div>
                                        <div className="flex flex-col text-xs gap-2">
                                            <div>{truncate(item.offertitle, 40, 8)}</div>
                                            <div className="text-slate-500">Kategori: <span className="font-bold">{item.offertype}</span></div>
                                            <div className="text-slate-500">Periode: {item.startdate} s.d {item.enddate}</div>
                                            <div className="text-slate-500 font-bold">Salary range: {item.salaryrange}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="text-slate-500 flex flex-row items-center gap-2">
                                <MdInfoOutline />
                                Belum ada data tawaran pekerjaan.
                            </div>
                    }
                </div>
            </div>
        </>
    )
}