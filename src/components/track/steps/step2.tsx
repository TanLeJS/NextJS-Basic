"use client"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
interface IProps {
    trackUpload: {
        fileName: string,
        percent: number
    }
}
function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
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
        >
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}

function LinearWithValueLabel(props: IProps) {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={props.trackUpload.percent} />
        </Box>
    );
}



const Step2 = (props: IProps) => {
    const { trackUpload } = props

    const category = [
        {
            value: "CHILL",
            label: "CHILL"
        },
        {
            value: "WORKOUT",
            label: "WORKOUT"
        },
        {
            value: "PARTY",
            label: "PARTY"
        }
    ]
    return (
        <div>
            <div>
                <div>
                    {props.trackUpload.fileName}
                </div>
                <LinearWithValueLabel
                    trackUpload={trackUpload} />
            </div>
            <Grid container spacing={2} mt={5}>
                <Grid item xs={6} md={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <div style={{ height: 250, width: 250, background: "#ccc" }}>
                        <div>

                        </div>

                    </div>
                    <div>
                        <InputFileUpload />
                    </div>
                </Grid>
                <Grid item xs={6} md={8}>
                    <TextField id="standard-basic" label="Title" variant="standard" fullWidth />
                    <TextField id="standard-basic" label="Description" variant="standard" fullWidth />
                    <TextField
                        id="standard-select-currency-native"
                        select
                        label="Category"
                        variant="standard"
                        fullWidth
                    >
                        {category.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <Button
                        variant='outlined'
                        sx={{
                            mt: 5
                        }}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Step2