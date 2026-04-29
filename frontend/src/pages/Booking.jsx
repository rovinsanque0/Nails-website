import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { BookingForm } from "../components/BookingForm"
import { PageTransition } from "../components/PageTransition"

export function Booking() {
    return (
        <PageTransition className="min-h-screen flex flex-col">
            <Navbar />

            <section className="bg-peach py-12 px-4 text-center">
                <h1 className="text-3xl font-bold text-cocoa mb-2">Book an Appointment</h1>
                <p className="text-sage max-w-md mx-auto">Choose your service, pick a time, and we'll take it from there.</p>
            </section>

            <section className="flex-1 flex items-start justify-center px-4 py-12">
                <div className="w-full max-w-md bg-cream rounded-2xl border border-peach p-6 shadow-sm">
                    <BookingForm />
                </div>
            </section>

            <Footer />
        </PageTransition>
    )
}
