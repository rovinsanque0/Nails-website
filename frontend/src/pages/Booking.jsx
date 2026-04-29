import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { BookingForm } from "../components/BookingForm"
import { PageTransition } from "../components/PageTransition"
import { getBookingStatus } from "../api/appointments"

export function Booking() {
    const [bookingEnabled, setBookingEnabled] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getBookingStatus()
            .then(data => setBookingEnabled(data.booking_enabled))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return (
        <PageTransition className="min-h-screen flex flex-col">
            <Navbar />

            <section className="bg-peach py-12 px-4 text-center">
                <h1 className="text-3xl font-bold text-cocoa mb-2">Book an Appointment</h1>
                <p className="text-sage max-w-md mx-auto">Choose your service, pick a time, and we'll take it from there.</p>
            </section>

            <section className="flex-1 flex items-start justify-center px-4 py-12">
                <div className="w-full max-w-md bg-cream rounded-2xl border border-peach p-6 shadow-sm">
                    {loading ? (
                        <div className="h-40 animate-pulse bg-peach rounded-xl" />
                    ) : !bookingEnabled ? (
                        <div className="text-center py-10">
                            <p className="text-2xl mb-2">😔</p>
                            <p className="text-cocoa font-semibold text-lg mb-1">Booking is closed today</p>
                            <p className="text-sage text-sm">Sorry, we're unavailable right now. Please check back later.</p>
                        </div>
                    ) : (
                        <BookingForm />
                    )}
                </div>
            </section>

            <Footer />
        </PageTransition>
    )
}
