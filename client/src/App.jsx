import ChatApp from './Pages/chatApp'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileCreate from './Pages/ProfileCreate';
import Home from './Pages/Home'
import DropPage from './Pages/DropPage'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<ProfileCreate />} />
        <Route path="/" element={<DropPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<ChatApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
