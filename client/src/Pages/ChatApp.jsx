import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send';
import PatientCard from '../components/PatientCard';

const Wrapper = styled.div`
width:100%;
height:100vh;
background-color:black;
display:flex;
`
const Patients = styled.div`
height:100;
flex:3;
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
    font-weight:700;
    font-size:2rem;
    margin-left:10%;
    color:var(--primary-color)

}
`
const PatientListwrapper= styled.div`
width:100%;
flex:7;
display:flex;
flex-direction:column;
align-items:center;
overflow:auto;
max-height:90%;
`

const ChatWrapper= styled.div`
height:100;
flex:10;
display:flex;
flex-direction:column;
background-color:var(--background-color);
`
const ChatContent = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4%;
  overflow: auto;

  .patientName{
    font-weight:700;
    font-size:2.3rem;
    width:85%;
    margin-bottom:0.5%;
  }

    &::-webkit-scrollbar{
        display:none;
    }
`

const ChatInput= styled.div`
height:15%;
margin-top:2%;
display:flex;
justify-content:center;

input{
    width:70%;
    height:50%;
    border-radius:10px;
    border:1px solid var(--primary-color);
    padding-left:10px;
    outline:none; 
}
button{
    width:5%;
    height:50%;
    background-color:var(--secondary-color);
    margin-left:3%;
    border-radius:20%;
    display:flex;
    align-items:center;
    justify-content:center;
}

`
const MessageBot = styled.div`
width:85%;
height:auto;
padding:20px;
background-color:white;
border:2px solid var(--primary-color);
border-radius:10px;
`
const MessageInput = styled.div`
width:90%;
height:auto;
padding:20px;
background-color:yellow;
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
    const[message , setMessage]=useState([{message:'how may i help',role:'bot'}])
    const[patient , setPatient]=useState('Please Select Patient')

    const handleChange = (e) => {
        setQuery(e.target.value)
    }
    const handleSend = () => {
        if(query.trim() !== ''){
            setMessage([...message,{message:query.trim() , role:'human'}])
            setQuery({message:'',role:'human'})
        }
    }
   

    return (
    <Wrapper>
        <Patients>
        <div className='title'>Patients</div>
            <PatientListwrapper>
                {
                    PatientArr.map((p)=>(
                        
                        <PatientCard name={p.name} onClick={() => setPatient(p.name)}></PatientCard>
                        
                       
                    ))
                }
            </PatientListwrapper>
        </Patients>


        <ChatWrapper>
        <ChatContent>
        <div className='patientName'>{patient}</div>
            {
                message.map((ans)=>(
                    ans.role === 'bot'?
                    (<MessageBot>
                    {ans.message}
                    </MessageBot>):

                    (<MessageInput>
                    {ans.message}
                    </MessageInput>)
                ))
            }
        </ChatContent>

        <ChatInput>
        <input value={query.message} onChange={handleChange} placeholder='Enter your query'></input>
        <button onClick={handleSend}><SendIcon style={{ color: 'white' }}/></button>
        </ChatInput>
            
        </ChatWrapper>

     </Wrapper>
  )
}

export default ChatApp
