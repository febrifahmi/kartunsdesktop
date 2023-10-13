import { NavbarItem } from "../NavbarItem"

export const PengurusNavbar = () => {
    return (
        <>
            {/* <div className="flex flex-col gap-1">
                <div className="bg-slate-800 text-sky-500 font-bold p-2 rounded-full">Cover Story</div>
                <div className="bg-slate-800 text-sky-500 font-bold p-2 rounded-full">Persuratan</div>
                <div className="bg-slate-800 text-sky-500 font-bold p-2 rounded-full">Agenda</div>
                <div className="bg-slate-800 text-sky-500 font-bold p-2 rounded-full">Artikel</div>
                <div className="bg-slate-800 text-sky-500 font-bold p-2 rounded-full">Anggaran</div>
                <div className="bg-slate-800 text-sky-500 font-bold p-2 rounded-full">Pengumuman</div>
                <div className="bg-slate-800 text-sky-500 font-bold p-2 rounded-full">Kepengurusan</div>
                <div className="bg-slate-800 text-sky-500 font-bold p-2 rounded-full">Keanggotaan</div>
                <div className="bg-slate-800 text-sky-500 font-bold p-2 rounded-full">Ads Approval</div>
                <div className="bg-slate-800 text-sky-500 font-bold p-2 rounded-full">Job Offers</div>
                <div className="bg-slate-800 text-sky-500 font-bold p-2 rounded-full">Training</div>
                <div className="bg-slate-800 text-sky-500 font-bold p-2 rounded-full">Revenue Layanan</div>
            </div> */}
            <div className="flex gap-1 text-white text-sm mt-2 mx-2">
                <NavbarItem title="Cover Story" />
                <NavbarItem title="Persuratan" />
                <NavbarItem title="Agenda" />
                <NavbarItem title="Artikel" />
                <NavbarItem title="Anggaran" />
                <NavbarItem title="Pengumuman" />
                <NavbarItem title="Kepengurusan" />
                <NavbarItem title="Keanggotaan" />
                <NavbarItem title="Ads Approval" />
                <NavbarItem title="Job Offers" />
                <NavbarItem title="Training" />
                <NavbarItem title="Revenue Layanan" />
            </div>
        </>
    )
}