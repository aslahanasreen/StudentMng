import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <>
        <div className='w-100 d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
            <div className='w-75'>
                <Row>
                    <Col sm={12} md={6} className='p-5'>
                        <h2>Student Management</h2>
                        <p style={{textAlign:'justify'}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque quisquam dolores ut, dignissimos quidem corrupti blanditiis ea reprehenderit iusto itaque repellendus autem iste minima aperiam animi quos delectus ex porro?</p>
                        <Link to={'/auth'} className='btn btn-primary'>Let's Go</Link>
                    </Col>
                    <Col sm={12} md={6  }>
                        <img src="https://img.freepik.com/free-vector/flat-people-going-university-collection_23-2148183948.jpg?t=st=1729317042~exp=1729320642~hmac=591f8527fee59103fbe96dcf689eb91c50d4ea88a94d47276803a12898e48fff&w=1800 " alt="" className='img-fluid'/>
                    </Col>
                </Row>
            </div>
        </div>
    </>
  )
}

export default Landing