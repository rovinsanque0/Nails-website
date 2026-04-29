import { useEffect, useState, useRef } from "react"
import toast from "react-hot-toast"
import { getGallery, createGallery, deleteGallery, uploadGalleryImage } from "../../api/gallery"
import { Trash2, Upload } from "lucide-react"

export function ManageGallery() {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [caption, setCaption] = useState("")
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [uploading, setUploading] = useState(false)
    const fileRef = useRef()

    useEffect(() => {
        getGallery()
            .then(setImages)
            .catch(() => toast.error("Failed to load gallery."))
            .finally(() => setLoading(false))
    }, [])

    function handleFileChange(e) {
        const f = e.target.files[0]
        if (!f) return
        setFile(f)
        setPreview(URL.createObjectURL(f))
    }

    async function onSubmit(e) {
        e.preventDefault()
        if (!file) return toast.error("Please select an image.")
        setUploading(true)
        try {
            const { image_url } = await uploadGalleryImage(file)
            const newImage = await createGallery({ image_url, caption })
            setImages(prev => [...prev, newImage])
            toast.success("Image added.")
            setFile(null)
            setPreview(null)
            setCaption("")
            setShowForm(false)
        } catch {
            toast.error("Failed to add image.")
        } finally {
            setUploading(false)
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
                <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-peach p-5 mb-6 shadow-sm flex flex-col gap-4">
                    <div
                        onClick={() => fileRef.current.click()}
                        className="border-2 border-dashed border-peach rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-dusty transition"
                    >
                        {preview ? (
                            <img src={preview} alt="preview" className="h-40 object-cover rounded-lg" />
                        ) : (
                            <>
                                <Upload size={28} className="text-dusty mb-2" />
                                <p className="text-sm text-sage">Click to select an image</p>
                            </>
                        )}
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-cocoa mb-1">Caption (optional)</label>
                        <input
                            value={caption}
                            onChange={e => setCaption(e.target.value)}
                            className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-cream focus:outline-none focus:ring-2 focus:ring-dusty/30"
                            placeholder="French tips with gold foil"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={uploading}
                            className="bg-dusty text-cream text-sm font-medium px-5 py-2 rounded-full hover:bg-cocoa transition disabled:opacity-60"
                        >
                            {uploading ? "Uploading..." : "Add Image"}
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
