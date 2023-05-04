import './App.css';
import {useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {addBtn} from './StuInput';
function Stulist(props){
    const [tableData,settableData]= useState([]);
    const navigate=useNavigate();

    //get stud details from db
    var getStudData = function () {
        axios({
            method:"POST",
            url:"http://localhost:8301/get-studata",
        }).then((res) => {
            if (res.data && res.data.length) {
                settableData(res.data);
            } else {
                settableData([]);
            }            
        }).catch((err) => {
            console.log("Internal error");
        })
    }
    //one time call when page is rendered
    useEffect(()=>{
        getStudData();
    },[])

    //delete student record
    const handleDelete=(index)=>{
        if (window.confirm("Do you want to delete: "+tableData[index].name)) {
            axios({
                method: 'POST',
                url: "http://localhost:8301/del-studata",
                data: {_id:tableData[index]._id}
            }).then(function success(res) {
                getStudData();
            }).catch(function (err) {
                alert("Internal error")
            })
        }
    }

    //edit student record
    const handleEdit =(index) =>{         
        axios({
            method: 'POST',
            url: 'http://localhost:8301/edit-studata',
            data: {_id:tableData[index]._id}
        }).then(function success(res) { 
            props.setEditData(res.data);
            navigate("/Stuform")
            tableData.dob = new Date(tableData.dob);
        }).catch(function (err) {
            alert("Internal error")
        })        
    };
    const addBtn=()=>{
        props.setEditData({});
        navigate("/Stuform")
    }
    return(
        <div>
            <div className="container">
                <addBtn type="button" className="btn btn-info btn-lg addbtn" onClick={addBtn}> ADD</addBtn>   
            </div>
            <div>
                <div>
                    <h1>Registration Form</h1>
                </div>
                {
                    tableData.length===0?(
                        <div className="alert alert-default">
                            <strong>Information: No Student Records Found !!!</strong>
                        </div>
                    ):(<></>)
                }                       
            </div>            
            <div className="container">
                <div className="row">
                    <div className="col-md-12">                        
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Register Number</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Phone Number</th>
                                    <th>DOB</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody> 
                            {
                                tableData?(                              
                                    tableData.map((data,index)=>{
                                    return(                                               
                                        <tr key={index}>
                                            <td>{data.regno}</td>
                                            <td>{data.name}</td>
                                            <td>{data.gender}</td>
                                            <td>{data.phone}</td>
                                            <td>{data.dob}</td>
                                            <td><button className="btn  btn-xs btn-success" onClick={()=>handleEdit(index)}><span className="glyphicon glyphicon-pencil btn-success"></span></button>
                                                <button className="btn  btn-xs btn-danger" onClick={()=>handleDelete(index)}><span className="glyphicon glyphicon-trash btn-danger"></span></button> 
                                            </td>
                                        </tr>
                                    )
                                })):(<></>)
                            }                                                                                                                                                  
                            </tbody>
                        </table>                                                        
                    </div>
                </div>
            </div>
                    
        </div>
    )
}
export default Stulist;
