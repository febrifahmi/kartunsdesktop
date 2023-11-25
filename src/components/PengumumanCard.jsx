import { useState, useEffect } from "react"
import { CreateStatusCookie, ReadCookie } from "../config/utils"
import { APIURLConfig } from "../config"
import { MdInfoOutline } from "react-icons/md";

export const PengumumanCard = (props) => {
    let submit = props.submit
    let cookie = ReadCookie()

    const [pengumuman, setPengumuman] = useState([]);

    const getPengumuman = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.pengumumanendpoint + "all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
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
        CreateStatusCookie("Manage Pengumuman");
        getPengumuman()
            .then((isi) => {
                // console.log(isi);
                setPengumuman(isi)
            })
            .catch((err) => console.log(err))
    }, [submit])

    return (
        <>
            <div className="p-2 bg-slate-800 rounded-md flex flex-col gap-2">
                <h3 className="text-base font-bold text-white">Pengumuman</h3>
                <hr className="border-slate-700 pt-2 border-dotted" />
                {pengumuman.pengumumans != undefined && pengumuman.pengumumans.length != 0 ?
                    pengumuman.pengumumans.map((item) => (
                        <div className="bg-slate-700 hover:bg-slate-900 hover:text-sky-500 p-2 rounded-md text-sm" key={item.idpengumuman}>
                            {item.judul}
                        </div>
                    ))
                    :
                    <div className="text-sm flex flex-row items-center gap-2">
                        <MdInfoOutline />
                        Belum ada pengumuman terbaru.
                    </div>
                }
            </div>
        </>
    )
}