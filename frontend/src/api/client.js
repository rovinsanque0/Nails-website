const BASE_URL = import.meta.env.VITE_API_URL || ""

export async function apiFetch(path, options = {}) {
    const token = localStorage.getItem("token")

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    }

    const res = await fetch(BASE_URL + path, {
        ...options, headers
    })
    if (!res.ok) {
        throw new Error("API request failed")
    }
    return res.json()
}
