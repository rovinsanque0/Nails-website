import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ContactForm } from "../components/ContactForm"
import { Mail, Clock } from "lucide-react"
import { PageTransition } from "../components/PageTransition"

export function Contact() {
    return (
        <PageTransition className="min-h-screen flex flex-col">
            <Navbar />

            <section className="bg-peach py-12 px-4 text-center">
                <h1 className="text-3xl font-bold text-cocoa mb-2">Contact Us</h1>
                <p className="text-sage max-w-md mx-auto">Have a question or want to chat? Send us a message.</p>
            </section>

            <section className="flex-1 max-w-5xl mx-auto w-full px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Form */}
                <div className="bg-cream rounded-2xl border border-peach p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-cocoa mb-4">Send a Message</h2>
                    <ContactForm />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-6">
                    <div className="bg-cream rounded-2xl border border-peach p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-cocoa mb-4">Contact Info</h2>
                        <ul className="flex flex-col gap-4 text-sm text-cocoa/70">
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-dusty shrink-0" />
                                <a href="mailto:rovinsanque3@gmail.com" className="hover:text-dusty transition">rovinsanque3@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock size={18} className="text-dusty shrink-0" />
                                <span>By schedule</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </PageTransition>
    )
}
