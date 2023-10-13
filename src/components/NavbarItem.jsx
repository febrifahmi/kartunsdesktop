export const NavbarItem = (props) => {
    let navtext = props.title;
    let selected = props.selected;
    return (
        <>
            <div>
                <button className={selected === navtext ? "bg-green-700 text-white font-bold px-4 py-1 rounded-full" : "bg-slate-900 hover:bg-green-700 text-green-500 hover:text-white hover:font-bold px-4 py-1 rounded-full"}>{navtext}</button>
            </div>
        </>
    )
}