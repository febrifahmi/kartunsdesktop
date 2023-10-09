import { MdClose, MdMinimize, MdMaximize } from "react-icons/md";

const appversion = "v0.1.0"

export default function MainNavbar() {
    function closeWindow() {
        window.close()
    }
    return (
        <div className='flex h-10 justify-between items-center mx-5'>
            <div className='text-white font-bold'>KartUNS Desktop <span className='text-xs text-slate-600'>{appversion}</span></div>
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