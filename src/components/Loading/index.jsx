import { GridLoader } from "react-spinners";

export default function Loading() {
    const style = { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } //center
    return (
        <div style={style}>
            <GridLoader color="#0c4c7d" />
            <h3 style={{ color: '#0c4c7d', }}>Loading...</h3>
        </div>
    )
}