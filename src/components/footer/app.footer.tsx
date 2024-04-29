'use client'
import { useTrackContext } from '@/lib/track.wrapper';
import { useHasMounted } from '@/utils/customHook';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext
    const playerRef = useRef(null)
    const hasMounted = useHasMounted();


    useEffect(() => {
        if (currentTrack?.isPlaying === false) {
            //@ts-ignore
            playerRef?.current?.audio?.current?.pause()
        }
        if (currentTrack?.isPlaying === true) {
            //@ts-ignore
            playerRef?.current?.audio?.current?.play()
        }
    }, [currentTrack])


    if (!hasMounted) return (<></>)//fragment
    return (
        <>
            {currentTrack._id &&
                <div style={{ marginTop: 50 }}>
                    <AppBar position="fixed"
                        sx={{
                            top: 'auto', bottom: 0,
                            background: "#f2f2f2"
                        }}
                    >
                        <Container
                            disableGutters
                            sx={{
                                display: "flex", gap: 10,
                                ".rhap_main": {
                                    gap: "30px"
                                }

                            }}>
                            <AudioPlayer
                                ref={playerRef}
                                layout='horizontal-reverse'
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                                volume={0.5}
                                style={{
                                    boxShadow: "unset",
                                    background: "#f2f2f2"
                                }}
                                onPlay={() => {
                                    setCurrentTrack({ ...currentTrack, isPlaying: true })
                                }}
                                onPause={() => {
                                    setCurrentTrack({ ...currentTrack, isPlaying: false })
                                }}
                            />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                justifyContent: "center",
                                width: "220px"
                            }}>
                                <div
                                    title={currentTrack.description}
                                    style={{
                                        color: "#ccc",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        width: "100%"
                                    }}
                                >
                                    {currentTrack.description}
                                </div>
                                <div
                                    title={currentTrack.title}
                                    style={{
                                        color: "black",
                                        textOverflow: "ellipsis",
                                        width: "100%",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                    }}
                                >{currentTrack.title}
                                </div>
                            </div>
                        </Container>
                    </AppBar>
                </div>
            }
        </>
    )
}

export default AppFooter;