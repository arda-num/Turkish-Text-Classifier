import * as React from 'react';
import "./greeting.css"
import InventoryIcon from "@mui/icons-material/Flag"
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';



export default function Greeting(props) {
    
    return (
       <div className='page'>
            <h1 className='greeting-text'>Welcome!!!</h1>
            <h2 className='greeting-text'>Thanks for checking out this brilliant app.</h2>  
            <h2 className='greeting-text'>Without making you wait, let's go a head and give the app a try!!! Good Luck!</h2>
            <img className='img-gif' src="happy-excited.gif"></img>

            <Box sx={{ '& > :not(style)': { m: 1 } }}
            style={{textAlign:"center", marginTop:"20px"}}>
            
              <Fab variant="extended" color="default" onClick={props.reset} >
                <InventoryIcon sx={{ mr: 1 }} />
                Let's Go!
              </Fab>
            </Box>
       </div> 
    );
}