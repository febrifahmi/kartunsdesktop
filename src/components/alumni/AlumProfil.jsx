import { useState } from "react"
import { ProfilDetail } from "../ProfilDetail"
import { ProfilEdit } from "../ProfilEdit"

export const AlumProfil = () => {
    const [update, setUpdate] = useState(false)
    console.log(update)
    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Detail Profil</h3>
                <div className="flex flex-col pb-10 gap-4">
                    {
                        update === false ?
                            <ProfilDetail />
                            :
                            <ProfilEdit />
                    }
                    <div className="flex justify-center">
                        {
                            update === false ?
                                <button className="w-28 bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4" onClick={() => setUpdate(true)}>Edit Profil</button>
                                :
                                <button className="w-28 bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4" onClick={() => setUpdate(false)}>Cancel</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}