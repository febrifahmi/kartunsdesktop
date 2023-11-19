import { useState, useEffect } from "react"
import { APIURLConfig } from "../config"
import { ReadCookieLocal, CreateStatusCookie } from "../config/utils"

export const ProfilDetail = () => {
    let cookie = ReadCookieLocal();

    return (
        <>
            <div className="flex flex-row gap-10 rounded-md mt-8 p-10 border-dotted border-[1px] border-slate-500">
                <div className="w-1/6">
                    <img className='object-fill rounded-full' src={cookie.avatar}></img>
                </div>
                <div className="w-2/6 gap-2 flex flex-col">
                    <div>
                        <span className="font-bold text-sky-500 text-lg" >{cookie.username}</span>
                    </div>
                    <div>
                        <span className="text-base text-slate-400" >{cookie.name}</span>
                    </div>
                    <div>
                        <span className="text-sm text-slate-400" >{cookie.email}</span>
                    </div>
                </div>
                <div className="w-3/6 text-slate-400 gap-2 flex flex-col">
                    <h3 className="font-bold">Tentang</h3>
                    <span className="text-sm text-slate-400" >{cookie.tentang ? cookie.tentang:<span className="italic">(silahkan lengkapi data anda)</span>}</span>
                </div>
            </div>
        </>
    )
}