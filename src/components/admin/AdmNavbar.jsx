export const AdmNavbar = () => {
    return (
        <>
            <div className="flex gap-1 text-white text-sm mt-2 mx-2">
                <button className="bg-slate-900 hover:bg-green-700 text-green-500 hover:text-white hover:font-bold px-4 py-1 rounded-full">Dashboard</button>
                <button className="bg-slate-900 hover:bg-green-700 text-green-500 hover:text-white hover:font-bold px-4 py-1 rounded-full">User Management</button>
                <button className="bg-slate-900 hover:bg-green-700 text-green-500 hover:text-white hover:font-bold px-4 py-1 rounded-full">Pengaturan</button>
                <button className="bg-slate-900 hover:bg-green-700 text-green-500 hover:text-white hover:font-bold px-4 py-1 rounded-full">Logs</button>
            </div>
        </>
    )
}