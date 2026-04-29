export async function apiFetch(path, options = {}){
    const token = localStorage.getItem("token");

    const headers ={
        "Content-Type" : "application/json",
        ...(token ? {"Authorization": `Bearer ${token}`}: {})
    }

    const res = await fetch("/api" + path, {
        ...options, headers
    })
    if(!res.ok){
        throw new Error("API failed to generate")
    }
    return res.json()

}

