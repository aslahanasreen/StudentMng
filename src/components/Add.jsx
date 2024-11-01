import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useState,useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addStudentApi } from '../services/allApi';
import { addResponseContext } from '../contextApi/ContextApi';

function Add() {

    const [show, setShow] = useState(false);
    const [student,setStudent]=useState({
        name:"",batch:"",phone:"",image:""
    })
    const [preview,setPreview]=useState("")
    const {setAddResponse} = useContext(addResponseContext)

    useEffect(()=>{
        if(student.image){
            setPreview(URL.createObjectURL(student.image))
        }
        else{
            setPreview("")
        }

    },[student.image])

    const handleAdd=async()=>{
        console.log(student)
        const {name,phone,batch,image}=student
        if(!name || !phone || !batch || !image){
            // console.log("Name:", name, "Batch:", batch, "Phone:", phone, "Image:", image);
            toast.warning("Enter Valid Inputs")
        }
        else{
            const fd=new FormData()
            fd.append("name",name)
            fd.append("batch",batch)
            fd.append("phone",phone)
            fd.append("image",image)

            const header={
                "Content-Type":'multipart/form-data',
                "Authorization":`Token ${sessionStorage.getItem('token')}`
            }

            const res=await addStudentApi(fd,header)
            console.log(res)
            if(res.status==200){
                toast.success("Student Added")
                handleClose()
                setAddResponse(res)
            }
            else{
                toast.error("Adding Failed!!")
            }


        }

    }


    const handleClose = () => {
        setShow(false);
        setStudent({
            name:"",batch:"",phone:"",image:""
        })
    }
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='d-grid'><button className='btn  btn-info' onClick={handleShow}>Add Student</button></div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12} md={6}>
                            <label>
                                <input type="file" onChange={(e)=>setStudent({...student,image:e.target.files[0]})} style={{ visibility: 'hidden' }} />
                                <img src={preview?preview:"https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-854.jpg?t=st=1729320961~exp=1729324561~hmac=1bd7dd4e022e47024ce7290880dc6f10de44e9cd79508ec611fbd0e826e55126&w=1060"} alt="" className='img-fluid'/>
                            </label>
                        </Col>
                        <Col sm={12} md={6} className='p-5'>
                            <input type="text" placeholder='Enter Name' name='name' className='form-control mb-3'
                            onChange={(e)=>setStudent({...student,name:e.target.value})}/>
                            {/* <input type="date" placeholder='Enter DOB' name='dt' className='form-control mb-3'/> */}
                            <input type="phone" placeholder='Enter Phone Number' name='number' className='form-control mb-3'
                            onChange={(e)=>setStudent({...student,phone:e.target.value})}/>
                            {/* <input type="email" placeholder='Enter Email' name='email' className='form-control mb-3'/> */}
                            <input type="text" placeholder='Enter Class' name='class' className='form-control mb-3'
                            onChange={(e)=>setStudent({...student,batch:e.target.value})}/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>Upload</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add