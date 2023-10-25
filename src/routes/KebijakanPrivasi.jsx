import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreateStatusCookie } from "../config/utils";
import { Breadcrumb } from "../components/Breadcrumb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const KebijakanPrivasi = () => {
    const navigate = useNavigate();
    const landing = () => navigate("/");

    CreateStatusCookie("Kebijakan Privasi")

    return (
        <>
            <div className="bg-slate-900 flex flex-col">
                <Breadcrumb />
                <div className="bg-slate-800 px-40 pt-20 m-2 rounded-md">
                    <h3 className="font-bold text-center text-xl text-green-500">Kebijakan Privasi</h3>
                    <div className="mt-10 w-full">
                        <p className="mb-8">Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan dan membagikan informasi pribadi Anda ketika Anda mengunjungi situs web kami atau menggunakan layanan kami. Kami memahami bahwa privasi Anda sangat penting bagi Anda, dan kami bekerja keras untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan apa yang kami lakukan dengan informasi pribadi Anda, termasuk bagaimana kami mengumpulkan, menggunakan, dan membagikannya. Kebijakan Privasi ini juga menjelaskan hak-hak Anda terkait dengan informasi pribadi Anda dan bagaimana Anda dapat mengakses atau memperbarui informasi pribadi Anda.</p>

                        <h4 className="text-xl font-bold mb-8 ">Informasi Pribadi yang Kami Kumpulkan</h4>

                        <p className="mb-8">Kami dapat mengumpulkan informasi pribadi Anda, seperti nama, alamat email, nomor telepon, dan informasi lain yang Anda berikan kepada kami melalui situs web atau layanan kami. Kami juga dapat mengumpulkan informasi tidak pribadi tentang Anda, seperti informasi tentang perangkat Anda atau cara Anda menggunakan layanan kami.</p>

                        <h4 className="text-xl font-bold mb-8">Penggunaan Informasi Pribadi</h4>

                        <p className="mb-8">Kami menggunakan informasi pribadi Anda untuk menyediakan layanan kepada Anda, termasuk untuk mengirimkan informasi yang Anda minta, menanggapi pertanyaan atau masalah Anda, dan untuk memberikan pembaruan dan informasi terkait layanan kami. Kami juga dapat menggunakan informasi pribadi Anda untuk meningkatkan layanan kami dan untuk memahami lebih baik kebutuhan pelanggan kami.</p>

                        <h4 className="text-xl font-bold mb-8">Pembagian Informasi Pribadi</h4>

                        <p className="mb-8">Kami tidak akan membagikan informasi pribadi Anda dengan pihak ketiga kecuali jika kami diwajibkan oleh hukum atau jika kami percaya bahwa pembagian tersebut diperlukan untuk melindungi hak-hak kami atau untuk melakukan tindakan hukum.</p>

                        <h4 className="text-xl font-bold mb-8">Hak-Hak Anda terkait Informasi Pribadi</h4>

                        <p className="mb-8">Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi pribadi Anda yang kami simpan. Jika Anda ingin mengakses atau memperbarui informasi pribadi Anda, atau jika Anda memiliki pertanyaan lain tentang Kebijakan Privasi ini, silakan hubungi kami melalui alamat email yang tercantum di bawah ini.</p>

                        <h4 className="text-xl font-bold mb-8">Perubahan terhadap Kebijakan Privasi</h4>

                        <p className="mb-8">Kami dapat melakukan penyesuaian terhadap kebijakan privasi ini sewaktu-waktu, tanpa harus menyampaikan informasi sebelumnya kepada Anda. Meskipun demikian, kami mencoba untuk setransparan mungkin dan akan menyediakan tautan sejarah perubahan kebijakan privasi sebelumnya.</p>
                    </div>
                    <button className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md mb-8 text-white" onClick={landing}>Back</button>
                </div>
            </div>
        </>
    )
}