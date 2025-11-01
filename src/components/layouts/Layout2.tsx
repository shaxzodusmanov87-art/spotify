import React, { useEffect } from "react";
import { Outlet } from "react-router";


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
            <header>Header</header>
            <main>
                {/* {children} */}
                <Outlet />
            </main>
            <footer>Footer</footer>
        </>
    )
}

export default Layout