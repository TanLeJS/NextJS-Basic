import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LikedTracks from '@/components/like/liked.tracks';
import { sendRequest } from '@/utils/api';
import { Box, Container, Divider } from '@mui/material';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
    title: 'Tan Like Page',
    description: 'Just a description',
}


const LikePage = async () => {
    const session = await getServerSession(authOptions);
    const res = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
        method: "GET",
        queryParams: { current: 1, pageSize: 100 },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        nextOption: {
            next: { tags: ['liked-by-user'] }
        }
    })

    const tracks = res?.data?.result ?? []

    return (
        <Container>
            <Box>
                <div>
                    <h3>Hear the tracks you've liked:</h3>
                </div>
                <Divider variant="middle" />
                <Box>
                    <LikedTracks tracks={tracks} />
                </Box>

            </Box>

        </Container>
    )
}

export default LikePage