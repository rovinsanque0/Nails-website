import { apiFetch } from "./client"

export function login(data) {
    return apiFetch("/user/login", { method: "POST", body: JSON.stringify(data) })
}

export function register(data) {
    return apiFetch("/user/register", { method: "POST", body: JSON.stringify(data) })
}
