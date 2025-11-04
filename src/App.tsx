import { Route, Routes } from "react-router"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import Layout from "./components/layouts/Layout"

const App: React.FC = () => {

  return (
    <>
      
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />

        </Route>

        

      </Routes>
    </>
  )
}

export default App
