import { NavbarItem } from "../NavbarItem"
import { useState } from "react"

export const AdmNavbar = () => {
    const [selected, setSelected] = useState();

    return (
        <>
            <div className="flex gap-1 text-white text-sm mt-2 mx-2">
                <div onClick={() => setSelected("Dashboard")}>
                    <NavbarItem title="Dashboard" selected={selected} />
                </div>
                <div onClick={() => setSelected("User Management")}>
                    <NavbarItem title="User Management" selected={selected} />
                </div>
                <div onClick={() => setSelected("Settings")}>
                    <NavbarItem title="Settings" selected={selected} />
                </div>
                <div onClick={() => setSelected("Logs")}>
                    <NavbarItem title="Logs" selected={selected} />
                </div>
            </div>
        </>
    )
}