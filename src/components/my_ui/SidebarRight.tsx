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
    const { currentTrack, albumID, setWideSidebarRight, wideSidebarRight } = useContext(contextID);

    // Albums
    const [albums, setAlbums] = useState<any>(null);
    const [artist, setArtist] = useState<any>(null);


    useEffect(() => {
        if (albumID) {
            fetchData(`/albums/${albumID}`).then((res) => {
                // console.log("this is new album itself", res);
                setAlbums(res);


                if (res.artists && res.artists.length > 0) {
                    const artistId = res.artists[0].id;
                    fetchData(`/artists/${artistId}`).then((artistRes) => {
                        console.log("this is artist info", artistRes);
                        setArtist(artistRes);
                    });
                }

            }).catch(error => {
                console.error("Error fetching album:", error);
            });
        }
    }, [albumID]);


    return (
        <>
            < div className={`${wideSidebarRight && "w-screen flex flex-col"} group pt-3 pl-3 pr-5 h-[80vh] bg-neutral-950 mt-5 rounded-[5px] text-white overflow-y-auto scrollbar-hidden`}>
                < div className="flex justify-between items-center" >
                    <div className="flex gap-2 items-center">
                        <button onClick={() => setActiveSidebar(false)} >
                            {!wideSidebarRight &&
                                <LucidePanelLeftOpen className="w-5 text-neutral-400" />}
                        </button>
                        {activeSidebar &&
                            <p className="text-[14px] font-bold">
                                {wideSidebarRight ? albums?.name : "My Playlist #1"}

                            </p>}
                    </div>
                    <div className="flex items-center gap-4">
                        <div>
                            <FaEllipsis className="text-neutral-400 hover:bg-neutral-800 w-7 h-7 p-1 rounded-full" />
                        </div>

                        <RiExpandDiagonalLine className="w-7 h-7 text-neutral-400 hover:bg-neutral-800 rounded-full p-1.5" onClick={() => setWideSidebarRight((prev: any) => !prev)} />

                    </div>

                </div >

                {albums && albumID && !wideSidebarRight && (
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

                {wideSidebarRight &&
                    <div>
                        <div className="mt-4">
                            <img src={albums.images?.[0]?.url} className="w-[470px] rounded-[20px] m-auto" />
                        </div>

                        <div className="mt-3 bg-neutral-950 p-4 rounded-[20px] text-[14px] font-semibold flex justify-center items-center gap-10">

                            <div
                                className="w-[500px] h-[500px] mt-4 rounded-[20px] bg-cover bg-center flex flex-col justify-between p-5"
                                style={{ backgroundImage: `url(${artist.images[0].url})` }}
                            >
                                <div>
                                    <p className="text-3xl">Об исполнителе</p>
                                </div>

                            </div>

                            <div
                                className="w-[500px] h-fit mt-4 rounded-[20px] bg-cover bg-center flex flex-col p-5 bg-neutral-900"
                            >
                                <div>
                                    <p className="text-3xl">Сведения</p>
                                </div>

                                <div>
                                    <p className="mt-4">{artist.name}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="pr-3 text-neutral-400">{artist.followers.total} слушателей за месяц</p>
                                        <Button className="border border-neutral-400 rounded-full text-[12px]  h-7">Подписаться</Button>
                                    </div>
                                    <p className="text-neutral-400 mt-4 text-[12px]">{artist.name} is an anonymous 18-year-old Italian artist who is revolutionizing the Internet Music scene. With millions of monthly listeners on Spotify, he has quickly become one of the genre's most influential figures.
                                        His unique sound blends ethereal synth-wave with atmospheric lo-fi beats, creating a dreamlike auditory experience that resonates deeply with Gen Z listeners. Each track tells a story through layered melodies and haunting vocals, often exploring themes of digital loneliness and urban nostalgia.
                                        Despite his young age, his production quality rivals established industry veterans, with carefully crafted soundscapes that transport listeners to otherworldly dimensions. His mysterious persona adds to the allure, letting the music speak for itself while fans speculate about the face behind the sound.
                                    </p>
                                </div>

                            </div>


                        </div>

                    </div>
                }

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

                {artist && !wideSidebarRight &&
                    <div className="mt-3 bg-neutral-900 p-4 rounded-[5px] text-[14px] font-semibold">
                        <p>Об исполнителе</p>
                        <img src={artist.images[0].url} className="w-full mt-4 rounded-[10px]" />
                        <div>
                            <p className="mt-4">{artist.name}</p>
                            <div className="flex items-center">
                                <p className="pr-3 text-neutral-400">{artist.followers.total} слушателей за месяц</p>
                                <Button className="border border-neutral-400 rounded-full text-[12px]  h-7">Подписаться</Button>
                            </div>
                            <p className="text-neutral-400 mt-4 text-[12px]">{artist.name} is an anonymous 18-year-old Italian artist who is revolutionizing the Internet Music scene. With millions of monthly listeners on Spotify, he has quickly become one of the genre’s most influential figures.</p>
                        </div>
                    </div>

                }

                {!artist && !wideSidebarRight &&
                    <div className="mt-3 bg-neutral-900 p-4 rounded-[5px] text-[14px] font-semibold">
                        <p>Об исполнителе</p>
                        <img src="https://i.scdn.co/image/ab6761610000e5eb0dbdfe724b5e256b8ed0327a" className="w-[120px] mt-4 rounded-full" />
                        <div>
                            <p className="mt-4">ATLXS</p>
                            <div className="flex items-center">
                                <p className="pr-3 text-neutral-400">4567853 слушателей за месяц</p>
                                <Button className="border border-neutral-400 rounded-full text-[12px]  h-7">Подписаться</Button>
                            </div>
                            <p className="text-neutral-400 mt-4 text-[12px]">ATLXS is an anonymous 18-year-old Italian artist who is revolutionizing the Internet Music scene. With millions of monthly listeners on Spotify, he has quickly become one of the genre’s most influential figures.</p>
                        </div>
                    </div>

                }




            </div>



        </>
    )
}

export default SidebarRight