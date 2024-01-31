import React from 'react'
import styled from 'styled-components'
import Avatar from '@mui/material/Avatar';

const Patient = styled.div`

width:90%;
font-size:1rem;
margin:2%;
height: 13%;

border-top:3px solid var(--secondary-color);
box-shadow: 0 0 10px hsl(0, 0%, 81%);
border-radius:0 0 15px 15px;
padding:2%;
display:flex;
transition: all 0.5s ease;
&:hover{

  transform:scale(1.04);
}
div{
   margin-left:5%;
}
.name{
    font-weight:600;
    font-size:20px;
}
.age{
    font-weight:400;
}
.info{
    width:100%;
    display:flex;
    flex-direction:column;
}
.underinfo{
    margin:0;
    display:flex;
}
`


const PatientCard = ({name,age,gender , onClick}) => {
  return (

   
    <Patient onClick={onClick}>
    <Avatar  sx={{ width: 50, height: 50  }}></Avatar>
    <div className='info'>
    <div className='name'>{name}</div>
    <div className='underinfo'>
    <div className='age'>{age}</div>
    <div className='gender' >{gender}</div>
    </div>

    </div>
    
    </Patient>
  
 
  )
}

export default PatientCard
