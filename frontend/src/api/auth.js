import { apiFetch } from "./client"

export function login(data) {
    return apiFetch("/user/login", { method: "POST", body: JSON.stringify(data) })
}

export function register(data) {
    return apiFetch("/user/register", { method: "POST", body: JSON.stringify(data) })
}

export function forgotPassword(email) {
    return apiFetch("/user/forgot-password", { method: "POST", body: JSON.stringify({ email }) })
}

export function resetPassword(token, new_password) {
    return apiFetch("/user/reset-password", { method: "POST", body: JSON.stringify({ token, new_password }) })
}
