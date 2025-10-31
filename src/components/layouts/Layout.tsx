import React, { useEffect } from "react";
import { Outlet } from "react-router";

// interface LayoutProps {
//     children: React.ReactNode
// }

const Layout: React.FC = () => {

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash
                ?.substring(1)
                ?.split("&")
                ?.find((elem) => elem.startsWith("access_token"))
                ?.split("=")[1] ?? null

            window.location.hash = "";
            window.localStorage.setItem("token", token || "")
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