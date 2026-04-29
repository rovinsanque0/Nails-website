import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { PageTransition } from "../components/PageTransition"
import { forgotPassword } from "../api/auth"

export function ForgotPassword() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

    async function onSubmit(data) {
        try {
            await forgotPassword(data.email)
            toast.success("If that email exists, a reset link has been sent.")
        } catch {
            toast.error("Something went wrong. Please try again.")
        }
    }

    return (
        <PageTransition className="min-h-screen flex flex-col">
            <Navbar />

            <section className="flex-1 flex items-center justify-center px-4 py-16 bg-peach">
                <div className="w-full max-w-sm bg-cream rounded-2xl border border-peach shadow-sm p-7">
                    <h1 className="text-2xl font-bold text-cocoa mb-1">Forgot Password</h1>
                    <p className="text-sm text-sage mb-6">Enter your email and we'll send you a reset link.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-cocoa mb-1">Email</label>
                            <input
                                {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })}
                                className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dusty/30"
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="text-dusty text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-dusty text-cream font-medium py-2 rounded-full hover:bg-cocoa transition disabled:opacity-60"
                        >
                            {isSubmitting ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </PageTransition>
    )
}
