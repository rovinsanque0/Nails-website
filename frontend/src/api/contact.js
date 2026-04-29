import { apiFetch } from "./client"

export function getContacts() {
    return apiFetch("/contact")
}

export function createContact(data) {
    return apiFetch("/contact", { method: "POST", body: JSON.stringify(data) })
}

export function markContactRead(id) {
    return apiFetch(`/contact/${id}`, { method: "PATCH" })
}
