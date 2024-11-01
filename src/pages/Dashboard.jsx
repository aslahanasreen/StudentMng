import React, { useState, useEffect,useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Add from '../components/Add';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Edit from '../components/Edit';
import { getStudentApi,dltStudentApi } from '../services/allApi';
import { addResponseContext,editResponseContext } from '../contextApi/ContextApi';
import { toast } from 'react-toastify';
import baseUrl from '../services/Baseurl';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const [students, setStudent] = useState([])
  const [searchKey,setSearchKey] = useState("")

  const nav = useNavigate()

  const {addResponse} = useContext(addResponseContext)
  const {editResponse} = useContext(editResponseContext)

  useEffect(() => {
    getData()
  }, [addResponse,editResponse,searchKey])

  const getData = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await getStudentApi(header,searchKey)
    console.log(res)

    if (res.status == 200) {
      setStudent(res.data)
    }
  }

  const handleDelete = async(id)=>{
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await dltStudentApi(id,header)

    if(res.status==200){
      toast.success('Student Details Removed!!')
      getData()
    }
    else{
      toast.error('Something went wrong!!')
      console.log(res)
    }
  }

  const logout = ()=>{
    nav('/auth')
    sessionStorage.clear()
    toast.success('Logged Out!!')
  }

  return (
    <>
      {/* header */}

      <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand href="#home" className='text-white'>
            <i className="fa-solid fa-user-graduate fa-xl" style={{ color: "#fafcff" }} />{' '}
            Student Mangement
          </Navbar.Brand>
          <button className='btn' onClick={logout}><i className="fa-solid fa-right-from-bracket fa-xl" style={{color: "#ffffff",}} /></button>
        </Container>
      </Navbar>

      <div className='p-5 container-fluid'>
        <div className='d-flex justify-content-between'>
          <Add />
          <div>
            <input type="text" placeholder='Enter name to search' onChange={(e)=>{setSearchKey(e.target.value)}} className='form-control'/>
          </div>
        </div>
        
        <h1 className='text-center mt-5'>Student Details</h1>
        <hr />

        <div className='row mt-5'>
          {
            students.length > 0 ?
              students.map((item) => (
                <Card style={{ width: '18rem' }} className='col-sm-12 col-md-4 me-5 mb-5'>
                  <Card.Img variant="top" src={`${baseUrl}/uploads/${item.image}`} className='img-fluid' style={{height:'200px'}}/>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {/* DOB : 7-12-2007 <br /> */}
                      Class : {item.batch} <br />
                      Phone : {item.phone} <br />
                      {/* Email : amrutha@gmail.com */}
                    </Card.Text>
                    <div className='d-grid'>
                      <Edit student={item}/>
                      <Button variant="primary" onClick={()=>{handleDelete(item._id)}}>Delete</Button>
                    </div>

                  </Card.Body>
                </Card>
              ))
              :
              <h3>No students added yet!!</h3>
        }
        </div>
      </div>
    </>
  )
}

export default Dashboard