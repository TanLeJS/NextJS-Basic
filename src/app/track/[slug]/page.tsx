"use client"
import WaveTrack from '@/components/track/wave.track'
import { useSearchParams } from 'next/navigation'
const DetailTrackPage = (props: any) => {
    const searchParams = useSearchParams()

    const search = searchParams.get('audio')
    console.log(">>> check search", search)
    return (
        <div>
            DetailTrackPage
            <div>
                <WaveTrack />
            </div>
        </div>
    )
}

export default DetailTrackPage