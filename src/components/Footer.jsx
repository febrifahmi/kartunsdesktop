import { LogoKartUNS } from "./LogoKartUNS"
import { FaYoutube, FaSquareInstagram, FaFacebook } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
    const navigate = useNavigate();
    const kebijakan = () => navigate("/kebijakan");
    const layanan = () => navigate("/layanan");
    return (
        <>
            <hr className="border-slate-700 my-2 border-dotted" />
            <div className="flex flex-row gap-10 my-10 text-slate-500">
                <div className="1/3 flex justify-center ml-10 grayscale-[50%]">
                    <LogoKartUNS width={100} />
                </div>
                <div className="2/3 flex flex-row gap-10 grow">
                    <div className="w-1/2 flex flex-col items-center grow">
                        <div>CP. 1. Dian Ariffianto BS <span className=" hover:text-sky-500">(+62815-7641-987)</span></div>
                        <div>CP. 2. AM Nizar Alfian <span className=" hover:text-sky-500">(+62813-9012-9798)</span></div>
                    </div>
                    <div className="w-1/2 flex flex-row gap-10">
                        <div className="w-1/2 flex flex-col items-center">
                            <button onClick={kebijakan}>Kebijakan Privasi</button>
                            <button onClick={layanan}>Kebijakan Layanan</button>
                        </div>
                        <div className="w-1/2 flex flex-row gap-4 items-between">
                            <div><FaYoutube size={32} /></div>
                            <div><FaSquareInstagram size={32} /></div>
                            <div><FaFacebook size={32} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}