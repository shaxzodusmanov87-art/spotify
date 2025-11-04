import { PlaylistData } from "@/data/data"

const PlaylistsElem = () => {
    return (
        <div className="flex gap-3">
            {PlaylistData.map((item, index) => (
                <div key={index} className="w-[230px] flex items-center gap-3 hover:bg-neutral-900 rounded-[5px] mt-5 bg-white/5">
                    <img src={item.image} className="w-11 rounded-[5px]" />
                    <p className="text-[14px] font-semibold">{item.name}</p>

                </div>
            ))}
        </div>
    )
}

export default PlaylistsElem