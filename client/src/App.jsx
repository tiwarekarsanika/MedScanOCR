import ChatApp from './Pages/chatApp'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileCreate from './Pages/ProfileCreate';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatApp />} />
        <Route path="/profile" element={<ProfileCreate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
