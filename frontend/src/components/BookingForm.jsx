import { useEffect, useState, useContext } from "react"
import { useForm } from "react-hook-form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import toast from "react-hot-toast"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getServices } from "../api/services"
import { createAppointment } from "../api/appointments"
import { AuthContext } from "../context/AuthContext"

export function BookingForm() {
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [services, setServices] = useState([])
    const [appointmentDate, setAppointmentDate] = useState(null)
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm()

    useEffect(() => {
        getServices().then(setServices).catch(() => toast.error("Could not load services."))
    }, [])

    useEffect(() => {
        const preselected = searchParams.get("service")
        if (preselected) setValue("service_id", preselected)
    }, [searchParams, setValue])

    async function onSubmit(data) {
        if (!token) {
            toast.error("Please log in to book an appointment.")
            navigate("/login")
            return
        }
        if (!appointmentDate) {
            toast.error("Please select a date and time.")
            return
        }
        try {
            await createAppointment({
                service_id: parseInt(data.service_id),
                appointment_date: appointmentDate.toISOString(),
                notes: data.notes || "",
            })
            toast.success("Appointment booked! We'll confirm shortly.")
            navigate("/")
        } catch {
            toast.error("Booking failed. Please try again.")
        }
    }

    const minDate = new Date()
    minDate.setDate(minDate.getDate() + 1)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
                <label className="block text-sm font-medium text-cocoa mb-1">Service</label>
                <select
                    {...register("service_id", { required: "Please select a service" })}
                    className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-cream focus:outline-none focus:ring-2 focus:ring-dusty/30"
                >
                    <option value="">Select a service...</option>
                    {services.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.name} — ${s.price} ({s.duration} min)
                        </option>
                    ))}
                </select>
                {errors.service_id && <p className="text-dusty text-xs mt-1">{errors.service_id.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-cocoa mb-1">Date & Time</label>
                <DatePicker
                    selected={appointmentDate}
                    onChange={date => setAppointmentDate(date)}
                    showTimeSelect
                    minDate={minDate}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Pick a date and time"
                    className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-cream focus:outline-none focus:ring-2 focus:ring-dusty/30"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-cocoa mb-1">Notes (optional)</label>
                <textarea
                    {...register("notes")}
                    rows={3}
                    className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-cream focus:outline-none focus:ring-2 focus:ring-dusty/30 resize-none"
                    placeholder="Any special requests or notes..."
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-dusty text-cream font-medium py-2 px-6 rounded-full hover:bg-cocoa transition disabled:opacity-60"
            >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
            </button>
        </form>
    )
}
