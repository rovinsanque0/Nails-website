import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getAppointments, updateAppointment } from "../../api/appointments"

const STATUS_COLORS = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
}

export function ManageAppointments() {
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAppointments()
            .then(setAppointments)
            .catch(() => toast.error("Failed to load appointments."))
            .finally(() => setLoading(false))
    }, [])

    async function changeStatus(id, status) {
        try {
            await updateAppointment(id, { status })
            setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
            toast.success("Status updated.")
        } catch {
            toast.error("Failed to update status.")
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-cocoa mb-6">Appointments</h1>

            {loading ? (
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => <div key={i} className="h-16 rounded-xl bg-peach animate-pulse" />)}
                </div>
            ) : appointments.length === 0 ? (
                <p className="text-sage text-center py-20">No appointments yet.</p>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-peach">
                    <table className="w-full text-sm">
                        <thead className="bg-peach/40 border-b border-peach">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-cocoa/60">ID</th>
                                <th className="text-left px-4 py-3 font-medium text-cocoa/60">Service</th>
                                <th className="text-left px-4 py-3 font-medium text-cocoa/60">Date</th>
                                <th className="text-left px-4 py-3 font-medium text-cocoa/60">Notes</th>
                                <th className="text-left px-4 py-3 font-medium text-cocoa/60">Status</th>
                                <th className="text-left px-4 py-3 font-medium text-cocoa/60">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-peach/40">
                            {appointments.map(a => (
                                <tr key={a.id} className="hover:bg-cream transition">
                                    <td className="px-4 py-3 text-sage">#{a.id}</td>
                                    <td className="px-4 py-3 text-cocoa">{a.service_id}</td>
                                    <td className="px-4 py-3 text-cocoa/70">
                                        {a.date ? new Date(a.date).toLocaleString() : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-sage max-w-xs truncate">{a.notes || "—"}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[a.status] || "bg-peach text-dusty"}`}>
                                            {a.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            {a.status !== "confirmed" && (
                                                <button onClick={() => changeStatus(a.id, "confirmed")} className="text-xs text-green-600 hover:underline">
                                                    Confirm
                                                </button>
                                            )}
                                            {a.status !== "cancelled" && (
                                                <button onClick={() => changeStatus(a.id, "cancelled")} className="text-xs text-red-500 hover:underline">
                                                    Cancel
                                                </button>
                                            )}
                                            {a.status !== "pending" && (
                                                <button onClick={() => changeStatus(a.id, "pending")} className="text-xs text-yellow-600 hover:underline">
                                                    Pending
                                                </button>
                                            )}
                                        </div>
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
