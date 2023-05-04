import './App.css';
import logo2 from '../src/images/logo2.jpg';
import {useState } from "react";
import {StuInput,StuOptions,FormRadioIn, SubmitBtn,ResetBtn,BackBtn,UpdateBtn} from './StuInput';
import { values } from './values';
import { aNationality } from './values';
import { radio } from './values';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Stuform(props){  
    let errors = {};  
    const navigate=useNavigate();
    let data={ regno:"",name:"",gender:"",phone:"",dob:"",cntry:"",email:"",pwd:""}     //initial value
    const [addStuData, setaddStuData] = useState(props.editData ?? data)
    const [validation, setValidation] = useState({});

    const handleInput=(e)=>{
        const {name,value} = e.target;
        setaddStuData(data=>({...data,[name]:value}));   
    }
    //clear radioBtn
    const radioClr=()=>{
        let rad=document.getElementsByName('gender');
        for(let i=0;i<rad.length;i++){
            rad[i].checked=false;
        }
    } 
    //reset details  
    const handleReset = () =>{        
        radioClr();
        setaddStuData(data);
    }
    // validation
    const checkValidation = (values) => {
        //regno validation
        if (!values.regno) {
            errors.regno = "Must be filled in this field";
        }
        //Name validation
        if (!values.name) {
            errors.name = "Must be filled in this field"; 
        }
        else if(values.name.length<6){
            errors.name = "Must be filled in 6 letters";
        }
        //Gender validation
        if (!values.gender) {
            errors.gender = "Must be filled in this field"; 
        }
        //Phone validation
        if(!values.phone){
            errors.phone = "Must be filled in this field"; 
        }
        else if(values.phone.toString().length!==10){
            errors.phone = "Enter valid phone number"; 
        }
        //dob validation
        let today = new Date();
        let dateofbir = values.dob;
        let birth = new Date(dateofbir);
        let age = today.getFullYear() - birth.getFullYear();
        if (!values.dob) {
            errors.dob = "Must be filled in this field";
        }
        if (birth.getMonth() > today.getMonth()) {
            age--;
        } else if (birth.getMonth() === today.getMonth()) {
            if (birth.getDate() > today.getDate()) {
                age--;
            }
        }
        if (age < 18) {
            errors.dob= "You are Not Eligible";
        }
        //Country validation
        if(!values.cntry){
            errors.cntry = "Must be filled in this field"; 
        }
        //Email validation
        if(!values.email){
            errors.email = "Must be filled in this field"; 
        }
        else if(values.email===/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/){
            errors.email = "Enter valid Email Id"; 
        }
        //Password validation
        if(!values.pwd){
            errors.pwd = "Must be filled in this field"; 
        }else if(values.pwd.length<6){
            errors.pwd = "Must be filled in 6 letters";
        }
        return errors;    
    }

    const handleSubmit=(e)=>{
        e.preventDefault();       
        setValidation(checkValidation(addStuData)); 

        if(Object.keys(errors).length===0){
            if(Object.keys(props.editData).length===0){
                axios({
                    method:"POST",
                    url:"http://localhost:8301/save-studata",
                    data:addStuData,
                }).then(function(res){
                    if(res.data.code=="already exist"){
                        alert(res.data.code);
                    }else{              
                        alert("submited");
                        handleReset();
                        navigate("/");
                    }         
                }).catch(function(err){
                    console.log("internal error");
                })
            }    
            else {
                axios({
                    method: 'POST',
                    url: 'http://localhost:8301/update-studata',
                    data: addStuData
                }).then((res) => {
                    if(res.data.code=="already exist"){
                        alert(res.data.code);
                    }else{
                        alert("submited");
                        handleReset();
                        navigate("/");
                    }           
                }).catch(function (err) {
                    alert("Internal error");
                })
            }                        
        } 
    } 
    
    return (
        <div>
            <form name="myForm">
                <div className="form-horizontal col-lg-6 form">
                    <div className="form-group test">
                        <div className="media">
                            <div className="media-left">
                                <img src={logo2} alt="logo" className="logo" />
                            </div>
                            <div className="media-right">
                                <h3><strong>Student Registeration Form</strong></h3>
                            </div>
                        </div>
                    </div>
                    <hr />
                    {
                        values.map((data)=>{
                            return(
                                <>
                                <StuInput id={data.id} type={data.type} name={data.name} placeholder={data.placeholder} label={data.label} onChange={handleInput} value={addStuData[data.value]} error={validation[data.name]} className={data.className}/>
                                </>
                            )
                        }) 
                    }
                    <FormRadioIn type="radio" id="radio" labname="Gender:" value={radio} onChange={handleInput} error={validation.gender} val={addStuData.gender}/> 
                    <StuOptions name="cntry" option={aNationality} placeholder="select your Nationality" label="Nationality:"onChange={handleInput} value={addStuData.cntry} error={validation.cntry}/>
                    <div className="checkbox-inline col-xs-12">
                        <input type="checkbox" id="checkbox" onChange={handleInput}/>
                        <label title="Please Click the box!" className="text-danger">Confirm to Enter the Details</label>
                    </div>
                    <div className='button'>
                        <BackBtn type="button" className="btn btn-lg" value="BACK" /> 
                        <SubmitBtn type="button" className="btn btn-lg btn-success" onClick={handleSubmit}  labname={Object.keys(props.editData).length===0?"SUBMIT":"UPDATE"}/>
                        <ResetBtn type="button" className="btn btn-lg btn-info" onClick={handleReset} value="RESET"/>
                    </div>                    
                </div>
            </form>
        </div>  
    )
}
export default Stuform;