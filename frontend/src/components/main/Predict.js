 import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import "./predict.css"






export default function Predict(props) {

    


    return (    
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.open}
                onClick={props.handleClose}>
                <div className='backdrop-xxx'>
                    <CircularProgress style={{marginLeft:"5px"}} color="inherit" />
                    <Typography styl>  Calculating...</Typography>
                </div>
                
            </Backdrop>
            <div className='predict-page'>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re ready to go!
                </Typography>
                <Box sx={{ pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                    <Button style={{ border: '2px solid' }} onClick={props.handleToggle}>Predict</Button>
                </Box>
            </div>
            
        </div>
        
    )
}