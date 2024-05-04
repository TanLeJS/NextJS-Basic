import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AddPlaylistTrack from "@/components/playlist/add.playlist.track"
import CurrentTrack from "@/components/playlist/current.track"
import NewPlaylist from "@/components/playlist/new.playlist"
import { sendRequest } from "@/utils/api"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Container } from "@mui/material"
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Divider from "@mui/material/Divider"
import Typography from '@mui/material/Typography'
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Fragment } from 'react'

export const metadata: Metadata = {
    title: 'Playlist bạn đã tạo',
    description: 'miêu tả thôi mà',
}

const PlaylistPage = async () => {
    const session = await getServerSession(authOptions);
    const res = await sendRequest<IBackendRes<IModelPaginate<IPlaylist>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists/by-user`,
        method: "POST",
        queryParams: { current: 1, pageSize: 100 },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        nextOption: {
            next: { tags: ['playlist-by-user'] }
        }
    })

    const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks`,
        method: "GET",
        queryParams: { current: 1, pageSize: 100 },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        }
    })

    const playlists = res?.data?.result ?? [];
    const tracks = res1?.data?.result ?? [];

    return (
        <Container sx={{ mt: 3, p: 3, background: "#f3f6f9", borderRadius: "3px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                <h3>Playlist</h3>
                <div style={{ display: "flex", gap: "20px" }}>
                    <NewPlaylist />
                    <AddPlaylistTrack
                        //@ts-ignore
                        playlists={playlists}
                        tracks={tracks}
                    />
                </div>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ mt: 3 }}>
                {playlists?.map(playlist => {
                    return (
                        <Accordion key={playlist._id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography sx={{ fontSize: "20px", color: "#ccc" }}>{playlist.title}</Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                                {playlist?.tracks?.map((track, index: number) => {
                                    return (
                                        <Fragment key={track._id}>
                                            {index === 0 && <Divider />}
                                            <CurrentTrack track={track} />
                                            <Divider />
                                        </Fragment>
                                    )
                                })}
                                {playlist?.tracks?.length === 0 && <span>No data.</span>}
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </Box>
        </Container>
    )

}

export default PlaylistPage
