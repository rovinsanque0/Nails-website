import { apiFetch } from "./client"

export function getServices() {
    return apiFetch("/services")
}

export function createServices(data) {
    return apiFetch("/services", { method: "POST", body: JSON.stringify(data) })
}

export function deleteService(id) {
    return apiFetch(`/services/${id}`, { method: "DELETE" })
}
