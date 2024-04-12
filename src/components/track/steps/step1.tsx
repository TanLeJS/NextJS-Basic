"use client"
import { sendRequestFile } from '@/utils/api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
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
const Step1 = () => {
    const { data: session } = useSession()
    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        // Do something with the files
        if (acceptedFiles && acceptedFiles[0]) {
            const audio = acceptedFiles[0]
            const formData = new FormData()
            formData.append("fileUpload", audio)
            const chills = await sendRequestFile<IBackendRes<ITrackTop[]>>({
                url: "http://localhost:8000/api/v1/files/upload",
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${session?.access_token}`,
                    "target_type": "tracks"
                }
            })
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