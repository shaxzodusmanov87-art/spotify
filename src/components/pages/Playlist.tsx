import { fetchData } from "@/lib/api";
import { useContext, useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Clock } from "lucide-react";
import { contextID } from "../layouts/Layout";

const Playlist = () => {

    // const [playlists, setPlaylists] = useState<any[]>([]);
    const [tracks, setTracks] = useState<any[]>([]);

    const { setTrackID, playlists, setPlaylists, setCurrentTrack } = useContext(contextID)

    const handleTrackClick = (trackItem: any) => {
        // Устанавливаем ID трека
        setTrackID(trackItem.track?.id);
        
        setCurrentTrack({
            id: trackItem.track?.id,
            name: trackItem.track?.name,
            artists: trackItem.track?.artists?.map((artist: any) => artist.name).join(', '),
            album: trackItem.track?.album?.name,
            image: trackItem.track?.album?.images?.[0]?.url,
            duration: trackItem.track?.duration_ms,
        });
    }

    useEffect(() => {
        const fetchPlaylistsAndTracks = async () => {
            try {
                const playlistsRes = await fetchData("/me/playlists");
                console.log("Плейлисты:", playlistsRes.items);
                setPlaylists(playlistsRes.items);

                if (playlistsRes.items && playlistsRes.items.length > 0) {
                    const firstPlaylistId = playlistsRes.items[0].id;
                    console.log("ID первого плейлиста:", firstPlaylistId);

                    const tracksRes = await fetchData(`/playlists/${firstPlaylistId}/tracks`);
                    console.log("Треки этого плейлиста:", tracksRes);
                    console.log("Items треков:", tracksRes.items); 

                    setTracks(tracksRes.items || []);
                }
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchPlaylistsAndTracks();
    }, []);

    return (
        <div className="text-white bg-neutral-950 h-[80vh] pt-8 px-3">
            <div className="flex items-center gap-5 mt-2 hover:bg-neutral-900 rounded-[5px] h-fit px-2 mb-10">
                <img src={playlists[0]?.images[0]?.url} className="w-40 rounded-[5px]" />
                <div>
                    <p className="text-[14px] font-semibold">Открытый плейлист</p>
                    <p className="text-6xl text-white font-bold">{playlists[0]?.name}</p>
                    <div className="flex items-center text-[14px] text-neutral-400 mt-5">
                        <p className="font-bold text-white">Shaxzod Usmanov</p>
                        <GoDotFill className="mt-0.5 h-2" />
                        <p className="">11 треков, 19 мин.30 сек.</p>

                    </div>
                </div>

            </div>


            <div className="px-3">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-neutral-900 border-none">
                            <TableHead className="w-[50px] text-white">#</TableHead>
                            <TableHead className="text-white">Название</TableHead>
                            <TableHead className="text-white">Альбом</TableHead>
                            <TableHead className="text-white"><Clock className="w-4" /></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tracks.map((trackItem, index) => (
                            <TableRow key={trackItem.track?.id} className="hover:bg-neutral-800 border-none" onClick={() => handleTrackClick(trackItem)}>
                                <TableCell className="font-medium text-neutral-400">
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={trackItem.track?.album?.images?.[2]?.url}
                                            alt={trackItem.track?.name}
                                            className="w-10 h-10 rounded"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium">
                                                {trackItem.track?.name}
                                            </span>
                                            <span className="text-neutral-400 text-sm">
                                                {trackItem.track?.artists?.map((artist: any) => artist.name).join(', ')}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-neutral-400">
                                    {trackItem.track?.album?.name}
                                </TableCell>
                                <TableCell className="text-neutral-400">
                                    {trackItem.track?.duration_ms &&
                                        new Date(trackItem.track.duration_ms).getMinutes() + ':' +
                                        String(new Date(trackItem.track.duration_ms).getSeconds()).padStart(2, '0')
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>


        </div >
    )
}

export default Playlist