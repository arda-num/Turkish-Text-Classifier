import * as React from 'react';
import Skeleton from "./Sekeleton"
import "./resultPage.css"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from "@mui/material/Button";
import Fab from '@mui/material/Fab';
import ReplayIcon from '@mui/icons-material/Replay';
import InventoryIcon from "@mui/icons-material/Inventory"
import { Link } from 'react-router-dom'
import Zoom from '@mui/material/Zoom';
import { useNavigate } from 'react-router-dom';






export default function ResultPage(props) {
  
    console.log(props.text)
    const percentage1 = props.percentage1;
    const percentage2 = props.percentage2;
    const percentage3 = props.percentage3;

    const navigate = useNavigate();
    const handleResults = () => {

      navigate("/results");
      
    };

    const style_progress1 = {
      // Rotation of path and trail, in number of turns (0-1)
      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
      strokeLinecap: 'round',
      // Text size
      textSize: '18px',
      // How long animation takes to go from one percentage to another, in seconds
      pathTransitionDuration: 0.5,
      // Can specify path transition in more detail, or remove it entirely
      // pathTransition: 'none',
      // Colors
      pathColor: `rgba(30, 200, 150)`,
      textColor: '#2e2c28',
      trailColor: '#d6d6d6',
      backgroundColor: '#3e98c7',
    }

    const style_progress2 = {
      strokeLinecap: 'round',
      textSize: '16px',
      pathTransitionDuration: 0.5,
      path: {
        // Path color
        stroke: `rgba(62, 152, 199, ${percentage2 / 100})`,
        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: 'butt',
        // Customize transition animation
        transition: 'stroke-dashoffset 0.5s ease 0s',
        // Rotate the path
        transform: 'rotate(0.25turn)',
        transformOrigin: 'center center',
      },
      pathColor: `rgba(217, 149, 113)`,
      textColor: '#2e2c28',
      trailColor: '#d6d6d6',
      backgroundColor: '#3e98c7',
    }

    const style_progress3 = {
      strokeLinecap: 'round',
      textSize: '16px',
      pathTransitionDuration: 0.5,
      pathColor: `rgba(217, 89, 89)`,
      textColor: '#2e2c28',
      trailColor: '#d6d6d6',
      backgroundColor: '#3e98c7',
    }

    const class1_label = props.class1_label;
    const class2_label = props.class2_label;
    const class3_label = props.class3_label;

    // const handleResults = () =>  {
    //   alert("Coming soon... Stay tuned!");
    // }

    return (
        <div className='result-page'>
          <div className='result-section'>
            <h3 className='text-header'>Top 3 most relevant label</h3>
            <div className='paper-section'>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    m: 1,
                    width: 250,
                    height: 350,
                  },
                }}
              >
                <Zoom in={true}  style={{ transitionDelay: true ? '500ms' : '0ms' }}>
                  
                  <Paper elevation={3} >
                      
                      <p className='result2'>{class2_label}</p>  
                      <div className='result-main2'> 
                      <CircularProgressbar value={percentage2} text={`${percentage2}%`} 
                      styles={buildStyles(style_progress2)}
                      />
                      </div>
                      
                  </Paper>              
                </Zoom>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    m: 1,
                    width: 300,
                    height: 400,
                  },
                }}
              >
                <Zoom in={true}>
                  <Paper elevation={3} >
                      <p className='result1'>{class1_label}</p>  
                      <div className='result-main1'> 
                      <CircularProgressbar value={percentage1} text={`${percentage1}%`} 
                      styles={buildStyles(style_progress1)}
                      />
                      </div>
                  </Paper>
                </Zoom>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    m: 1,
                    width: 230,
                    height: 310,
                  },
                }}
              >

                <Zoom in={true} style={{ transitionDelay: true ? '1000ms' : '0ms' }}>
                  <Paper elevation={3} > 
                      <p className='result3'>{class3_label}</p>  
                      <div className='result-main3'> 
                      <CircularProgressbar value={percentage3} text={`${percentage3}%`}
                      styles={buildStyles(style_progress3)}
                      />
                      </div>
                  </Paper>    
                </Zoom>

              </Box>
            </div>
              
              

            
            <Box sx={{ '& > :not(style)': { m: 1 } }}
            style={{textAlign:"center", marginTop:"20px"}}>
              <Fab variant="extended" onClick={props.reset} color="primary">
                <ReplayIcon sx={{ mr: 1 }} />
                Replay
              </Fab>
            </Box>
            <Box sx={{ '& > :not(style)': { m: 1 } }}
            style={{textAlign:"center", marginTop:"20px"}}>
              <Fab variant="extended" onClick={handleResults}>
                <InventoryIcon sx={{ mr: 1 }} />
                Past Results
              </Fab>
            </Box>
          </div>


        </div>
    )
};







        