import { Route, Routes } from "react-router"
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import Layout from "./components/layouts/Layout"
import Login from "./components/pages/Login"

const App: React.FC = () => {

  //   const spotify = {
  //     client_id: "Dcfe923b2d660439caf2b557b21f31221",
  //     // client_id: "f2e286ece2574ad6b334b55d03764483",
  //     // REDIRECT_URI: "https://weprospoty.netlify.app/",
  //     REDIRECT_URI: "http://localhost:5173",
  //     AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
  //     RESPONSE_TYPE: "token",
  //     token: ""
  // }

  {/* <a href={`${spotify.AUTH_ENDPOINT}?client_id=${spotify.client_id}&redirect_uri=${spotify.REDIRECT_URI}&response_type=${spotify.RESPONSE_TYPE}&scope=playlist-modify-public`}>
  <button>Log in</button>

</a> */}


  return (
    <>
      
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />

        </Route>

        

      </Routes>
    </>
  )
}

export default App
