import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export function ProtectedRoute({ children }) {
    const { token, user } = useContext(AuthContext)

    if (!token || !user?.is_admin) {
        return <Navigate to="/login" replace />
    }

    return children
}
