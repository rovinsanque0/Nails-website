import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"
import { Eye, EyeOff } from "lucide-react"
import { AuthContext } from "../context/AuthContext"
import { login, register } from "../api/auth"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { PageTransition } from "../components/PageTransition"

export function Login() {
    const { login: setAuth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [mode, setMode] = useState("login")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { register: reg, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm()

    async function onSubmit(data) {
        try {
            if (mode === "login") {
                const res = await login({ email: data.email, password: data.password })
                const user = { email: data.email, is_admin: res.is_admin ?? false }
                setAuth(res.access_token, user)
                toast.success("Welcome back!")
                navigate("/")
            } else {
                await register({ name: data.name, email: data.email, password: data.password, phone: data.phone || "" })
                toast.success("Account created! Please log in.")
                setMode("login")
                reset()
            }
        } catch {
            toast.error(mode === "login" ? "Invalid email or password." : "Registration failed. Email may already exist.")
        }
    }

    return (
        <PageTransition className="min-h-screen flex flex-col">
            <Navbar />

            <section className="flex-1 flex items-center justify-center px-4 py-16 bg-peach">
                <div className="w-full max-w-sm bg-cream rounded-2xl border border-peach shadow-sm p-7">
                    <h1 className="text-2xl font-bold text-cocoa mb-1">
                        {mode === "login" ? "Welcome back" : "Create account"}
                    </h1>
                    <p className="text-sm text-sage mb-6">
                        {mode === "login" ? "Sign in to book appointments." : "Join Luxe Nails today."}
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        {mode === "register" && (
                            <div>
                                <label className="block text-sm font-medium text-cocoa mb-1">Full Name</label>
                                <input
                                    {...reg("name", { required: "Name is required" })}
                                    autoComplete="name"
                                    className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dusty/30"
                                    placeholder="Jane Doe"
                                />
                                {errors.name && <p className="text-dusty text-xs mt-1">{errors.name.message}</p>}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-cocoa mb-1">Email</label>
                            <input
                                {...reg("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })}
                                autoComplete="email"
                                className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dusty/30"
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="text-dusty text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {mode === "register" && (
                            <div>
                                <label className="block text-sm font-medium text-cocoa mb-1">Confirm Email</label>
                                <input
                                    {...reg("confirmEmail", { required: "Required", validate: v => v === watch("email") || "Emails do not match" })}
                                    autoComplete="email"
                                    className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dusty/30"
                                    placeholder="you@example.com"
                                />
                                {errors.confirmEmail && <p className="text-dusty text-xs mt-1">{errors.confirmEmail.message}</p>}
                            </div>
                        )}

                        {mode === "register" && (
                            <div>
                                <label className="block text-sm font-medium text-cocoa mb-1">Phone (optional)</label>
                                <input
                                    {...reg("phone")}
                                    autoComplete="tel"
                                    className="w-full border border-peach rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dusty/30"
                                    placeholder="(555) 000-0000"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-cocoa mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...reg("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                                    className="w-full border border-peach rounded-lg px-3 py-2 pr-9 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dusty/30"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sage hover:text-cocoa transition"
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-dusty text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        {mode === "register" && (
                            <div>
                                <label className="block text-sm font-medium text-cocoa mb-1">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        {...reg("confirmPassword", { required: "Required", validate: v => v === watch("password") || "Passwords do not match" })}
                                        autoComplete="new-password"
                                        className="w-full border border-peach rounded-lg px-3 py-2 pr-9 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dusty/30"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sage hover:text-cocoa transition"
                                    >
                                        {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-dusty text-xs mt-1">{errors.confirmPassword.message}</p>}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-dusty text-cream font-medium py-2 rounded-full hover:bg-cocoa transition disabled:opacity-60"
                        >
                            {isSubmitting ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
                        </button>
                    </form>

                    {mode === "login" && (
                        <p className="text-center text-sm text-sage mt-3">
                            <Link to="/forgot-password" className="text-dusty hover:underline">Forgot your password?</Link>
                        </p>
                    )}

                    <p className="text-center text-sm text-sage mt-5">
                        {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => { setMode(mode === "login" ? "register" : "login"); reset() }}
                            className="text-dusty font-medium hover:underline"
                        >
                            {mode === "login" ? "Register" : "Sign in"}
                        </button>
                    </p>
                </div>
            </section>

            <Footer />
        </PageTransition>
    )
}
