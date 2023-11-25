import { MdChevronRight } from "react-icons/md";
import { useLocation } from 'react-router-dom'
import { ReadCookieLocal } from "../config/utils";

export const Breadcrumb = () => {
    const location = useLocation();
    const cookie = ReadCookieLocal();

    return (
        <>
            <div className="flex flex-row justify-between items-center w-full bg-slate-700 text-slate-400">
                <div className="flex items-center gap-x-2 mx-4 py-1">
                    <MdChevronRight />
                    <h1 className="text-sm text-left">{location.pathname}</h1>
                </div>
                <div className="mr-4">
                    {cookie.isalumni === "true"? <div className="px-2 bg-slate-800 rounded-full text-xs">Alumni</div>:""}
                    {cookie.ispengurus === "true"? <div className="px-2 bg-green-700 rounded-full text-xs text-white">Pengurus</div>:""}
                    {cookie.isadmin === "true"? <div className="px-2 bg-orange-700 rounded-full text-xs text-white">Admin</div>:""}
                </div>
            </div>
        </>
    )
}