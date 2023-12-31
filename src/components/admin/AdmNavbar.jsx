import { NavbarItem } from "../NavbarItem"
import { useEffect, useState } from "react"

export const AdmNavbar = ({ getSelection }) => {
    const [selected, setSelected] = useState();

    return (
        <>
            <div className="flex gap-1 text-white text-sm mt-2 mx-2">
                <div onClick={() => {
                    setSelected("Dashboard");
                    getSelection("Dashboard");
                }}>
                    <NavbarItem title="Dashboard" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Profil Admin");
                    getSelection("Profil Admin");
                }}>
                    <NavbarItem title="Profil Admin" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("User Management");
                    getSelection("User Management");
                }}>
                    <NavbarItem title="User Management" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Settings");
                    getSelection("Settings");
                }}>
                    <NavbarItem title="Settings" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Logs");
                    getSelection("Logs");
                }}>
                    <NavbarItem title="Logs" selected={selected} />
                </div>
            </div>
        </>
    )
}