import { MainData, MainMusicData } from "@/data/data"
import PlaylistsElem from "../my_ui/PlaylistsElem"
import { Button } from "../ui/button"

const Home = () => {


    return (
        <div className="w-[710px] h-[80vh] mt-3 pt-5 rounded-[5px] text-white flex flex-col justify-start bg-neutral-950 px-8">
            <div className="flex gap-3">
                <Button className="bg-white text-neutral-800 text-[13px] hover:text-white rounded-full h-7">Все</Button>
                <Button className="bg-white/10 text-white text-[13px] hover:text-white rounded-full h-7">Музыка</Button>
                <Button className="bg-white/10 text-white text-[13px] hover:text-white rounded-full h-7">Подкасты</Button>

            </div>

            <PlaylistsElem />

            <div className="w-full mt-5 overflow-x-hidden scrollbar-hidden">
                {MainData.map((item, index) => (
                    <div key={index} className="mt-5">
                        <h1 className="text-[20px] font-semibold">{item}</h1>
                        <div className="flex rounded-[5px] mt-3 overflow-y-hidden scrollbar-hidden">
                            {MainMusicData.map((item, index) => (
                                <div key={index} className="w-[160px] flex-shrink-0 hover:bg-neutral-800 p-3 rounded-[5px]">
                                    <img src={item.image} />
                                    <p>{item.name}</p>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Home

