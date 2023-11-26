import { APIURLConfig } from "../config"

export const ArtikelComponent = (props) => {
    const data = props.data
    const selection = props.getSelection
    console.log("Datanya:", data)

    // https://stackoverflow.com/a/1199420
    function truncate(str, n, useWordBoundary) {
        if (str.length <= n) { return str; }
        const subString = str.slice(0, n - 1); // the original check
        return (useWordBoundary
            ? subString.slice(0, subString.lastIndexOf(" "))
            : subString) + " …";
    };

    function ImageExist(url) {
        var img = new Image();
        img.src = url;
        if(img.height === 0){
            return false
        } else {
            return true
        }
    }

    return (
        <>
            <div className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-thumb-slate-600 overflow-auto h-full">
                {data !== undefined ? data.slice(0, 30).map((item) => (
                    <div className="flex flex-row gap-4 justify-start p-2 bg-slate-900 hover:bg-black hover:text-sky-600 hover:border-t-[1px] hover:border-t-solid hover:border-green-500 rounded-md mb-2" key={item.idarticle} onClick={() => selection(item.idarticle)}>
                        <div className="w-1/3 h-20">
                            <img className=' object-cover rounded-md w-full h-20' src={item.articleimgurl !== undefined && ImageExist(APIURLConfig.baseurl + "static/uploads/" + item.articleimgurl) ? APIURLConfig.baseurl + "static/uploads/" + item.articleimgurl : 'static/img/noimage.png'}></img>
                        </div>
                        <div className="w-2/3">
                            <div className="text-sm">{truncate(item.articletitle, 40, 8)}</div>
                            <div className="text-xs text-slate-700 mt-2">{item.created_at}</div>
                        </div>
                    </div>
                )) : ""}
            </div>

        </>
    )
}