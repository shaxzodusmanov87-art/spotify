import { Check, LucidePanelLeftOpen } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { RiExpandDiagonalLine } from 'react-icons/ri';
import { FaEllipsis } from 'react-icons/fa6';
import { HiOutlineUpload } from 'react-icons/hi';
import { Button } from "../ui/button";
import { contextID } from "../layouts/Layout";
import { fetchData } from "@/lib/api";

const SidebarRight = () => {

    const [activeSidebar, setActiveSidebar] = useState(true)
    const { currentTrack, albumID } = useContext(contextID);

    // Albums
    const [albums, setAlbums] = useState<any>(null);

    useEffect(() => {
        if (albumID) {
            fetchData(`/albums/${albumID}`).then((res) => {
                console.log("this is new album itself", res);
                setAlbums(res);
            }).catch(error => {
                console.error("Error fetching album:", error);
            });
        }
    }, [albumID]);


    return (
        <>
            < div className="group pt-3 pl-3 pr-5 h-[80vh] bg-neutral-950 mt-5 rounded-[5px] text-white overflow-y-auto scrollbar-hidden">
                < div className="flex justify-between items-center" >
                    <div className="flex gap-2 items-center">
                        <button onClick={() => setActiveSidebar(false)} >
                            <LucidePanelLeftOpen className="w-5 text-neutral-400" />
                        </button>
                        {activeSidebar && <p className="text-[14px] font-bold">My Playlist #1</p>}
                    </div>
                    <div className="flex items-center gap-4">
                        <div>
                            <FaEllipsis className="text-neutral-400 hover:bg-neutral-800 w-7 h-7 p-1 rounded-full" />
                        </div>

                        <RiExpandDiagonalLine className="w-7 h-7 text-neutral-400 hover:bg-neutral-800 rounded-full p-1.5" />

                    </div>

                </div >

                {albums && albumID && (
                    <div>
                        <div className="mt-4">
                            <img src={albums.images?.[0]?.url} className="w-full rounded-[5px]" />
                        </div>

                        <div className="flex items-center justify-between gap-1 mt-3">
                            <div>
                                <h1 className="text-2xl font-semibold">{albums.name}</h1>
                                <p className="text-neutral-400">{albums.artists?.[0]?.name}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <HiOutlineUpload className="w-6 h-6 text-neutral-400 hover:bg-neutral-800 rounded-full" />
                                <Check className="bg-[#1ed760] text-black rounded-full w-5 h-5 p-0.5" />
                            </div>
                        </div>

                    </div>

                )}

                {currentTrack && !albums && (
                    <div>
                        <div className="mt-4">
                            <img src={currentTrack.image} className="w-full rounded-[5px]" />
                        </div>

                        <div className="flex items-center justify-between gap-1 mt-3">
                            <div>
                                <h1 className="text-2xl font-semibold">{currentTrack.name}</h1>
                                <p className="text-neutral-400">{currentTrack.artists}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <HiOutlineUpload className="w-6 h-6 text-neutral-400 hover:bg-neutral-800 rounded-full" />
                                <Check className="bg-[#1ed760] text-black rounded-full w-5 h-5 p-0.5" />
                            </div>
                        </div>

                    </div>

                )}

                <div className="mt-3 bg-neutral-900 p-4 rounded-[5px] text-[14px] font-semibold">
                    <p>Об исполнителе</p>
                    <img src="https://i.scdn.co/image/ab6761610000e5eb0dbdfe724b5e256b8ed0327a" className="w-18 rounded-full mt-4" />
                    <div>
                        <p className="mt-4">ATLXS</p>
                        <div className="flex items-center">
                            <p className="pr-3 text-neutral-400">15 989 956 слушателей за месяц</p>
                            <Button className="border border-neutral-400 rounded-full text-[12px]  h-7">Подписаться</Button>
                        </div>
                        <p className="text-neutral-400 mt-4 text-[12px]">ATLXS is an anonymous 18-year-old Italian artist who is revolutionizing the Internet Music scene. With millions of monthly listeners on Spotify, he has quickly become one of the genre’s most influential figures.</p>
                    </div>
                </div>





            </div>



        </>
    )
}

export default SidebarRight