import ProfileTrack from "@/components/header/profile.tracks"
import { sendRequest } from "@/utils/api"
import { Container, Grid } from "@mui/material"


const ProfileUserPage = async ({ params }: { params: { slug: string } }) => {
    const slug = params.slug
    const data = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/users?current=1&pageSize=10`,
        method: "POST",
        body: { id: slug }
    })
    const d = data?.data?.result ?? []
    return (
        <Container sx={{ my: 5 }}>
            <Grid container spacing={5} >
                {d.map((item: any, index: number) => {
                    return (
                        <Grid item xs={12} md={6} key={index}>
                            <ProfileTrack data={item} />
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default ProfileUserPage 