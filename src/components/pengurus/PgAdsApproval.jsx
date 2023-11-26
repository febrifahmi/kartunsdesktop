import { useState, useRef } from "react"
import { ReadCookieLocal } from "../../config/utils";

export const PgAdsApproval = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    let cookie = ReadCookieLocal()

    return (
        <>
            <div className="px-5">
                Ads Approval Page
            </div>
        </>
    )
}