import WaveTrack from '@/components/track/wave.track'
import { sendRequest } from '@/utils/api'
import { Container } from '@mui/material'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const temp = params?.slug?.split('.html') ?? [];
    const temp1 = temp[0]?.split('-') ?? [];
    const id = temp1[temp1.length - 1]

    // fetch data
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${id}`,
        method: "GET",
    })

    // // optionally access and extend (rather than replace) parent metadata

    return {
        title: res.data?.title,
        description: res.data?.description,
        openGraph: {
            title: 'Hỏi Dân IT',
            description: 'Beyond Your Coding Skills',
            type: 'website',
            images: [`https://raw.githubusercontent.com/hoidanit/images-hosting/master/eric.png`],
        },
    }
}

const DetailTrackPage = async (props: any) => {


    const { params } = props

    const temp = params?.slug?.split('.html') ?? [];
    const temp1 = temp[0]?.split('-') ?? [];
    const id = temp1[temp1.length - 1]


    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${id}`,
        method: "GET",
        nextOption: { cache: "no-store" }
    })

    const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
        url: `http://localhost:8000/api/v1/tracks/comments`,
        method: "POST",
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: id,
            sort: "-createdAt"
        }
    })

    if (!res?.data) {
        notFound()
    }

    return (
        <Container>
            <div>
                <WaveTrack
                    track={res?.data ?? null}
                    comments={res1?.data?.result ?? []}
                />
            </div>
        </Container>

    )
}

export default DetailTrackPage