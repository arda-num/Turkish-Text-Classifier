import * as React from 'react';
import Typography from '@mui/material/Typography';
import "./model-selection.css"
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonSizes(props) {
  // const [alignment, setAlignment] = React.useState('left');

  const handleChange = (event, newAlignment) => {
    props.setModel(newAlignment);
  };

  const children = [
    <ToggleButton style={{margin:"10px", border: "1px solid gray", borderRadius:"5px"}} value="left" key="left" color="primary" >
        <div className='model-section-text'>
        <Typography>
          <b>BERTTURK</b><br/><br/>
          <div className='explanation'>
          <ul>
            <li>Freezed the first 10 encoders of the model among 12 and trained the rest. </li><br/>
            <li>Accuracy: 94.1%</li><br/>
            <li>Arda's Choice</li>
          </ul>
          </div>
        </Typography>
        </div>
    </ToggleButton>,
    <ToggleButton style={{margin:"10px", border: "1px solid gray", borderRadius:"5px"}} value="center" key="center" color="primary" >
      <div className='model-section-text'>
        <Typography>
          
        <b>DISTILBERT</b><br/><br/>
        <div className='explanation'>
          <ul>
            <li>Freezed the first 4 transformers of the model among 5 added a pooling and linear layer and trained.  </li><br/>
            <li>Accuracy: 93.9%</li>
          </ul>
        </div>
        </Typography>
      </div>
    </ToggleButton>,
    
    <ToggleButton style={{margin:"10px", border: "1px solid gray", borderRadius:"5px"}} value="right" key="right" color="primary" >
      <div className='model-section-text'>
        <Typography>
        <b>ELECTRA</b><br/><br/>
        <div className='explanation'>
          <ul>
            <li>Freezed the first 10 encoders of the model among 12 added a pooling and linear layer and trained. </li><br/>
            <li>Accuracy: 92.2%</li>
          </ul>
          </div>
          </Typography>
      </div>
    </ToggleButton>,
    // <ToggleButton style={{margin:"10px", border: "1px solid gray", borderRadius:"5px"}} value="justify" key="justify" color="primary" >
    //   <div className='model-section-text'>
    //     <Typography>
    //     <b>CONVBERT</b><br/><br/>
    //     <div className='explanation'>
    //       <ul>
    //         <li>Freezed the first 10 encoders of the model among 12 and trained the rest. </li>
    //         <li>Accuracy: 94.1%</li>
    //         <li>Arda's Choice</li>
    //       </ul>
    //       </div>
    //       </Typography>
    //   </div>
      
    // </ToggleButton>,
  ];

  const control = {
    value: props.model,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: "80px",
        // TODO Replace with Stack
        '& > :not(style) + :not(style)': { mt: 2 },
      }}
    >

      <ToggleButtonGroup size="large" {...control}>
        {children}
      </ToggleButtonGroup>
    </Box>
  );
}
