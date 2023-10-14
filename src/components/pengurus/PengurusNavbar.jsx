import { NavbarItem } from "../NavbarItem"
import { useState } from "react"

export const PengurusNavbar = ({ getSelection }) => {
    const [selected, setSelected] = useState();

    return (
        <>
            <div className="flex flex-wrap gap-1 text-white text-sm mt-2 mx-2">
                <div onClick={() => {
                    setSelected("Cover Story");
                    getSelection("Cover Story");
                }}>
                    <NavbarItem title="Cover Story" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Persuratan");
                    getSelection("Persuratan");
                }}>
                    <NavbarItem title="Persuratan" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Agenda");
                    getSelection("Agenda");
                }}>
                    <NavbarItem title="Agenda" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Artikel");
                    getSelection("Artikel");
                }}>
                    <NavbarItem title="Artikel" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Anggaran");
                    getSelection("Anggaran");
                }}>
                    <NavbarItem title="Anggaran" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Pengumuman");
                    getSelection("Pengumuman");
                }}>
                    <NavbarItem title="Pengumuman" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Kepengurusan");
                    getSelection("Kepengurusan");
                }}>
                    <NavbarItem title="Kepengurusan" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Keanggotaan");
                    getSelection("Keanggotaan");
                }}>
                    <NavbarItem title="Keanggotaan" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Ads Approval");
                    getSelection("Ads Approval");
                }}>
                    <NavbarItem title="Ads Approval" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Job Offers");
                    getSelection("Job Offers");
                }}>
                    <NavbarItem title="Job Offers" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Training");
                    getSelection("Training");
                }}>
                    <NavbarItem title="Training" selected={selected} />
                </div>
                <div onClick={() => {
                    setSelected("Revenue Layanan");
                    getSelection("Revenue Layanan");
                }}>
                    <NavbarItem title="Revenue Layanan" selected={selected} />
                </div>
            </div>
        </>
    )
}