import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ServiceCard } from "../components/ServiceCard"
import { getServices } from "../api/services"
import { getGallery } from "../api/gallery"
import { Sparkles, Star, Clock } from "lucide-react"
import { PageTransition } from "../components/PageTransition"

export function Home() {
    const [services, setServices] = useState([])
    const [gallery, setGallery] = useState([])
    const [heroIndex, setHeroIndex] = useState(0)

    useEffect(() => {
        getServices().then(data => setServices(data.slice(0, 3))).catch(() => {})
        getGallery().then(data => setGallery(data)).catch(() => {})
    }, [])

    useEffect(() => {
        if (gallery.length === 0) return
        const interval = setInterval(() => {
            setHeroIndex(i => (i + 1) % gallery.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [gallery.length])

    return (
        <PageTransition className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero */}
            <section className="relative py-20 px-4 text-center overflow-hidden min-h-[420px] flex items-center justify-center">
                {gallery.length > 0 ? (
                    gallery.map((img, i) => (
                        <div
                            key={img.id}
                            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                            style={{ backgroundImage: `url(${img.image_url})`, opacity: i === heroIndex ? 1 : 0 }}
                        />
                    ))
                ) : (
                    <div className="absolute inset-0 bg-peach" />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 w-full">
                    <p className="text-cream/80 text-sm font-medium uppercase tracking-widest mb-3">Premium Nail Studio</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-cream mb-4 leading-tight">
                        DBClaws
                    </h1>
                    <p className="text-cream/70 text-lg max-w-md mx-auto mb-8">
                        Treat yourself to a luxurious nail experience. Gel, acrylics, nail art, and more.
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <Link to="/booking" className="bg-dusty text-cream font-medium px-6 py-3 rounded-full hover:bg-cocoa transition shadow-sm">
                            Book Appointment
                        </Link>
                        <Link to="/services" className="border border-cream text-cream font-medium px-6 py-3 rounded-full hover:bg-white/10 transition">
                            View Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why us */}
            <section className="py-14 px-4 max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    {[
                        { icon: <Star className="mx-auto text-dusty" size={28} />, title: "Premium Quality", desc: "We use only top-tier products for lasting, stunning results." },
                        { icon: <Sparkles className="mx-auto text-dusty" size={28} />, title: "Expert Artists", desc: "Our nail technicians are trained professionals with years of experience." },
                        { icon: <Clock className="mx-auto text-dusty" size={28} />, title: "Easy Booking", desc: "Schedule your appointment online in minutes, any time." },
                    ].map(item => (
                        <div key={item.title} className="p-6 rounded-2xl border border-peach bg-cream shadow-sm">
                            {item.icon}
                            <h3 className="font-semibold text-cocoa mt-3 mb-1">{item.title}</h3>
                            <p className="text-sage text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services preview */}
            {services.length > 0 && (
                <section className="py-10 px-4 bg-cream">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-cocoa">Our Services</h2>
                            <Link to="/services" className="text-dusty text-sm font-medium hover:text-cocoa">View all →</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {services.map(s => <ServiceCard key={s.id} service={s} />)}
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery preview */}
            {gallery.length > 0 && (
                <section className="py-14 px-4 max-w-6xl mx-auto w-full">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-cocoa">Our Work</h2>
                        <Link to="/gallery" className="text-dusty text-sm font-medium hover:text-cocoa">See gallery →</Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {gallery.slice(0, 4).map(img => (
                            <div key={img.id} className="aspect-square overflow-hidden rounded-xl bg-peach">
                                <img src={img.image_url} alt={img.caption || "Gallery"} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-dusty py-14 text-center px-4 mt-auto">
                <h2 className="text-cream text-3xl font-bold mb-3">Ready to treat yourself?</h2>
                <p className="text-cream/70 mb-6">Book your appointment today and let us take care of you.</p>
                <Link to="/booking" className="bg-cream text-dusty font-semibold px-6 py-3 rounded-full hover:bg-peach transition shadow">
                    Book Now
                </Link>
            </section>

            <Footer />
        </PageTransition>
    )
}
