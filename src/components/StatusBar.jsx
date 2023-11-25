import { useEffect, useState } from "react";
import { ReadStatusCookieLocal } from "../config/utils";

export const StatusBar = () => {
    const [status, setStatus] = useState("idle")
    const handleAbout = () => {
        window.alert("KartUNS Desktop developed by Febri Fahmi Hakim (2023)")
    }

    return (
        <>
            <div className='flex grow-0 h-6 text-gray-400 bg-gray-700 items-center justify-between px-5'>
                <p className='text-xs'>Status: {status}</p>
                <button className="bg-slate-600 text-slate-300 text-xs rounded-lg px-2" onClick={handleAbout}>About</button>
            </div>
        </>
    )
}