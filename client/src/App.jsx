import ChatApp from './Pages/chatApp'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileCreate from './Pages/ProfileCreate';
import Home from './Pages/Home'
import DropPage from './Pages/DropPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatApp />} />
        <Route path="/profile" element={<ProfileCreate />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dropyourfileshere" element={<DropPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
