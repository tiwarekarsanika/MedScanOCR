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
const MessageBot = styled.div`
width:90%;
height:auto;
padding:20px;
background-color:red;
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
    const [query , setQuery]=useState({message:'',role:'human'})
    const[message , setMessage]=useState([{message:'how may i help',role:'bot'}])

    const handleChange = (e) => {
        setQuery(e.target.value)
    }
    const handleSend = () => {
        if(query.trim() !== ''){
            setMessage([...message,{message:query.trim() , role:'human'}])
            setQuery('')
        }
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
                message.map((ans)=>(
                    ans.role === 'bot'?(<MessageBot>{ans.message}</MessageBot>):(<MessageInput>{ans.message}</MessageInput>)
                ))

            }
        </ChatContent>

        <ChatInput>
        <input value={query} onChange={handleChange}></input>
        <button onClick={handleSend}>click</button>
        </ChatInput>
            
        </ChatWrapper>

     </Wrapper>
  )
}

export default ChatApp
