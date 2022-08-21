import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "./navbar.css"
import { Link } from 'react-router-dom'

function DrawerAppBar(props) {
  
  return (
    <Box sx={{ display: 'flex' , margin:"auto", minWidth:"none"}}>
      <AppBar component="nav" style={{background:"#5d636b"}}>
        <Toolbar>
          
          <img src='son.png' className='logo' ></img>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color:"white" }}}
          >
            <p className='text-nav'>Turkish Text Classifier</p>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button key={"Home"} sx={{ color: '#fff', '&:hover': {backgroundColor: 'black', color: 'white'} }} onClick={props.reset}>   
                <Link to="/home" style={{textDecoration:"none", color:"white"}}>Home</Link>
              </Button>
              <Button key={"Results"} sx={{ color: 'white' , '&:hover': {backgroundColor: 'black', color: 'white'}}}>   
                <Link to="/results" style={{textDecoration:"none", color:"white"}}>Results</Link>
              </Button>
              <Button key={"About"} sx={{ color: '#fff' , '&:hover': {backgroundColor: 'black', color: 'white'}} }>   
                About
              </Button>
              <Button key={"Contact"} sx={{ color: '#fff' , '&:hover': {backgroundColor: 'black', color: 'white'}} }>   
              <Link to="/contact" style={{textDecoration:"none", color:"white"}}>Contact</Link>
              </Button>
          </Box>
        </Toolbar>
      </AppBar>
     
      
    </Box>
  );
}

export default DrawerAppBar;
