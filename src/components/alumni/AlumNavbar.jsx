import { NavbarItem } from "../NavbarItem"
import { useState } from "react"
import { MdHome } from "react-icons/md";

export const AlumniNavbar = ({ getSelection }) => {
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
                    setSelected("Profil");
                    getSelection("Profil");
                }}>
                    <NavbarItem title="Profil" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Membership");
                    getSelection("Membership");
                }}>
                    <NavbarItem title="Membership" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Tambah Ilmu");
                    getSelection("Tambah Ilmu");
                }}>
                    <NavbarItem title="Tambah Ilmu" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Pasang Iklan");
                    getSelection("Pasang Iklan");
                }}>
                    <NavbarItem title="Pasang Iklan" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Lowongan");
                    getSelection("Lowongan");
                }}>
                    <NavbarItem title="Lowongan" selected={selected} />
                </div>
            </div>
        </>
    )
}