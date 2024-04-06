"use client"
import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
const WaveTrack = () => {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(">>> check container ref", containerRef)

        if (containerRef.current) {
            const wavesurfer = WaveSurfer.create({
                container: containerRef.current,
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
                url: 'http://localhost:8000/tracks/hoidanit.mp3', //remote url: get from backend
            })
        }

    }, [])
    return (
        <div ref={containerRef}>
            Wave Track
        </div>
    )
}
export default WaveTrack