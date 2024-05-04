"use client"

import { sendRequest } from '@/utils/api';
import { useToast } from '@/utils/toast';
import AddIcon from '@mui/icons-material/Add';
import { Box, FormControlLabel, FormGroup, Switch } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';



export default function NewPlaylist() {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("")
    const [isPublic, setIsPublic] = React.useState(true);

    const toast = useToast();
    const router = useRouter();
    const { data: session } = useSession();

    const handleClose = (event: any, reason: any) => {
        if (reason && reason == "backdropClick")
            return;
        setOpen(false);
    };

    const handleSubmit = async () => {
        if (!title) {
            toast.error("Title is empty")
            return;
        }

        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists/empty`,
            method: "POST",
            body: { title, isPublic },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            }
        })

        if (res.data) {
            toast.success("Create a playlist successfully")
            setOpen(false)
            setTitle("")
            setIsPublic(true)
            await sendRequest<IBackendRes<any>>({
                url: `/api/revalidate`,
                method: "POST",
                queryParams: {
                    tag: "playlist-by-user",
                    secret: "justArandomString"
                }
            })
            router.refresh();
        }
        else {
            toast.error(res.message)
        }
    }

    return (
        <div>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                Playlist
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth>
                <DialogTitle>Add new Playlist</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", gap: "30px", flexDirection: "column", width: "100%" }}>
                        <TextField
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            label="Playlist Name"
                            variant="standard"
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isPublic}
                                        onChange={(event) => setIsPublic(event.target.checked)}
                                        inputProps={{ 'aria-label': 'controlled' }} />
                                }
                                label={isPublic === true ? "Public" : "Private"}
                            />
                        </FormGroup>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button onClick={() => handleSubmit()}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
