import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { NotPermitted } from "../ProtectedRoute/NotPermitted";

const RoleBaseRole = (props) => { //component check co phai admin k
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const user = useSelector(state => state.account.user);
    const userRole = user.role;
    if (isAdminRoute && userRole === 'admin') {
        return (<>{props.children}</>)
    } else {
        return (<NotPermitted />)
    }
}

export const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />
    }
    return (
        <RoleBaseRole>
            {props.children}
        </RoleBaseRole>
    )
}