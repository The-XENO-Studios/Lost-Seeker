import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./components/pages/landing/LandingPage.tsx"
import AuthPage from "./components/pages/auth/AuthPage.tsx"
import ErrorPage from "./components/pages/error/ErrorPage.tsx"
import ListOfItems from "./components/pages/list/ListOfItems.tsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
