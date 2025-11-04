import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "../my_ui/Header";
import Sidebar from "../my_ui/Sidebar";
import SidebarRight from "../my_ui/SidebarRight";

const Layout: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    async function fetchUserData(token: string) {
        try {
            const res = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error(res.status + "");

            const data = await res.json();

            console.log(data);
        } catch (e: any) {
            if (e.message === "400" || e.message === "401") {
                window.localStorage.removeItem("token");
                window.location.assign("/login");
            }
        }
    }

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash
                .substring(1)
                .split("&")
                .find((elem) => elem.startsWith("access_token"))
                ?.split("=")[1] ?? null;

            console.log("Extracted token:", token);

            if (token) {
                window.localStorage.setItem("token", token);
                window.location.href = ""; // очистить hash без перезагрузки
            }
        }
        if (token) {
            fetchUserData(token).then((data) => setUser(data));
        }

    }, [])

    

    return (
        <>
            <Header />
            <main className="h-screen pt-10 bg-black flex justify-between">
                <Sidebar />
                <div>
                    <Outlet />

                </div>
                < SidebarRight />
                

            </main>
            <footer>Footer</footer>
        </>
    )
}

export default Layout