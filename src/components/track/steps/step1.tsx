"use client"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { useCallback } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import "./theme.css";


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function InputFileUpload() {
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onClick={(event) => event.preventDefault()}
        >
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}

interface IProps {
    setValue: (v: number) => void
    setTrackUpload: any,
    trackUpload: any
}

const Step1 = (props: IProps) => {
    const { trackUpload } = props
    const { data: session } = useSession()
    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        props.setValue(1)
        // Do something with the files
        if (acceptedFiles && acceptedFiles[0]) {
            const audio = acceptedFiles[0]
            const formData = new FormData()
            formData.append("fileUpload", audio)
            try {
                const res = await axios.post("http://localhost:8000/api/v1/files/upload", formData,
                    {
                        headers: {
                            Authorization: `Bearer ${session?.access_token}`,
                            "target_type": "tracks",
                            delay: 5000
                        },
                        onUploadProgress: progressEvent => {
                            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total!);
                            props.setTrackUpload({
                                ...trackUpload,
                                fileName: acceptedFiles[0].name,
                                percent: percentCompleted
                            })
                        }
                    })
                props.setTrackUpload({
                    ...trackUpload,
                    uploadedTrackName: res.data.data.fileName
                })
            } catch (error) {
                //@ts-ignore
                alert(error?.response?.data)
            }


        }


    }, [session])
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop,
        accept: {
            "audio": [".mp3", ".m4a"]
        }
    })


    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <InputFileUpload />
                <p>Drag or click to upload file</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}

export default Step1