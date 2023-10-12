import { MdChevronRight } from "react-icons/md";
import { useLocation } from 'react-router-dom'

export const Breadcrumb = () => {
    const location = useLocation();
    return (
        <>
            <div className="w-full bg-slate-700 text-slate-400">
                <div className="flex items-center gap-x-2 mx-4 py-1">
                    <MdChevronRight />
                    <h1 className="text-sm text-left">{location.pathname}</h1>
                </div>
            </div>
        </>
    )
}