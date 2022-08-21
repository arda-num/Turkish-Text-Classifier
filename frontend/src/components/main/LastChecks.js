import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./last-checks.css"




function modelSelector(props) {
    console.log("alo" + props.model)
    
}


export default function MultilineTextFields(props) {
//   const [value, setValue] = React.useState('Controlled');




    const control = {
        value: props.model,
        exclusive: true,
        };

  return (
    <div>
        
        <h5 className='submitted-header'>Check your values before evaluating :)</h5>
        <div className='results'>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                    // margin:"auto"
                }}
                noValidate
                autoComplete="off"
                >
                <div className='text-input'>
                <TextField
                    disabled="true"
                    id="filled-textarea"
                    label="Submitted Text:"
                    //   placeholder="Placeholder"
                    multiline
                    variant="filled"
                    inputProps={{
                        style: { height:"150px"},
                    }}
                    value={props.text}
                    // style={{borderColor:"green", padding:"5px", borderWidth:"5px"}}
                    />
                    
                    
                </div>
            
            </Box>
                <Box
                sx={{

                flexDirection: 'column',
                // alignItems: 'center',
                // margin: "20px",
                // TODO Replace with Stack
                '& > :not(style) + :not(style)': { mt: 2 },
                }}
                >

                <ToggleButtonGroup size="large" {...control}>
                {
                (() => {
                    switch (props.model) {
                        case "left":
                        return (
                            <div className='selected-model'>
                                <ToggleButton value="left" key="left">
                                <div className='last-model'>
                                    <Typography><p className='selected-model-text'>Selected Model is <br/>BertTurk</p></Typography>
                                </div>
                                </ToggleButton>
                            </div>
                        )
                        case "center":
                        return (
                            <div className='selected-model'>
                                <ToggleButton value="left" key="left">
                                <div className='last-model'>
                                    <Typography><p className='selected-model-text'>Selected Model is <br/>DistilBert</p></Typography>
                                </div>
                                </ToggleButton>
                            </div>
                        )
                        case "right":
                        return (
                            <div className='selected-model'>
                                <ToggleButton value="left" key="left">
                                <div className='last-model'>
                                    <Typography><p className='selected-model-text'>Selected Model is <br/>Electra</p></Typography>
                                </div>
                                </ToggleButton>
                            </div>
                        )
                        case "justify":
                            return (
                                <div className='selected-model'>
                                <ToggleButton value="left" key="left">
                                <div className='last-model'>
                                    <Typography><p className='selected-model-text'>Selected Model is <br/>ConvBert</p></Typography>
                                </div>
                                </ToggleButton>
                            </div>
                            )
                        default:
                            return (
                                <div className='no-selected-model'>
                                <ToggleButton value="left" key="left">
                                <div className='last-model'>
                                    <Typography><p className='no-selected-model-text' >No Selected Model</p></Typography>
                                </div>
                                </ToggleButton>
                            </div>
                            )
                    }

                })()
                }
                </ToggleButtonGroup>
            </Box>
        </div>
    </div>
  );
}

