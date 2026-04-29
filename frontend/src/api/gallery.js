import { apiFetch } from "./client"

export function getGallery() {
    return apiFetch("/gallery")
}

export function createGallery(data) {
    return apiFetch("/gallery", { method: "POST", body: JSON.stringify(data) })
}

export function deleteGallery(id) {
    return apiFetch(`/gallery/${id}`, { method: "DELETE" })
}
