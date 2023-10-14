export const ArtikelItem = ({ props }) => {
    const artikel = props.idartikel
    return (
        <>
            <div className="flex flex-col justify-start p-5 bg-slate-900 hover:bg-black rounded-md w-1/6" key={item.idarticle}>
                <hr className="border-slate-700 py-2 border-dotted" />
                <div>{item.articletitle}</div>
                <div className="text-xs text-slate-700 mt-2">{item.created_at}</div>
            </div>
        </>
    )
}