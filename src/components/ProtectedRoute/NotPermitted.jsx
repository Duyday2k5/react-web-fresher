import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom"

export const NotPermitted = () => {
    const navigate = useNavigate();
    return (
        <Result
            status="403"
            tile="403"
            subTitle="Sorry you are not authorized to access this page!"
            extra={<Button type="primary"
                onClick={() => navigate("/")}>
                Back home</Button>}
        />
    )
}