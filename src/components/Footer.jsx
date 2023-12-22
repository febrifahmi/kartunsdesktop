import { LogoKartUNS } from "./LogoKartUNS"
import { FaYoutube, FaSquareInstagram, FaFacebook} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
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
                            <button onClick={() => window.open("https://forms.gle/zzUN541mYZzvyAQE7")}>Saran & Umpan Balik</button>
                        </div>
                        <div className="w-1/2 flex flex-row gap-4 items-between">
                            <div className="hover:text-red-500"><FaYoutube size={32} /></div>
                            <div className="hover:text-pink-600" onClick={() => window.open("https://www.instagram.com/kart_uns/?hl=en")}><FaSquareInstagram size={32} /></div>
                            <div className="hover:text-sky-700"><FaFacebook size={32} /></div>
                            <div className="hover:text-yellow-500" onClick={() => window.open("mailto:kartunsalumni@gmail.com")}><MdEmail size={32} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}