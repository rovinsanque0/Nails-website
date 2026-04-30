import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"
import toast from "react-hot-toast"
import { Eye, EyeOff } from "lucide-react"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { PageTransition } from "../components/PageTransition"
import { resetPassword } from "../api/auth"

export function ResetPassword() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
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
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: "Required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                                    autoComplete="new-password"
                                    className="w-full border border-peach rounded-lg px-3 py-2 pr-9 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dusty/30"
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sage hover:text-cocoa transition">
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-dusty text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-cocoa mb-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    {...register("confirm", { required: "Required", validate: v => v === watch("password") || "Passwords do not match" })}
                                    autoComplete="new-password"
                                    className="w-full border border-peach rounded-lg px-3 py-2 pr-9 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dusty/30"
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sage hover:text-cocoa transition">
                                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
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
