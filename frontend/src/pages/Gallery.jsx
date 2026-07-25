import { useEffect, useState, useCallback } from "react"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { getGallery } from "../api/gallery"
import { PageTransition } from "../components/PageTransition"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export function Gallery() {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        getGallery()
            .then(setImages)
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const openImage = (index) => {
        setSelectedIndex(index)
        document.body.style.overflow = "hidden"
        setTimeout(() => setVisible(true), 10)
    }

    const closeImage = () => {
        setVisible(false)
        document.body.style.overflow = ""
        setTimeout(() => setSelectedIndex(null), 200)
    }

    const goNext = useCallback((e) => {
        e?.stopPropagation()
        setVisible(false)
        setTimeout(() => {
            setSelectedIndex(i => (i + 1) % images.length)
            setVisible(true)
        }, 150)
    }, [images.length])

    const goPrev = useCallback((e) => {
        e?.stopPropagation()
        setVisible(false)
        setTimeout(() => {
            setSelectedIndex(i => (i - 1 + images.length) % images.length)
            setVisible(true)
        }, 150)
    }, [images.length])

    useEffect(() => {
        if (selectedIndex === null) return
        const handleKey = (e) => {
            if (e.key === "ArrowRight") goNext()
            if (e.key === "ArrowLeft") goPrev()
            if (e.key === "Escape") closeImage()
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [selectedIndex, goNext, goPrev])

    const selected = selectedIndex !== null ? images[selectedIndex] : null

    return (
        <PageTransition className="min-h-screen flex flex-col">
            <Navbar />

            <section className="bg-peach py-12 px-4 text-center">
                <h1 className="text-3xl font-bold text-cocoa mb-2">Our Gallery</h1>
                <p className="text-sage max-w-md mx-auto">A glimpse of our work. Every nail tells a story.</p>
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {images.map((img, index) => (
                            <div
                                key={img.id}
                                className="overflow-hidden rounded-xl bg-peach will-change-transform cursor-pointer"
                                onClick={() => openImage(index)}
                            >
                                <img
                                    src={img.image_url}
                                    alt={img.caption || "Gallery image"}
                                    className="w-full h-full object-cover aspect-square hover:scale-105 transition duration-300"
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
                    className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
                    onClick={closeImage}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-cream transition"
                        onClick={closeImage}
                    >
                        <X size={28} />
                    </button>

                    <button
                        className="absolute left-4 text-white hover:text-cream transition p-2"
                        onClick={goPrev}
                    >
                        <ChevronLeft size={36} />
                    </button>

                    <div
                        className={`flex flex-col items-center transition-all duration-200 ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <img
                            src={selected.image_url}
                            alt={selected.caption || "Gallery image"}
                            className="max-h-[85vh] max-w-full rounded-xl object-contain"
                        />
                        {selected.caption && (
                            <p className="mt-3 text-sm text-white/70">{selected.caption}</p>
                        )}
                        <p className="mt-1 text-xs text-white/40">{selectedIndex + 1} / {images.length}</p>
                    </div>

                    <button
                        className="absolute right-4 text-white hover:text-cream transition p-2"
                        onClick={goNext}
                    >
                        <ChevronRight size={36} />
                    </button>
                </div>
            )}
        </PageTransition>
    )
}
