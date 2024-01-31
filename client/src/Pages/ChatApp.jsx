import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
width:100%;
height:100vh;
background-color:black;
display:flex;
`
const Patients = styled.div`
height:100;
flex:3;
border-right:4px solid #0d265c;
background-color:white;
display:flex; 
 flex-direction:column;
 align-items:center; 

.title{
    width:100%;
    font-size:1.5rem;
    flex:1;
    display:flex;
    align-items:center;

}
`
const PatientListwrapper= styled.div`
width:100%;
flex:7;
display:flex;
flex-direction:column;
align-items:center;
overflow-y:auto;
max-height:90%;


`
const Patient = styled.div`
width:90%;
font-size:1rem;
margin:2%;
height: 50px;
`

const ChatWrapper= styled.div`
height:100;
flex:10;
display:flex;
flex-direction:column;
`
const ChatContent= styled.div`
height:85%;
display:flex;
flex-direction:column;
align-items:center;
padding:4%;
`
const ChatInput= styled.div`
height:15%;

display:flex;
justify-content:center;
input{
    width:70%;
    height:50%;
    border-radius:10px;
}
button{
    width:5%;
    height:50%;
    background-color:white;
    margin-left:3%;
    border-radius:20%;
}

`
const Message = styled.div`
width:90%;
height:auto;
padding:20px;
background-color:red;
`
const PatientArr = [{
    name:'arshad'
},
{
    name:'yash'
},
{
    name:'yash'
},
{
    name:'yash'
},
{
    name:'yash'
},
{
    name:'yash'
},
{
    name:'yash'
}]



const ChatApp = () => {
    const [query , setQuery]=useState('')
    const[message , setMessage]=useState(['how may i help you today'])

    const handleChange = (e) => {
        setQuery(e.target.value)
    }
    const handleSend = () => {
        setMessage(query)
    }

    return (
    <Wrapper>
        <Patients>
            <div className='title'>Patients</div>
            <PatientListwrapper>
                {
                    PatientArr.map((p)=>(
                        <Patient>
                            {p.name}
                        </Patient>
                    ))
                }
            </PatientListwrapper>
        </Patients>


        <ChatWrapper>
        <ChatContent>
            {
                message.map((chat)=>(
                    
                        <Message>
                            {chat}
                        </Message>
                    
                ))
            }
        </ChatContent>

        <ChatInput>
        <input onChange={handleChange}></input>
        <button onClick={handleSend}>click</button>
        </ChatInput>
            
        </ChatWrapper>

     </Wrapper>
  )
}

export default ChatApp
