import { apiFetch } from "./client"

export function getAppointments() {
    return apiFetch("/appointment")
}

export function getUserAppointment(userId) {
    return apiFetch(`/appointment/${userId}`)
}

export function createAppointment(data) {
    return apiFetch("/appointment", { method: "POST", body: JSON.stringify(data) })
}

export function updateAppointment(id, data) {
    return apiFetch(`/appointment/${id}`, { method: "PATCH", body: JSON.stringify(data) })
}

export function getBookingStatus() {
    return apiFetch("/settings/booking")
}

export function toggleBooking() {
    return apiFetch("/settings/booking", { method: "PATCH" })
}
