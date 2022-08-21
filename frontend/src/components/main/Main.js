import * as React from 'react';
import Box from '@mui/material/Box';
import TextArea from "./Textarea"
import Fab from "@mui/material/Fab"
import SampleText from "@mui/icons-material/Casino"
import "./main.css"
import ModelSelection from "./ModelSelection"
import LastChecks from "./LastChecks"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Predict from "./Predict"
import axios from 'axios';

const steps = ['Write your input', 'Select a model', 'Last Checks'];


function getStepContent(step,setModel,setText,text,model) {
  
  const handleRandom = () => {

    


    axios({
      method: "get",
      url: "http://127.0.0.1:8000/random_input",
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {

      const category = response.data["category"];
      const input = response.data["content"];
      setText(input);
    
      }).catch(function (response) {
        alert("An error occured!")
        console.log(response);
      });

    
};




  switch (step) {
    case 0:
      return (
        <div className='input-section'>
          <div className='input-area'>
          <TextArea setText={setText} text={text}/>
          </div>
          <Typography><h6 className='inspiration'>Need inspiration?</h6></Typography>
          <div className='random-inp'>
              <Fab variant="extended" onClick={handleRandom} >
                  <SampleText sx={{ mr: 1 }} />
                  Random Input
              </Fab>
          </div>
        </div>
      )
    case 1:
      return <ModelSelection setModel={setModel} model={model}/>;
    case 2:
      return (
        <div>
            <LastChecks model={model} text={text} />
        </div>
      )
    default:
      return "unknown step";
  }
}


export default function HorizontalLinearStepper(props) {
  const text = props.text;
  const model = props.model;
  const setText = props.setText;
  const setModel = props.setModel;

  // const [activeStep, setActiveStep] = React.useState(0);
  const activeStep = props.activeStep;
  const setActiveStep = props.setActiveStep;
  const [skipped, setSkipped] = React.useState(new Set());
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const setPercentage1 = props.setPercentage1;
  const setPercentage2 = props.setPercentage2;
  const setPercentage3 = props.setPercentage3;

  const setClass1_label = props.setClass1_label;
  const setClass2_label = props.setClass2_label;
  const setClass3_label = props.setClass3_label;

  

  const handleClose = () => {
      setOpen(false);
  };
  const handleToggle = () => {
      setOpen(!open);

      var bodyFormData = new FormData();
      bodyFormData.append("data", text);
      console.log(text);


  
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/calculate",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
          navigate('/result');

          setPercentage1((Math.round(Object.keys(response.data[0])[0])*100) /100);
          setPercentage2((Math.round(Object.keys(response.data[1])[0])*100) /100);
          setPercentage3((Math.round(Object.keys(response.data[2])[0])*100) /100);

          setClass1_label(Object.values(response.data[0])[0]);
          setClass2_label(Object.values(response.data[1])[0]);
          setClass3_label(Object.values(response.data[2])[0]);

        }).catch(function (response) {
          alert("An error occured!")
          setOpen(!open);
          console.log(response);
        });

      
  };


  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  


  return (


        <div className='stepper'>

        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Predict handleClose={handleClose} handleToggle={handleToggle} open={open} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              
              <Typography sx={{ mt: 2, mb: 1 }}>{getStepContent(activeStep, setModel, setText, text, model)}</Typography>
              <div className='navigation-buttons'> 
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    // style={{ color: "black"}}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  {isStepOptional(activeStep) && (
                    <Button  color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )}

                  <Button style={{  borderRadius:"5px", backgroundColor:"black", color:"white" }} onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </div>
            </React.Fragment>
          )}
        </Box>
      </div>

    
  );
}




