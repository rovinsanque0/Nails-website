import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"
import toast from "react-hot-toast"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { PageTransition } from "../components/PageTransition"
import { resetPassword } from "../api/auth"

export function ResetPassword() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()

    async function onSubmit(data) {
        try {
            await resetPassword(token, data.password)
            toast.success("Password updated. Please sign in.")
            navigate("/login")
        } catch {
            toast.error("Reset link is invalid or expired.")
        }
    }

    return (
        <PageTransition className="min-h-screen flex flex-col">
            <Navbar />

            <section className="flex-1 flex items-center justify-center px-4 py-16 bg-peach">
                <div className="w-full max-w-sm bg-cream rounded-2xl border border-peach shadow-sm p-7">
                    <h1 className="text-2xl font-bold text-cocoa mb-1">Reset Password</h1>
                    <p className="text-sm text-sage mb-6">Enter your new password below.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-cocoa mb-1">New Password</label>
                            <input
                                type="password"
                                {...register("password", { required: "Required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                                className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dusty/30"
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="text-dusty text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-cocoa mb-1">Confirm Password</label>
                            <input
                                type="password"
                                {...register("confirm", { required: "Required", validate: v => v === watch("password") || "Passwords do not match" })}
                                className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dusty/30"
                                placeholder="••••••••"
                            />
                            {errors.confirm && <p className="text-dusty text-xs mt-1">{errors.confirm.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-dusty text-cream font-medium py-2 rounded-full hover:bg-cocoa transition disabled:opacity-60"
                        >
                            {isSubmitting ? "Updating..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </PageTransition>
    )
}
