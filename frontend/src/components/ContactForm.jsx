import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { createContact } from "../api/contact"

export function ContactForm() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

    async function onSubmit(data) {
        try {
            await createContact(data)
            toast.success("Message sent! We'll get back to you soon.")
            reset()
        } catch {
            toast.error("Failed to send message. Please try again.")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium text-cocoa mb-1">Name</label>
                <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-cream focus:outline-none focus:ring-2 focus:ring-dusty/30"
                    placeholder="Your name"
                />
                {errors.name && <p className="text-dusty text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-cocoa mb-1">Email</label>
                <input
                    {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })}
                    className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-cream focus:outline-none focus:ring-2 focus:ring-dusty/30"
                    placeholder="you@example.com"
                />
                {errors.email && <p className="text-dusty text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-cocoa mb-1">Message</label>
                <textarea
                    {...register("message", { required: "Message is required" })}
                    rows={4}
                    className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-cream focus:outline-none focus:ring-2 focus:ring-dusty/30 resize-none"
                    placeholder="How can we help?"
                />
                {errors.message && <p className="text-dusty text-xs mt-1">{errors.message.message}</p>}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-dusty text-cream font-medium py-2 px-6 rounded-full hover:bg-cocoa transition disabled:opacity-60"
            >
                {isSubmitting ? "Sending..." : "Send Message"}
            </button>
        </form>
    )
}
