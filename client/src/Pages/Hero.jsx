import React from "react";

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PaidIcon from '@mui/icons-material/Paid';
import GavelIcon from '@mui/icons-material/Gavel';
import PlaceIcon from '@mui/icons-material/Place';
// import lawfirm from '../../assets/imgs/law-firm.png'
// import heroimg from '../../assets/imgs/heroimg.svg'
import styled from "styled-components";

const Wrapper=styled.div`
width:100%;
height:68vh;
display:flex;
justify-content:center;
align-items:center;
background-color:#e7f3f8;

`
const HeroContent=styled.div`
flex:4;
height:100%;
z-index:2;
display:flex;
flex-direction:column;
padding: 0 0;
span{
  width:60%;
  margin-left:15%;
  padding:none;
}
.herotitle{
  font-weight:900;
  font-size:5rem;
  margin-top:5%;
  background: linear-gradient(
        to right,
        #0D265C 10%,
        #0B98DA 30%,
        #0B98DA 70%,
        #0D265C 80%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    background-size: 300% auto;
    animation: textShine 5s ease-in-out infinite alternate;
    @keyframes textShine {
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 100% 50%;
    }
}
}
.tagline{
  font-weight:700;
  font-size:2.3rem;
  
  background: linear-gradient(
        to right,
        #0D265C 10%,
        #0B98DA 30%,
        #0B98DA 70%,
        #0D265C 80%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    background-size: 300% auto;
    animation: textShine 3s ease-in-out infinite alternate;
    @keyframes textShine {
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 100% 50%;
    }
}
}
.description{
  font-weight:500;
  font-size:1.2rem;
  margin-top:2%;
  color:grey;
}
`
const Tab = styled.div`
width:89%;
height:30%;
background-color:white;
margin:3% 0 0 15% ;
z-index:3;
border-radius:0 20px 20px;
display:flex;
flex-direction:column;
align-items:center;
box-shadow: 0 0 20px hsl(0, 0%, 81%);

`
const TopContainer=styled.div`
width:95%;
height:25%;
margin-top:1.5%;
display:flex;
align-items:center;
.title{
  font-weight:700;
  font-size:1.1rem;
  color:var(--primary-color);
}
.process{
  font-weight:500;
  font-size:0.85rem;
  margin-left:0.5%;
  color:grey;
}
button{
  margin-left:auto;
  border:2px solid var(--primary-color);
  background-color:var(--primary-color);
  color:white;
  border-radius:0 15px 15px;
  height:100%;
  width:15%;
  font-weight:600;
}
`
const BottomContainer=styled.div`
width:95%;
height:40%;
margin-top:2%;
display:flex;
justify-content:space-between;
`
const BottomElement=styled.div`
height:100%;
width:30%;
border-radius:10px;
border:2px solid  var(--secondary-color);
display:flex;
align-items:center;
`
const BottomeElementContent=styled.div`
display:flex;
flex-direction:column;
justify-content:center;
width:60%;
height:100%;
margin-left:3%;
.title{

  font-size:0.8rem;
  font-weight:500;
  color:grey;
}
.info{

  font-weight:700;
  font-size:0.9rem;
}
`
const HeroImgContainer=styled.div`
flex:3 ;
height:100%;
z-index:1;
position:relative;
display:flex;
justify-content:center;
overflow:hidden;
border-radius:0 0 0 50px;

`
const HeroImg = styled.div`
width:100%;
height:100%;
position:absolute;
z-index:4;

display:flex;
img{
margin-top:10%;
  width:110%;
  height:100%;
  object-fit:cover;
}
`
const Hero = () => {
  return (
    <Wrapper>
    <HeroContent>
      <span className="herotitle">JUSTICE</span>
      <span className="tagline">Now served at Home !</span>
      <span className="description"> Book Appointments with Legal Practitioners for all your Legal Needs</span>
      <Tab>
      <TopContainer>
        <div className="title">Book Appointment</div>
        <PersonSearchIcon className="icon" sx={{marginLeft:'3%',color:'grey'}}></PersonSearchIcon>
        <div className="process">Find Lawyers</div>

        <WatchLaterIcon sx={{marginLeft:'3%',color:'grey'}}></WatchLaterIcon>
        <div className="process">Choose Date & Time</div>

        <PaidIcon sx={{marginLeft:'3%',color:'grey'}}></PaidIcon>
        <div className="process">Pay</div>
        <button>Explore</button>
      </TopContainer>

      <BottomContainer>
        <BottomElement> 
           <GavelIcon sx={{fontSize:'2rem',margin:'8%',color:'var(--primary-color)'}}></GavelIcon>
            <BottomeElementContent>
              <div className="title">Category</div>
              <div className="info">Civil Litigation</div>
            </BottomeElementContent>
        </BottomElement>

        <BottomElement> 
           <PlaceIcon sx={{fontSize:'2rem',margin:'8%',color:'var(--primary-color)'}}></PlaceIcon>
            <BottomeElementContent>
              <div className="title">Location</div>
              <div className="info">Mumbai , MH</div>
            </BottomeElementContent>
        </BottomElement>
        <BottomElement> 
           <GavelIcon sx={{fontSize:'2rem',margin:'8%',color:'var(--primary-color)'}}></GavelIcon>
            <BottomeElementContent>
              <div className="title">Category</div>
              <div className="info">Civil Litigation</div>
            </BottomeElementContent>
        </BottomElement>
        
      </BottomContainer>
      </Tab>
    </HeroContent>

    <HeroImgContainer >
    <div class="relative w-full max-w-lg">
      <div class="absolute top-5 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div class="absolute top-4 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div class="absolute top-60 left-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div class="absolute top-40 left-60 w-72 h-72 bg-pink-300 ounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

    <HeroImg >
      {/* <img src={heroimg}></img> */}
    </HeroImg>
     
   </HeroImgContainer>
    </Wrapper>
 
  );
};

export default Hero;
