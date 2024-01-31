import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send'
import PatientCard from '../components/PatientCard'
import logo from '../assets/logo2.png'

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
`
const Patients = styled.div`
  height: 100;
  flex: 3;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 100%;
    font-size: 1.5rem;
    flex: 1;
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 2rem;
    margin-left: 10%;
    color: var(--primary-color);
  }
`
const PatientListwrapper = styled.div`
  width: 100%;
  flex: 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  max-height: 90%;
`

const ChatWrapper = styled.div`
  height: 100;
  flex: 10;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
`
const ChatContent = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4%;
  overflow: auto;

  .patientName {
    font-weight: 700;
    font-size: 2.3rem;
    width: 85%;
    margin-bottom: 0.5%;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const ChatInput = styled.div`
  height: 15%;
  margin-top: 2%;
  display: flex;
  justify-content: center;

 textarea {
    width: 70%;
    height: 50%;
    border-radius: 10px;
    border: 1px solid var(--primary-color);
    padding: 10px;
    outline: none;
    overflow: hidden;
    white-space: pre-wrap; 
    overflow-wrap: break-word;
   
    resize:none
  } 
  

  button {
    width: 5%;
    height: 50%;
    background-color: var(--secondary-color);
    margin-left: 3%;
    border-radius: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const MessageBot = styled.div`
  width: 85%;
  height: auto;
  padding: 20px;
  background-color: white;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  display: flex;
  align-items: center;
  white-space: pre-wrap; 
  overflow-wrap: break-word;

  img {
    margin-right: 20px;
    height: 30px;
    width: 50px;
  }
`
const MessageInput = styled.div`
  width: 85%;
  height: auto;
  padding: 20px;
  background-color: #c0e9fc;
  border-radius: 15px;
  margin-top: 2%;
  color: var(--primary-color);
  white-space: pre-wrap; 
  overflow-wrap: break-word;
`

const ChatApp = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/users', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data received is", data);
        setUsers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const [query, setQuery] = useState('')
  const [message, setMessage] = useState([
    { message: 'Please select a patient', role: 'bot' }
  ])
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    gender: ''
  })

  const handleChange = e => {
    setQuery(e.target.value)
  }
  const handleSend = () => {
    if (query.trim() !== '') {
      setMessage([...message, { message: query.trim(), role: 'human' }])
      setQuery('')
    }
  }
  useEffect(() => {
    patient.name !== ''
      ? setMessage([
        { message: `Ask me anything about ${patient.name}`, role: 'bot' }
      ])
      : setMessage([{ message: `Please select a Patient`, role: 'bot' }])
  }, [patient.name])

  return (
    <Wrapper>
      <Patients>
        <div className='title'>
          {' '}
          <img
            src={logo}
            style={{ height: '50px', width: '90px' }}
            alt='Logo'
          />
          Patients
        </div>
        <PatientListwrapper>
          {users.map(p => (
            <PatientCard
              name={p.name}
              age={p.age}
              gender={p.gender}
              onClick={() => {
                setPatient({
                  name: p.name,
                  age: p.age,
                  gender: p.gender
                })
              }}
            ></PatientCard>
          ))}
        </PatientListwrapper>
      </Patients>

      <ChatWrapper>
        <ChatContent>
          {patient.age !== '' && (
            <div
              className='patientName'
              style={{ whiteSpace: 'pre' }}
            >{`${patient.name}     Age: ${patient.age}     Gender: ${patient.gender}`}</div>
          )}
          {message.map(ans =>
            ans.role === 'bot' ? (
              <MessageBot>
                <img src={logo}></img>
                {ans.message}
              </MessageBot>
            ) : (
              <MessageInput>{ans.message}</MessageInput>
            )
          )}
        </ChatContent>

        <ChatInput>
          {/* <TextareaAutosize value={query} minRows={3} maxRows={3} className='textarea' onChange={handleChange} /> */}

          <textarea onChange={handleChange} value={query}>
            Enter your query
          </textarea>
          <button onClick={handleSend}>
            <SendIcon style={{ color: 'white' }} />
          </button>
        </ChatInput>
      </ChatWrapper>
    </Wrapper>
  )
}

export default ChatApp