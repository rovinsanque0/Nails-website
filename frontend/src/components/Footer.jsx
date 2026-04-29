import { Link } from "react-router-dom"
import { Instagram, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-cocoa text-cream/70 mt-auto">
            <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-cream text-lg font-bold mb-2">Nails by Regina</h3>
                    <p className="text-sm text-cream/50">Premium nail care & beauty services. Book your appointment today.</p>
                </div>
                <div>
                    <h4 className="text-cream text-sm font-semibold mb-3 uppercase tracking-wider">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        {["/services", "/gallery", "/contact", "/booking"].map(path => (
                            <li key={path}>
                                <Link to={path} className="hover:text-dusty transition capitalize">
                                    {path.slice(1)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-cream text-sm font-semibold mb-3 uppercase tracking-wider">Contact</h4>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><Mail size={14} /> rovinsanque3@gmail.com</li>
                        <li className="flex items-center gap-2"><Instagram size={14} /> @nailsbyregina</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-cream/10 text-center text-xs text-cream/30 py-4">
                © {new Date().getFullYear()} Nails by Regina. All rights reserved.
            </div>
        </footer>
    )
}
