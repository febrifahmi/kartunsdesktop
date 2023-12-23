import { useEffect, useState } from "react";
import { ReadStatusCookieLocal } from "../config/utils";
import { APIURLConfig } from "../config";

export const StatusBar = () => {
    const [status, setStatus] = useState("idle")
    const [time, setTime] = useState()
    const handleAbout = () => {
        window.alert("KartUNS Desktop developed by Febri Fahmi Hakim (2023)")
    }

    useEffect(() => {
        setInterval(() => {
            const now = new Date().toLocaleString();
            setTime(now)
        }, 5000)
    }, [time])

    return (
        <>
            <div className='flex grow-0 h-6 text-gray-400 bg-gray-700 items-center justify-between px-5'>
                <span className="flex flex-row text-xs">Status: {status} | Local time: {time}</span>
                <button className="bg-slate-600 text-slate-300 text-xs rounded-lg px-2" onClick={handleAbout}>About</button>
            </div>
        </>
    )
}