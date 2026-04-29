import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { getServices, createServices, deleteService } from "../../api/services"
import { Trash2 } from "lucide-react"

export function ManageServices() {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

    useEffect(() => {
        getServices()
            .then(setServices)
            .catch(() => toast.error("Failed to load services."))
            .finally(() => setLoading(false))
    }, [])

    async function onSubmit(data) {
        try {
            const newService = await createServices({
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                duration: parseInt(data.duration),
            })
            setServices(prev => [...prev, newService])
            toast.success("Service added.")
            reset()
            setShowForm(false)
        } catch {
            toast.error("Failed to create service.")
        }
    }

    async function handleDelete(id) {
        try {
            await deleteService(id)
            setServices(prev => prev.filter(s => s.id !== id))
            toast.success("Service deleted.")
        } catch {
            toast.error("Failed to delete service.")
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-cocoa">Services</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-dusty text-cream text-sm font-medium px-4 py-2 rounded-full hover:bg-cocoa transition"
                >
                    {showForm ? "Cancel" : "+ Add Service"}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-peach p-5 mb-6 shadow-sm grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-cocoa mb-1">Name</label>
                        <input
                            {...register("name", { required: "Required" })}
                            className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-cream focus:outline-none focus:ring-2 focus:ring-dusty/30"
                            placeholder="Gel Manicure"
                        />
                        {errors.name && <p className="text-dusty text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-cocoa mb-1">Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("price", { required: "Required", min: { value: 0, message: "Must be positive" } })}
                            className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-cream focus:outline-none focus:ring-2 focus:ring-dusty/30"
                            placeholder="45.00"
                        />
                        {errors.price && <p className="text-dusty text-xs mt-1">{errors.price.message}</p>}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-cocoa mb-1">Duration (min)</label>
                        <input
                            type="number"
                            {...register("duration", { required: "Required", min: { value: 1, message: "Must be positive" } })}
                            className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-cream focus:outline-none focus:ring-2 focus:ring-dusty/30"
                            placeholder="60"
                        />
                        {errors.duration && <p className="text-dusty text-xs mt-1">{errors.duration.message}</p>}
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-cocoa mb-1">Description (optional)</label>
                        <textarea
                            {...register("description")}
                            rows={2}
                            className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-cream focus:outline-none focus:ring-2 focus:ring-dusty/30 resize-none"
                            placeholder="Short description..."
                        />
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-dusty text-cream text-sm font-medium px-5 py-2 rounded-full hover:bg-cocoa transition disabled:opacity-60"
                        >
                            {isSubmitting ? "Saving..." : "Save Service"}
                        </button>
                    </div>
                </form>
            )}

            {loading ? (
                <div className="space-y-3">
                    {[...Array(4)].map((_, i) => <div key={i} className="h-14 rounded-xl bg-peach animate-pulse" />)}
                </div>
            ) : services.length === 0 ? (
                <p className="text-sage text-center py-20">No services yet.</p>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-peach">
                    <table className="w-full text-sm">
                        <thead className="bg-peach/40 border-b border-peach">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-cocoa/60">Name</th>
                                <th className="text-left px-4 py-3 font-medium text-cocoa/60">Price</th>
                                <th className="text-left px-4 py-3 font-medium text-cocoa/60">Duration</th>
                                <th className="text-left px-4 py-3 font-medium text-cocoa/60">Description</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-peach/40">
                            {services.map(s => (
                                <tr key={s.id} className="hover:bg-cream transition">
                                    <td className="px-4 py-3 font-medium text-cocoa">{s.name}</td>
                                    <td className="px-4 py-3 text-cocoa/70">${s.price}</td>
                                    <td className="px-4 py-3 text-cocoa/70">{s.duration} min</td>
                                    <td className="px-4 py-3 text-sage max-w-xs truncate">{s.description || "—"}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button onClick={() => handleDelete(s.id)} className="text-dusty hover:text-cocoa transition">
                                            <Trash2 size={15} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
