import { useState, useEffect } from "react"
import { APIURLConfig } from "../../config"
import { CreateStatusCookieLocal, ReadCookie, ReadCookieLocal } from "../../config/utils"
import { MdReceiptLong } from "react-icons/md";
import { ShowUsername } from '../GetUsername';

export const PgDonasi = () => {
    const [datadonasi, setDataDonasi] = useState([])

    let cookie = ReadCookieLocal()

    const getDonasi = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.donasiendpoint + "all", {
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
        CreateStatusCookieLocal("Pengelolaan Donasi Masuk");
        getDonasi()
            .then((isi) => {
                // console.log("Isi artikel: ",isi.articles);
                setDataDonasi(isi.donations)
            })
            .catch((err) => console.log(err))
        console.log("Setelah diisi baru", datadonasi)
    }, [])

    const [showImg, setShowImg] = useState(0)

    return (
        <>
            <div className="px-5">
                <h3 className='font-bold text-center text-lg text-green-500'>Daftar Donasi Masuk</h3>
                <div className='py-4'>
                    {datadonasi !== undefined && datadonasi.length !== 0 ?
                        datadonasi.slice(0, 10).map((item) => (
                            <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-col gap-4 my-2 rounded-md' key={item.iddonation}>
                                <div className='flex flex-row gap-4'>
                                    <div className='rounded-md text-green-600 flex justify-center items-center hover:outline hover:outline-[1px] hover:outline-slate-600 w-1/12'>
                                        <div className='flex flex-col justify-center items-center gap-2'>
                                            <MdReceiptLong size={48} />
                                            <button className='text-xs text-white bg-green-700 px-2 rounded-md' onClick={() => setShowImg(item.iddonation)}>Show</button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2 w-11/12'>
                                        <div className='text-sm font-bold'>
                                            {item.namadonatur}
                                        </div>
                                        <div className='text-xs text-slate-400'>
                                            <span className='font-bold'>Bank pengirim:</span> {item.bankpengirim}
                                        </div>
                                        <div className='text-xs text-slate-400'>
                                            <span className='font-bold'>Donasi:</span> {item.jumlahdonasi}
                                        </div>
                                        <div className='text-xs text-slate-400'>
                                            <span className='font-bold'>Donatur:</span> <ShowUsername userid={item.donatur_id} token={cookie.token} />
                                        </div>
                                        <div className='text-xs text-slate-500'>
                                            <p>Published: {item.created_at}</p>
                                        </div>
                                    </div>
                                </div>
                                <div id="buktitransfer" className="flex justify-center">
                                    {showImg === item.iddonation ?
                                        <img width={200} src={APIURLConfig.baseurl + "static/uploads/"+item.donasiimgurl}></img>
                                        :
                                        ""}
                                </div>
                            </div>
                        ))
                        :
                        "Belum ada data donasi masuk di dalam sistem."
                    }
                </div>
            </div>
        </>
    )
}