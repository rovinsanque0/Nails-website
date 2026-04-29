import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { Menu, X } from "lucide-react"

export function Navbar() {
    const { token, user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    function handleLogout() {
        logout()
        navigate("/")
    }

    const links = [
        { to: "/", label: "Home" },
        { to: "/services", label: "Services" },
        { to: "/gallery", label: "Gallery" },
        { to: "/contact", label: "Contact" },
    ]

    return (
        <nav className="bg-cream border-b border-peach sticky top-0 z-50 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-cocoa tracking-wide">
                    DBClaws
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map(l => (
                        <Link key={l.to} to={l.to} className="text-cocoa/70 hover:text-dusty transition text-sm font-medium">
                            {l.label}
                        </Link>
                    ))}
                    {user?.is_admin && (
                        <Link to="/admin/appointments" className="text-sm font-medium text-cocoa/70 hover:text-dusty transition">
                            Admin
                        </Link>
                    )}
                    {token ? (
                        <button onClick={handleLogout} className="text-sm font-medium text-sage hover:text-dusty transition">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="text-sm font-medium text-sage hover:text-dusty transition">
                            Login
                        </Link>
                    )}
                    <Link to="/booking" className="bg-dusty text-cream text-sm font-medium px-4 py-2 rounded-full hover:bg-cocoa transition">
                        Book Now
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button className="md:hidden text-cocoa" onClick={() => setOpen(!open)}>
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-cream border-t border-peach px-4 pb-4 flex flex-col gap-3 pt-2">
                    {links.map(l => (
                        <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-cocoa/70 hover:text-dusty text-sm font-medium">
                            {l.label}
                        </Link>
                    ))}
                    {user?.is_admin && (
                        <Link to="/admin/appointments" onClick={() => setOpen(false)} className="text-sm font-medium text-cocoa/70 hover:text-dusty">
                            Admin
                        </Link>
                    )}
                    {token ? (
                        <button onClick={() => { handleLogout(); setOpen(false) }} className="text-left text-sm text-sage hover:text-dusty">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" onClick={() => setOpen(false)} className="text-sm text-sage hover:text-dusty">
                            Login
                        </Link>
                    )}
                    <Link to="/booking" onClick={() => setOpen(false)} className="bg-dusty text-cream text-sm font-medium px-4 py-2 rounded-full text-center hover:bg-cocoa transition">
                        Book Now
                    </Link>
                </div>
            )}
        </nav>
    )
}
