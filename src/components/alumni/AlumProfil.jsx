import { ProfilDetail } from "../ProfilDetail"

export const AlumProfil = () => {
    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Detail Profil</h3>
                <div className="pb-10">
                    <ProfilDetail />
                </div>
            </div>
        </>
    )
}