import { useState } from 'react'
import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { userRegister,loginApi } from '../services/allApi'
import { useNavigate } from 'react-router-dom'

function Auth() {

    const [authStatus,setAuthStatus] = useState(false)
    const [user,setUser]=useState({
        email:"",username:"",password:""
    })
    const navigate=useNavigate()

    const handleAuthStatus=()=>{
        setAuthStatus(!authStatus)
    }

    const handleRegister=async()=>{
        console.log(user)
        const {email,username,password}=user
        if(!email || !username || !password){
            toast.warning("Enter Valid Inputs")
        }
        else{
            const res=await userRegister(user)
            console.log(res)
            if(res.status==200){
                toast.success("Registration Successfull")
                handleAuthStatus()
                setUser({
                    email:"",username:"",password:""  
                })
            }
            else{
                toast.error("Registration Failed!!")
            }
        }
    }

    const handleLogin=async()=>{
        const {email,password}=user
        if(!email || !password){
            toast.warning("Enter Valid Inputs")
        }
        else{
             const res= await loginApi({email,password})
             if(res.status==200){
                sessionStorage.setItem('token',res.data.token)
                sessionStorage.setItem('uname',res.data.username)
                toast.success("Login SuccessFull!!")
                setUser({
                    email:"",username:"",password:""  
                })
                navigate('/dash')
             }
             else{
                toast.error("Login Failed")
                console.log(res)
             }
        }
    }

  return (
    <>
        <div className='container-fluid d-flex justify-content-center align-items-center' style={{height:'100vh',backgroundColor:'#c8def7'}}>
            <div className='w-75  shadow bg-white'>
                <Row>
                    <Col sm={12} md={6}>
                        <img src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?t=st=1729316732~exp=1729320332~hmac=1038a32665a82ecaef63214260e1971621348b391ae0e66b7fe4b6042321342d&w=1800" alt="" className='img-fluid'/>
                    </Col>
                    <Col sm={12} md={6} className='p-5 '>
                        {
                            !authStatus?
                            <h1 className='mb-3 text-center'>LOGIN</h1>
                            :
                            <h1 className='mb-3 text-center'>REGISTRATION</h1>

                        }

                        <input type="text" className='form-control mb-3' placeholder='Enter Email'
                        value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}  name='email'/>
                        {
                            authStatus &&
                            <input type="text" className='form-control mb-3'placeholder='Enter Username'
                            value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} name='username'/>
                        }
                        <input type="password" className='form-control mb-3' placeholder='Enter Password'
                        value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} name='password'/>

                        <div className='d-flex justify-content-between '>
                            {
                                !authStatus?
                                <>
                                    <button className='btn btn-danger' onClick={handleLogin}>LOGIN</button>
                                    <button className='btn btn-link' onClick={handleAuthStatus}>Not a user?</button>
                                </>
                                :
                                <>
                                    <button className='btn btn-danger' onClick={handleRegister}>REGISTER</button>
                                    <button className='btn btn-link' onClick={handleAuthStatus}>Already a user?</button>
                                </>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </>
  )
}

export default Auth