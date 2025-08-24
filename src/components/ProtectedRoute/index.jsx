import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    return (
        <>
            (isAuthenticated === true) ? <>{props.children}</> : <Navigate to='/login' replace />
        </>
    )
}