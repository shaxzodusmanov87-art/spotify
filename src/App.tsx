import { Route, Routes } from "react-router"
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import Login from "./components/pages/Login2"
import Layout from "./components/layouts/Layout2"

const App: React.FC = () => {

  return (
    <>
      
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

        </Route>

        

      </Routes>
    </>
  )
}

export default App
