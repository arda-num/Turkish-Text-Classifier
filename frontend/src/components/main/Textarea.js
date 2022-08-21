import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./text-area.css"


export default function MultilineTextFields(props) {
//   const [value, setValue] = React.useState('Controlled');

  const handleChange = (e) => {
    props.setText(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
        margin:"auto"
      }}
      noValidate
      autoComplete="off"
    >
      <div className='text-input'>
      <TextField
          
          id="filled-textarea"
          label="Please enter an input in Turkish to classify."
          placeholder="Placeholder"
          multiline
          variant="filled"
          rows={6}
          // inputProps={{
          //   style: { height:"150px", overflowY:"scroll"}
          // }}
          onChange={handleChange}
          value={props.text}
          
        />
       
        
      </div>
      
    </Box>
  );
}
