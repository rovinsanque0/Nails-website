import { apiFetch } from "./client"

const BASE_URL = import.meta.env.VITE_API_URL || ""

export function getGallery() {
    return apiFetch("/gallery")
}

export function createGallery(data) {
    return apiFetch("/gallery", { method: "POST", body: JSON.stringify(data) })
}

export function deleteGallery(id) {
    return apiFetch(`/gallery/${id}`, { method: "DELETE" })
}

export async function uploadGalleryImage(file) {
    const token = localStorage.getItem("token")
    const form = new FormData()
    form.append("file", file)
    const res = await fetch(BASE_URL + "/gallery/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form
    })
    if (!res.ok) throw new Error("Upload failed")
    return res.json()
}
