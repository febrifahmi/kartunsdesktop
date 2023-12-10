import { useState, useEffect } from "react"
import { APIURLConfig } from "../../config";
import { CreateStatusCookie } from "../../config/utils";

export const MhsAgenda = () => {
    const [agenda, setAgenda] = useState([]);
    const getAgenda = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.agendaendpoint + "all", {
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
        getAgenda()
            .then((isi) => {
                // console.log(isi);
                setAgenda(isi)
            })
            .catch((err) => console.log(err))
        console.log(agenda.agendas)
    }, [])


    return (
        <>
            <div className="pb-10">
                <hr className="border-slate-700 border-dotted" />
                <h3 className='font-bold text-lg flex justify-start text-green-500 my-8'>Agenda Terkini KartUNS</h3>
                <div className="flex flex-nowrap overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-thumb-slate-600">
                    {agenda.agendas !== undefined && agenda.agendas.length !== 0 ? agenda.agendas.slice(0, 10).map((item) => (
                        <div className={"flex-none justify-start p-5 bg-slate-900 hover:bg-cover hover:bg-opacity-80 hover:bg-[url(" + "'" + APIURLConfig.baseurl + "static/uploads/" + item.agendaimgurl + "'" + ")] hover:text-sky-600 hover:border-t-[1px] hover:border-t-solid hover:border-green-500 rounded-md w-1/6 mb-2"} key={item.idagenda}>
                            <hr className="border-slate-700 py-2 border-dotted" />
                            <div>
                                <div className="text-sm">{item.judul}</div>
                                <div className="text-xs text-slate-700 mt-2">{item.created_at}</div>
                            </div>
                        </div>
                    )) : <span className="text-slate-500">Belum ada agenda baru.</span>}
                </div>
            </div>
        </>
    )
}