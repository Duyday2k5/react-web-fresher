import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { NotPermitted } from "./NotPermitted";

const RoleBaseRole = (props) => { //component check co phai admin k
    const isAdminRoute = window.location.startsWith('/admin');
    const user = useSelector(state => state.account.user);
    const userRole = user.role;
    if (isAdminRoute && userRole === 'ADMIN') {
        return (<>{props.children}</>)
    } else {
        return (<NotPermitted />)
    }
}

export const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    return (
        <>
            (isAuthenticated === true) ?
            <>
                <RoleBaseRole>
                    {props.children}
                </RoleBaseRole>
            </>
            :
            <Navigate to='/login' replace />
        </>
    )
}