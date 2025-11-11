import { fetchData } from "@/lib/api";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { contextID } from "../layouts/Layout";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Clock } from "lucide-react";
import { GoDotFill } from "react-icons/go";

const Album = () => {

  const [album, setAlbum] = useState<any[]>([]);
  const { id } = useParams()
  
  const { setTrackID, setAlbumID } = useContext(contextID)
  
  // AlbumID - чтобы чeрез context передать в => SidebarRight и отобразить
  useEffect(() => {
    if (id) {
      setAlbumID(id);
    }
  }, [id, setAlbumID])
  
  // Tracks
  useEffect(() => {
    fetchData(`/albums/${id}/tracks`).then((res) => {
      setAlbum(res.items)
      console.log("this is my album", res.items)
    });
  }, [id])
  
  // Albums
  const [albums, setAlbums] = useState<any>(null);

  useEffect(() => {
    fetchData(`/albums/${id}`).then((res) => {
      console.log("this is album itself", res)
      setAlbums(res)
      
    });
  }, [])

 


  return (
    <div className="px-8 pt-8 overflow-x-hidden scrollbar-hidden h-[80vh]">

        {albums && (
          <div className="flex items-center gap-3 mt-2 hover:bg-neutral-900 rounded-[5px] h-fit px-2 mb-10">
            <img
              src={albums.images?.[0]?.url}
              alt={albums.name}
              className="rounded-[10px] w-40 h-40 object-cover"
            />
            <div>
              <p className="text-[14px] font-semibold text-white">Альбом</p>
              <p className="text-6xl text-white font-bold">{albums.name}</p>
              <div className="flex items-center text-[14px] text-neutral-400 mt-5">
                <p className="font-bold text-white">{albums.artists?.[0]?.name}</p>
                <GoDotFill className="mt-0.5 h-2" />
                <p>{albums.tracks?.total} треков</p>
              </div>
            </div>
          </div>
        )}

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
          {album.map((track, index) => (
            <TableRow key={track.id} className="hover:bg-neutral-800 border-none" onClick={() => setTrackID(track.id)}>
              <TableCell className="font-medium text-neutral-400">
                {index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">
                      {track.name}
                    </span>
                    <span className="text-neutral-400 text-sm">
                      {track.artists?.map((artist: any) => artist.name).join(', ')}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-neutral-400">
                {track?.album?.name}
              </TableCell>
              <TableCell className="text-neutral-400">
                {track?.duration_ms &&
                  new Date(track.duration_ms).getMinutes() + ':' +
                  String(new Date(track.duration_ms).getSeconds()).padStart(2, '0')
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Album