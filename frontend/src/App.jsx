import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { AuthProvider } from "./context/AuthContext"
import { AdminDashboard } from "./pages/Admin/AdminDashboard"
import { ManageAppointments } from "./pages/Admin/ManageAppointments"
import { ManageGallery } from "./pages/Admin/ManageGallery"
import { ManageServices } from "./pages/Admin/ManageServices"
import { Service } from "./pages/Services"
import { Home } from "./pages/Home"
import { Gallery } from "./pages/Gallery"
import { Contact } from "./pages/Contact"
import { Booking } from "./pages/Booking"
import { Login } from "./pages/Login"
import { ProtectedRoute } from "./components/ProtectedRoute"

function AppRoutes() {
    const location = useLocation()
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Service />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
                <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>}>
                    <Route path="appointments" element={<ManageAppointments />} />
                    <Route path="gallery" element={<ManageGallery />} />
                    <Route path="services" element={<ManageServices />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    )
}
