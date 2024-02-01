import React from 'react'
import UploadFiles from '../components/DragDrop'
import styled from 'styled-components'


const Wrapper = styled.div`
width:100%;
height:100vh;
display:flex;
flex-direction:column;
align-items:center;
padding:5%;
.title{
  font-weight:700;
  font-size:3rem;
}
`
const DropPage = () => {
  return (
    <Wrapper>
    <div className='title'>Document Upload</div>
      <UploadFiles/>
    </Wrapper>
  )
}

export default DropPage
