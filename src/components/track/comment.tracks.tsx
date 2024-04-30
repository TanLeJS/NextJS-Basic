import { fetchDefaultImages, sendRequest } from "@/utils/api";
import { useHasMounted } from "@/utils/customHook";
import { Box, TextField } from "@mui/material";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WaveSurfer from "wavesurfer.js";
dayjs.extend(relativeTime)

interface IProps {
    track: ITrackTop | null
    comments: ITrackComment[]
    wavesurfer: WaveSurfer | null;
}

const CommentTrack = (props: IProps) => {
    const router = useRouter()
    const hasMounted = useHasMounted();
    const { track, comments, wavesurfer } = props
    const { data: session } = useSession()
    const [yourComment, setYourComment] = useState("")

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    const handleSubmit = async () => {
        const res = await sendRequest<IBackendRes<ITrackComment>>({
            url: "http://localhost:8000/api/v1/comments",
            method: "POST",
            body: {
                content: yourComment,
                moment: Math.round(wavesurfer?.getCurrentTime() ?? 0),
                track: track?._id
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            }
        })
        if (res.data) {
            setYourComment("");
            router.refresh()
        }
    }


    const handleJumpTrack = (moment: number) => {
        if (wavesurfer) {
            wavesurfer.seekTo(moment / wavesurfer.getDuration())
            wavesurfer.play()
        }
    }
    return (
        <div>
            <div style={{ marginTop: "50px", marginBottom: "25px" }}>
                {session?.user &&
                    <TextField
                        id="standard-basic"
                        label="Comment"
                        variant="standard"
                        fullWidth
                        value={yourComment}
                        onChange={(e) => setYourComment(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit()
                            }
                        }}

                    />
                }
            </div>
            <div style={{
                display: "flex", gap: "10px"
            }}>
                <div className="left" style={{ width: "190px" }}>
                    <img
                        width={150}
                        height={150}
                        src={fetchDefaultImages(track?.uploader?.type!)}
                    />
                    <div>
                        {track?.uploader?.email}
                    </div>
                </div>
                <div className="right" style={{ width: "calc(100% - 200px)" }}>
                    {comments?.map(comment => {
                        return (
                            <Box key={comment._id} sx={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
                                <Box sx={{ display: "flex", gap: "10px", marginBottom: "25px", alignItems: "flex-end" }}>
                                    <img
                                        style={{
                                            height: 40,
                                            width: 40
                                        }}
                                        src={fetchDefaultImages(comment.user.type)}
                                    />
                                    <div>
                                        <div style={{ fontSize: "13px" }}>{comment?.user.name ?? comment.user.name} at
                                            <span style={{ cursor: "pointer" }}
                                                onClick={() => handleJumpTrack(comment.moment)}
                                            >
                                                &nbsp; {formatTime(comment.moment)}
                                            </span>

                                        </div>
                                        <div>
                                            {comment.content}
                                        </div>
                                    </div>
                                </Box>
                                <div style={{ fontSize: "12px", color: "#999" }}>
                                    {/* @ts-ignore */}
                                    {hasMounted && dayjs(comment?.createdAt).fromNow()}

                                </div>
                            </Box>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CommentTrack