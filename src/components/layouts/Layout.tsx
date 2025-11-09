import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "../my_ui/Header";
import Sidebar from "../my_ui/Sidebar";
import SidebarRight from "../my_ui/SidebarRight";
import Player from "../my_ui/Player";

export const contextID = createContext<any>(null)

const Layout: React.FC = () => {

    useEffect(() => {
        console.log(localStorage.getItem("token")); // token => access_token
    }, []);

    const [trackID, setTrackID] = useState(null)
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [currentTrack, setCurrentTrack] = useState<any>({
        name: "PASSO BEM SOLTO",
        artists: "ATLXS",
        image: "https://avatars.yandex.net/get-music-content/15401259/5b706773.a.35470856-1/m1000x1000",
        id: "",
        album: "",
        duration: 0
    });
    const [albumID, setAlbumID] = useState<string>('');
    const [activeSidebar, setActiveSidebar] = useState(true)


    return (
        <>
            <contextID.Provider value={{ trackID, setTrackID, playlists, setPlaylists, currentTrack, setCurrentTrack, albumID, setAlbumID, activeSidebar, setActiveSidebar }}>
                <Header />
                <main className={`w-full min-w-[900px] h-screen pt-10 bg-black grid ${activeSidebar ? "grid-cols-[370px_1fr_370px]" : "grid-cols-[70px_1fr_370px]"} gap-3`}>
                    <Sidebar />
                    <div className="mt-5 overflow-y-auto scrollbar-hidden rounded-[5px] h-fit bg-neutral-950">
                        <Outlet />
                    </div>
                    < SidebarRight />


                </main>
                <Player />

            </contextID.Provider>
        </>
    )
}

export default Layout