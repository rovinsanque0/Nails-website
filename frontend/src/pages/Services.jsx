import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ServiceCard } from "../components/ServiceCard"
import { getServices } from "../api/services"
import { PageTransition } from "../components/PageTransition"

export function Service() {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getServices()
            .then(setServices)
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return (
        <PageTransition className="min-h-screen flex flex-col">
            <Navbar />

            <section className="bg-peach py-12 px-4 text-center">
                <h1 className="text-3xl font-bold text-cocoa mb-2">Our Services</h1>
                <p className="text-sage max-w-md mx-auto">Everything you need for beautiful, healthy nails.</p>
            </section>

            <section className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-44 rounded-2xl bg-peach animate-pulse" />
                        ))}
                    </div>
                ) : services.length === 0 ? (
                    <p className="text-center text-sage py-20">No services available yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {services.map(s => <ServiceCard key={s.id} service={s} />)}
                    </div>
                )}
            </section>

            <Footer />
        </PageTransition>
    )
}
