import React from 'react'
import styled from 'styled-components'
import Avatar from '@mui/material/Avatar';

const Patient = styled.div`
width:90%;
font-size:1rem;
margin:2%;
height: 13%;

box-shadow: 0 0 10px hsl(0, 0%, 81%);
border-radius:15px;
padding:2%;
display:flex;
span{
    margin-left:4%;
   
}
.name{
    

}
.info{
    width:100%;
    display:flex;
    flex-direction:column;

}
`


const PatientCard = (props) => {
  return (
    <Patient>
    <Avatar  sx={{ width: 50, height: 50 }}></Avatar>
    <div className='info'>
    <span className='name'>{props.name}</span>
    <span className='age'>{}</span>
    <span className='city' >mumbai</span>
    </div>
    
    </Patient>
  )
}

export default PatientCard
