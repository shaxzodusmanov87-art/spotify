import { Route, Routes } from "react-router"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import Layout from "./components/layouts/Layout"
import AuthSuccess from "./components/custom/Authsuccess"
import Playlist from "./components/pages/Playlist"
import Album from "./components/pages/Album"

const App: React.FC = () => {

	return (
		<>

			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/playlist" element = {<Playlist />} />
					<Route path="/album/:id" element = {<Album />} />

				</Route>

				<Route path="/auth/success" element={<AuthSuccess />} />
				<Route
					path="/error"
					element={<div>Authentication failed</div>}
				/>
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	)
}

export default App
