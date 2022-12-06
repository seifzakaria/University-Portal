import React, { useState } from "react"
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function CancelPending(){
    const token = localStorage.getItem("user");
    const cancelReq = (event) =>{
        axios({
          url: 'http://localhost:8080/academicMember/cancelReq',
          method: 'DELETE',
          headers: {
            token: token,
          },
          data: {
           reqId:"5fe5e4c0750d936ee4b3e4c1"
          },
        })
          .then((res) => {
            console.log(res) 
          })
          .catch((error) => {
            console.log(error)
          })   
      }
    return(
        <div style={{marginTop:'2vw'}}>
           <Button 
           onClick={cancelReq}>
             Cancel Pending Request
           </Button>

        </div>
    )
}