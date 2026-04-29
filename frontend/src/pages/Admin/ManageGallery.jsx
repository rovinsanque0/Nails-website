import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { getGallery, createGallery, deleteGallery } from "../../api/gallery"
import { Trash2 } from "lucide-react"

export function ManageGallery() {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

    useEffect(() => {
        getGallery()
            .then(setImages)
            .catch(() => toast.error("Failed to load gallery."))
            .finally(() => setLoading(false))
    }, [])

    async function onSubmit(data) {
        try {
            const newImage = await createGallery({ image_url: data.image_url, caption: data.caption })
            setImages(prev => [...prev, newImage])
            toast.success("Image added.")
            reset()
            setShowForm(false)
        } catch {
            toast.error("Failed to add image.")
        }
    }

    async function handleDelete(id) {
        try {
            await deleteGallery(id)
            setImages(prev => prev.filter(img => img.id !== id))
            toast.success("Image deleted.")
        } catch {
            toast.error("Failed to delete image.")
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-cocoa">Gallery</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-dusty text-cream text-sm font-medium px-4 py-2 rounded-full hover:bg-cocoa transition"
                >
                    {showForm ? "Cancel" : "+ Add Image"}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-peach p-5 mb-6 shadow-sm flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-cocoa mb-1">Image URL</label>
                        <input
                            {...register("image_url", { required: "Image URL is required" })}
                            className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-cream focus:outline-none focus:ring-2 focus:ring-dusty/30"
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.image_url && <p className="text-dusty text-xs mt-1">{errors.image_url.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-cocoa mb-1">Caption (optional)</label>
                        <input
                            {...register("caption")}
                            className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-cream focus:outline-none focus:ring-2 focus:ring-dusty/30"
                            placeholder="French tips with gold foil"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-dusty text-cream text-sm font-medium px-5 py-2 rounded-full hover:bg-cocoa transition disabled:opacity-60"
                        >
                            {isSubmitting ? "Saving..." : "Add Image"}
                        </button>
                    </div>
                </form>
            )}

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[...Array(8)].map((_, i) => <div key={i} className="aspect-square rounded-xl bg-peach animate-pulse" />)}
                </div>
            ) : images.length === 0 ? (
                <p className="text-sage text-center py-20">No images yet.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {images.map(img => (
                        <div key={img.id} className="relative group rounded-xl overflow-hidden bg-peach aspect-square">
                            <img src={img.image_url} alt={img.caption || "Gallery"} className="w-full h-full object-cover" />
                            {img.caption && (
                                <p className="absolute bottom-0 left-0 right-0 bg-cocoa/50 text-cream text-xs px-2 py-1 truncate">
                                    {img.caption}
                                </p>
                            )}
                            <button
                                onClick={() => handleDelete(img.id)}
                                className="absolute top-2 right-2 bg-cream/80 text-dusty hover:bg-cream p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
