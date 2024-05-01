import { sendRequest } from '@/utils/api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Chip from '@mui/material/Chip';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IProps {
    track: ITrackTop | null
}

const LikesTrack = (props: IProps) => {
    const router = useRouter()
    const { track } = props
    const { data: session } = useSession()

    const fetchData = async () => {
        if (session?.access_token) {
            const res2 = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
                method: "GET",
                queryParams: {
                    current: 1,
                    pageSize: 100,
                    sort: "-createdAt"
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
            })
            if (res2?.data?.result) {
                setTrackLikes(res2.data.result)
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [session])

    const [trackLikes, setTrackLikes] = useState<ITrackLike[] | null>(null)

    const handleLikeTrack = async () => {
        await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
            method: "POST",
            body: {
                track: track?._id,
                quantity: trackLikes?.some(t => t._id === track?._id) ? -1 : 1
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
        })
        fetchData()
        router.refresh()
    };

    return (
        <div style={{
            margin: "20px 10px 0 10px",
            display: 'flex',
            justifyContent: "space-between"
        }}>
            <div className='left'>
                <Chip
                    sx={{ borderRadius: "5px" }}
                    icon={<FavoriteIcon />}
                    label="Like"
                    clickable
                    variant="outlined"
                    onClick={() => handleLikeTrack()}
                    color={trackLikes?.some(t => t._id === track?._id) ? "error" : "default"}
                />
            </div>
            <div style={{ display: "flex", width: "100px", gap: "20px", color: "#999" }}>
                <span style={{ display: "flex", alignItems: "center" }}><PlayArrowIcon sx={{ fontSize: "20px" }} /> {track?.countPlay}</span>
                <span style={{ display: "flex", alignItems: "center" }}><FavoriteIcon sx={{ fontSize: "20px" }} /> {track?.countLike}</span>
            </div>
        </div>
    )
}

export default LikesTrack