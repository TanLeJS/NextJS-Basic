"use client"

import { convertSlugUrl } from "@/utils/api"
import { Box } from "@mui/material"
import Image from "next/image"
import Link from "next/link"


interface IProps {
    tracks: ITrackTop[]
}

const LikedTracks = (props: IProps) => {

    const { tracks } = props
    return (
        <>
            <Box sx={{ mt: 3, display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {tracks.map(track => {
                    return (
                        <Box key={track._id}>
                            <Image
                                style={{ borderRadius: "3px" }}
                                alt="avatar track"
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track?.imgUrl}`}
                                width={200}
                                height={200}
                            />
                            <div>
                                <Link
                                    style={{ textDecoration: "none", color: "unset" }}
                                    href={`/track/${convertSlugUrl(track.title)}-${track._id}.html?audio=${track.trackUrl}`}
                                >
                                    <span
                                        style={{
                                            width: "200px",
                                            display: "block",
                                            color: "black",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"

                                        }}
                                    >
                                        {track.title}
                                    </span>
                                </Link>
                            </div>

                        </Box>
                    )
                })}

            </Box>

        </>
    )
}

export default LikedTracks