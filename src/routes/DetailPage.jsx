import { useNavigate } from "react-router-dom";
import { CreateStatusCookie } from "../config/utils";
import { Breadcrumb } from "../components/Breadcrumb";

export const DetailPage = () => {
    const navigate = useNavigate();
    const home = () => navigate("/home");

    CreateStatusCookie("Detail Page")

    return (
        <>
            <div className="bg-slate-900 flex flex-col">
                <Breadcrumb />
                <div className="bg-slate-800 px-40 pt-20 m-2 rounded-md">

                </div>
            </div>
        </>
    )
}