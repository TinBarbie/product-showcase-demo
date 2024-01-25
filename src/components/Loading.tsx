import { CircularProgress } from "@mui/material"

const Loading = () => {
    return (
        <div className="w-full flex justify-center">
            <CircularProgress className="w-10 h-10" />
        </div>
    )
}

export default Loading