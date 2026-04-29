import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AuthContext } from "../../context/AuthContext"
import { CalendarDays, Image, Scissors, LogOut } from "lucide-react"

const navItems = [
    { to: "/admin/appointments", label: "Appointments", icon: <CalendarDays size={17} /> },
    { to: "/admin/services", label: "Services", icon: <Scissors size={17} /> },
    { to: "/admin/gallery", label: "Gallery", icon: <Image size={17} /> },
]

export function AdminDashboard() {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    function handleLogout() {
        logout()
        navigate("/")
    }

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-56 bg-cocoa text-cream/70 flex flex-col py-6 px-4 shrink-0">
                <Link to="/" className="text-cream font-bold text-lg mb-8 block">Luxe Nails</Link>
                <p className="text-xs uppercase tracking-widest text-cream/30 mb-3">Admin Panel</p>
                <nav className="flex flex-col gap-1 flex-1">
                    {navItems.map(item => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                                location.pathname === item.to
                                    ? "bg-dusty text-cream"
                                    : "hover:bg-cream/10 text-cream/70"
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-cream/40 hover:text-dusty transition mt-4 px-3 py-2"
                >
                    <LogOut size={16} /> Logout
                </button>
            </aside>

            {/* Content */}
            <main className="flex-1 bg-cream p-8 overflow-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    )
}
