import { useState, useEffect } from "react"
import { APIURLConfig } from "../../config"
import { ReadCookieLocal } from "../../config/utils"

export const AdmLogs = () => {
    let cookie = ReadCookieLocal()

    const [logs, setLogs] = useState("")

    const getLogs = () => {
        const data = fetch(APIURLConfig.baseurl + APIURLConfig.logtailendpoint + "readlog", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
            },
        })
            .then((response) => response.json())
        return data
    }

    useEffect(() => {
        getLogs().then((data) => setLogs(data));
    }, [])

    return (
        <>
            <div className="px-5 pb-5">
                <h3 className="font-bold text-center text-lg text-green-500">Application Logs</h3>
                <div className="mt-5">
                    {logs && logs.logs !== undefined ?
                        <div className="bg-slate-900 rounded-lg px-4 py-4 text-xs text-slate-500">
                            {logs.logs}
                        </div>
                        :
                        ""
                    }
                </div>
            </div>
        </>
    )
}