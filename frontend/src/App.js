import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes} from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Main from "./components/main/Main"
import Result from "./components/result/Result-page"
import { useNavigate } from 'react-router-dom';
import Greeting from "./components/intro/Greeting";
import "./app.css"
import Contact from "./components/contact/Contact"
import PastResults from './components/past_results/PastResults';



export default function App() {

    const [text, setText] = React.useState("");
    const [model, setModel] = React.useState("left");
    const [percentage1, setPercentage1] = React.useState(0);
    const [percentage2, setPercentage2] = React.useState(0);   
    const [percentage3, setPercentage3] = React.useState(0);

    const [class1_label, setClass1_label] = React.useState("undefined");
    const [class2_label, setClass2_label] = React.useState("undefined");
    const [class3_label, setClass3_label] = React.useState("undefined");

    


    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate();
    const handleReset = () => {
        
        setActiveStep(0);   
        setText(null);
        setModel(null);
        navigate("/home");
        
      };
    
    
    return (
        <div className='page'>
            <div className='navbar'>
                <Navbar reset={handleReset}/> 	
            </div>
            <div className='main-page'>
            <Routes>
                <Route exact path ="/contact" element={<Contact />}></Route>
                <Route exact path ="/" element={<Greeting reset={handleReset}/>}></Route>
                <Route exact path ="/result" element={<Result  
                                                        text={text} 
                                                        model={model} 
                                                        percentage1={percentage1} 
                                                        percentage2={percentage2} 
                                                        percentage3={percentage3}
                                                        class1_label={class1_label}
                                                        class2_label={class2_label}
                                                        class3_label={class3_label}
                                                        reset={handleReset}
                                                        />}></Route>
                <Route exact path ="/results" element={<PastResults />}></Route>
                <Route exact path='/home' element={< Main 
                                                        text={text} 
                                                        model={model} 
                                                        setText={setText} 
                                                        setModel={setModel} 
                                                        setPercentage1={setPercentage1} 
                                                        setPercentage2={setPercentage2} 
                                                        setPercentage3={setPercentage3}  
                                                        setClass1_label={setClass1_label}
                                                        setClass2_label={setClass2_label}
                                                        setClass3_label={setClass3_label} 
                                                        activeStep={activeStep}
                                                        setActiveStep={setActiveStep}
                                                        />}></Route>
            </Routes>
            </div>

        </div>
    );
}