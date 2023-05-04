import React from 'react';
import './App.css';
import {Link} from "react-router-dom";
//input tag
export const StuInput=function(props) {
    return (
        <div>
            <div className={props.className}>
                <label>{props.label}</label>
                <input type={props.type} name={props.name} placeholder={props.placeholder} className="form-control" onChange={props.onChange} value={props.value}/>
                {props.error && <h4 className="text-danger">{props.error}</h4>}
                </div>
        </div>
    )
}
//select tag
export const StuOptions=function(props){
    return(
        <div className="form-group col-xs-12">
            <label className="form-group col-xs-12" >
                {props.label}
            </label>
            <select className="form-control col-xs-12" onChange={props.onChange} name={props.name} value={props.value}>
                {
                    props.option.map((val)=>{
                        return(
                            <>
                                <option name={val.name} onChange={props.onChange} value={val.country} >
                                    {val.country}
                                </option>                            
                            </>
                        )                        
                    })                    
                }              
            </select>
            {props.error && <h4 className="text-danger">{props.error}</h4>}
        </div>
    )
}
//radio btn
export const FormRadioIn=(props)=>{
    return( 
        <div className="form-group  col-xs-12">
            <label className="col-xm-12">{props.labname}</label>
            <div className=" form-group col-xs-12 radio">
                {
                    props.value.map((val)=>{
                        return(
                            <>
                            <label><input type={props.type} name={val.name} onChange={props.onChange} value={val.gen} defaultChecked={val.gen===props.val}/>
                                {val.gen}
                            </label>
                            </>
                        )
                    })
                }
                {props.error && <h4 className="text-danger">{props.error}</h4>}
            </div>
        </div>   
    );
};
//buttons
export const SubmitBtn=(props)=>{
    return(
        <>
        <button type={props.type} className={props.className} onClick={props.onClick}>{props.labname}</button>
        </>      
    );
};
export const ResetBtn=(props)=>{
    return(
        <>
        <button type={props.type} className={props.className} onClick={props.onClick}>{props.value}</button>
        </>      
    );
};
export const BackBtn=(props)=>{
    return(
        <>
        <Link to="/"><button type={props.type} className={props.className}>{props.value}</button></Link>
        </>      
    );
};
export const addBtn=(props)=>{
    return(
        <>
        <button type={props.type} className={props.className} onClick={props.onClick}><span className="glyphicon glyphicon-plus"></span>{props.value}</button>
        </>      
    );
};