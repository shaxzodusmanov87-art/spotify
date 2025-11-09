import { MainData, MainMusicData, PlaylistData } from "@/data/data"
import { Button } from "../ui/button"
import { fetchData } from "@/lib/api";
import { createContext, useEffect, useState } from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router";


const Home = () => {

    const [albums, setAlbums] = useState<any[]>([]);

    useEffect(() => {
        fetchData("/browse/new-releases").then((res) => {
            setAlbums(res.albums.items)
            console.log(res.albums.items)
        });
    }, [])

    // useEffect(() => {
    //     fetchData("/recommendations/available-genre-seeds").then((res) => {
    //         console.log("Недавно прослушанное", res)
    //     });
    // }, [])

    // useEffect(() => {
    //     const fetchMyTracks = async () => {
    //         try {
    //             const savedTracks = await fetchData("/me/tracks");
    //             console.log("Сохранённые треки:", savedTracks.items);
    //             setTracks(savedTracks.items);
    //         } catch (error) {
    //             console.error("Ошибка при загрузке треков:", error);
    //         }
    //     };

    //     fetchMyTracks();
    // }, []);


    return (
        <div className="relative h-[80vh] rounded-[5px] text-white flex flex-col justify-start bg-neutral-950">        

            <div className={`sticky top-0 flex gap-3 px-8 z-1000 py-5 transition-all duration-300 bg-neutral-950`} >
                <Button className="bg-white text-neutral-800 text-[14px] hover:text-white rounded-full h-7">Все</Button>
                <Button className="bg-white/10 text-white text-[14px] hover:text-white rounded-full h-7">Музыка</Button>
                <Button className="bg-white/10 text-white text-[14px] hover:text-white rounded-full h-7">Подкасты</Button>

            </div>


            <div className="w-full">
                {/* Playlists Elem */}
                <div className="flex gap-3 px-8">
                    {PlaylistData.map((item, index) => (
                        <div key={index} className="w-[230px] flex items-center gap-3 hover:bg-neutral-900 rounded-[5px] bg-white/5">
                            <img src={item.image} className="w-11 rounded-[5px]" />
                            <p className="text-[14px] font-semibold">{item.name}</p>

                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    {MainData.map((section, index) => (
                        <div key={index}>
                            <h1 className="text-[20px] font-semibold mb-1 mt-3 px-8">{section}</h1>

                            <Carousel opts={{ align: "start" }} className="w-full">
                                <CarouselContent>
                                    {albums.map((album) => (
                                        <CarouselItem
                                            key={album.id}
                                            className="md:basis-1/2 lg:basis-1/4 flex h-55 items-center"
                                        >
                                            <Link
                                                key={album.id}
                                                to={"/album/" + album.id}
                                            >
                                                <Card className="bg-neutral-950 hover:bg-neutral-900 cursor-pointer border-none w-[180px] py-1 rounded-[10px]">
                                                    <CardContent className="p-2">
                                                        <img
                                                            src={album.images?.[2]?.url}
                                                            alt={album.name}
                                                            className="rounded-[10px]"
                                                        />
                                                        <p className="mt-2 text-center font-semibold text-white">{album.name}</p>
                                                    </CardContent>
                                                </Card>
                                        </Link>
                                        </CarouselItem>
                                    ))}
                            </CarouselContent>

                            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-900 hover:bg-neutral-800 border-none hover:text-white" />

                            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-900 hover:bg-neutral-800 border-none hover:text-white" />
                        </Carousel>
                        </div>
                    ))}

            </div>
        </div>


        </div >

    )
}

export default Home

