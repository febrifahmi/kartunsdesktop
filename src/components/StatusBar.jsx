import { useState } from "react";

export const StatusBar = () => {
    const [status, setStatus] = useState("idle");
    return (
        <>
            <div className='flex grow-0 h-6 text-gray-400 bg-gray-700 items-center'>
                <p className='text-xs px-5'>Status: {status}</p>
            </div>
        </>
    )
}