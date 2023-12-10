import { NavbarItem } from "../NavbarItem"
import { useState } from "react"
import { MdHome } from "react-icons/md";

export const MhsNavbar = ({ getSelection }) => {
    const [selected, setSelected] = useState();

    return (
        <>
            <div className="flex flex-wrap gap-1 text-white text-sm mt-2 mx-2">
                <div onClick={() => {
                    setSelected("");
                    getSelection("");
                }}>
                    <NavbarItem title={<MdHome size={20} />} selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Profil Mahasiswa");
                    getSelection("Profil Mahasiswa");
                }}>
                    <NavbarItem title="Profil Mahasiswa" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Ikut Pelatihan");
                    getSelection("Ikut Pelatihan");
                }}>
                    <NavbarItem title="Ikut Pelatihan" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Mau Magang/Kerja");
                    getSelection("Mau Magang/Kerja");
                }}>
                    <NavbarItem title="Mau Magang/Kerja" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Beasiswa KartUNS");
                    getSelection("Beasiswa KartUNS");
                }}>
                    <NavbarItem title="Beasiswa KartUNS" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Donasi");
                    getSelection("Donasi");
                }}>
                    <NavbarItem title="Donasi" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Store");
                    getSelection("Store");
                }}>
                    <NavbarItem title="Store" selected={selected} />
                </div>
            </div>
        </>
    )
}