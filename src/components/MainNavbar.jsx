import { MdClose, MdMinimize, MdMaximize } from "react-icons/md";
import { appversion } from "../config";

export default function MainNavbar() {
    function closeWindow() {
        window.close()
    }
    return (
        <div className='flex h-10 justify-between items-center mx-5'>
            <div className='text-white font-bold flex flex-row gap-2 items-center'>
                <span><img width={16} src="../icon400.png"></img></span>
                <span>KartUNS Desktop <span className='text-xs text-slate-600'>{appversion}</span></span>
            </div>
            <div className='flex'>
                <div className='text-slate-400 hover:text-slate-700 text-xl mr-2 bg-slate-700 hover:bg-slate-200'>
                    <MdMinimize />
                </div>
                <div className='text-slate-400 hover:text-slate-700 text-xl mr-2 bg-slate-700 hover:bg-slate-200'>
                    <MdMaximize />
                </div>
                <div className='text-slate-400 hover:text-slate-700 text-xl mr-0 bg-slate-700 hover:bg-red-500'>
                    <MdClose onClick={closeWindow} />
                </div>
            </div>
        </div>
    )
}