import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { getGallery } from "../api/gallery"
import { PageTransition } from "../components/PageTransition"
import { X } from "lucide-react"

export function Gallery() {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        getGallery()
            .then(setImages)
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return (
        <PageTransition className="min-h-screen flex flex-col">
            <Navbar />

            <section className="bg-peach py-12 px-4 text-center">
                <h1 className="text-3xl font-bold text-cocoa mb-2">Our Gallery</h1>
                <p className="text-sage max-w-md mx-auto">A glimpse of our work — every nail tells a story.</p>
            </section>

            <section className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-square rounded-xl bg-peach animate-pulse" />
                        ))}
                    </div>
                ) : images.length === 0 ? (
                    <p className="text-center text-sage py-20">No gallery images yet.</p>
                ) : (
                    <div className="columns-2 md:columns-4 gap-3 space-y-3">
                        {images.map(img => (
                            <div
                                key={img.id}
                                className="break-inside-avoid overflow-hidden rounded-xl bg-peach will-change-transform cursor-pointer"
                                onClick={() => setSelected(img)}
                            >
                                <img
                                    src={img.image_url}
                                    alt={img.caption || "Gallery image"}
                                    className="w-full object-cover hover:scale-105 transition duration-300"
                                />
                                {img.caption && (
                                    <p className="text-xs text-sage px-2 py-1">{img.caption}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />

            {selected && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelected(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-cream transition"
                        onClick={() => setSelected(null)}
                    >
                        <X size={28} />
                    </button>
                    <img
                        src={selected.image_url}
                        alt={selected.caption || "Gallery image"}
                        className="max-h-[90vh] max-w-full rounded-xl object-contain"
                        onClick={e => e.stopPropagation()}
                    />
                    {selected.caption && (
                        <p className="absolute bottom-6 text-sm text-white/70">{selected.caption}</p>
                    )}
                </div>
            )}
        </PageTransition>
    )
}
