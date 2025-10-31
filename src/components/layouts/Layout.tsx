import React from "react";
import { Outlet } from "react-router";

// interface LayoutProps {
//     children: React.ReactNode
// }

const Layout: React.FC = () => {
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