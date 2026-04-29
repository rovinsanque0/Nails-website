import { Link } from "react-router-dom"
import { Clock } from "lucide-react"

export function ServiceCard({ service }) {
    return (
        <div className="bg-cream rounded-2xl border border-peach p-5 shadow-sm hover:shadow-md transition flex flex-col gap-3">
            <div className="flex items-start justify-between">
                <h3 className="text-cocoa font-semibold text-lg">{service.name}</h3>
                <span className="bg-peach text-dusty text-sm font-semibold px-3 py-1 rounded-full">
                    ${service.price}
                </span>
            </div>
            {service.description && (
                <p className="text-sage text-sm leading-relaxed">{service.description}</p>
            )}
            <div className="flex items-center justify-between mt-auto">
                <span className="flex items-center gap-1 text-sage text-xs">
                    <Clock size={13} /> {service.duration}
                </span>
                <Link
                    to={`/booking?service=${service.id}`}
                    className="text-dusty text-sm font-medium hover:text-cocoa transition"
                >
                    Book →
                </Link>
            </div>
        </div>
    )
}
