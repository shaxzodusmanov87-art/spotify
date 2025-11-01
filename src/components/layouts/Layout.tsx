import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Header from "../my_ui/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../my_ui/AppSidebar";


const Layout: React.FC = () => {
    async function fetchUserData(token: string) {
        try {
            const res = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error(res.statusText);

            const data = await res.json();

            console.log(data);
        } catch (e) {
            console.log(e)
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
                window.location.hash = ""; // очистить hash без перезагрузки
                fetchUserData(token);
            }
        } else if (token) {
            fetchUserData(token);
        }

    }, [])

    return (
        <>
            <Header />
            <main className=" h-screen pt-10">
                    <SidebarProvider>
                        <AppSidebar />
                        <SidebarTrigger className="mt-10" />

                        <Outlet />

                    </SidebarProvider>

            </main>
            <footer>Footer</footer>
        </>
    )
}

export default Layout