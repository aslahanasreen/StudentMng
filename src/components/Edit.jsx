import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useState, useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import baseUrl from '../services/Baseurl';
import { editStudentApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { editResponseContext } from '../contextApi/ContextApi';

function Edit({ student }) {

    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState({ ...student })
    const [preview, setPreview] = useState('')

    const {setEditResponse} = useContext(editResponseContext)

    useEffect(() => {
        if (detail.image.type) {
            setPreview(URL.createObjectURL(detail.image))
        }
        else {
            setPreview("")
        }
    }, [detail.image])

    const handleEdit = async() => {
        console.log(detail)
        const {name,phone,batch,image} = detail
        if( !name || !phone || !batch || !image ){
            toast.warning('Enter valid input!!')
        }
        else{
            if(detail.image.type){
                const fd = new FormData()
                fd.append("name",name)
                fd.append("phone",phone)
                fd.append('batch',batch)
                fd.append('image',image)

                const header = {
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Token ${sessionStorage.getItem('token')}`
                }

                const res = await editStudentApi(student._id,header,fd)
                console.log(res)

                if(res.status==200){
                    toast.success("Updation successfull!")
                    handleClose()
                    setEditResponse(res)
                    setDetail({...res.data})
                    setPreview("")
                }
                else{
                    toast.error("Updation failed!!")
                }
            }
            else{
                const header = {
                    'Content-Type':'application/json',
                    'Authorization':`Token ${sessionStorage.getItem('token')}`
                }

                const res = await editStudentApi(student._id,header,detail)
                console.log(res)

                if(res.status==200){
                    toast.success("Updation successfull!")
                    setEditResponse(res)
                    handleClose()
                    setDetail({...res.data})
                    setPreview("")
                }
                else{
                    toast.error("Updation failed!!")
                }
            }
        }

    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='d-grid mb-2'><button className='btn btn-primary text-white' onClick={handleShow}>Edit</button></div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12} md={6}>
                            <label>
                                <input type="file" onChange={(e) => { setDetail({ ...detail, image: e.target.files[0] }) }} style={{ visibility: 'hidden' }} />
                                <img src={preview?preview:`${baseUrl}/uploads/${student.image}`} alt="" className='img-fluid p-4' />
                            </label>
                        </Col>
                        <Col sm={12} md={6} className='p-5'>
                            <input type="text" placeholder='Enter Name' defaultValue={student.name} name='name' className='form-control mb-3'
                                onChange={(e) => { setDetail({ ...detail, name: e.target.value }) }} />
                            {/* <input type="date" placeholder='Enter DOB' name='dt' className='form-control mb-3'/> */}
                            <input type="phone" placeholder='Enter Phone Number' defaultValue={student.phone} name='number' className='form-control mb-3'
                                onChange={(e) => { setDetail({ ...detail, phone: e.target.value }) }} />
                            {/* <input type="email" placeholder='Enter Email' name='email' className='form-control mb-3'/> */}
                            <input type="text" placeholder='Enter Class' name='class' defaultValue={student.batch} className='form-control mb-3'
                                onChange={(e) => { setDetail({ ...detail, batch: e.target.value }) }} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit