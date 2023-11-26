import { MembershipDetail } from "../MembershipDetail"

export const AlumKeanggotaan = () => {
    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Keanggotaan/<span className="italic">Membership</span></h3>
                <MembershipDetail />
            </div>
        </>
    )
}