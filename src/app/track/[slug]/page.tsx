"use client"
import { useSearchParams } from 'next/navigation'
const DetailTrackPage = (props: any) => {
    const searchParams = useSearchParams()

    const search = searchParams.get('audio')
    console.log(">>> check search", search)
    return (
        <div>
            DetailTrackPage
        </div>
    )
}

export default DetailTrackPage