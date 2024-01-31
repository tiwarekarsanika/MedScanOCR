import React from 'react'
import styled from 'styled-components'
// import stepper from '../../assets/imgs/stepper.png'
// import earthquake from '../../assets/imgs/earthquake.jpg'

const Wrapper = styled.div`
  width: 80%;
  height: 35rem;
  display: flex;
  flex-direction: column;
  margin-top: 4%;
`

const Container = styled.div`
  width: 100%;
  height: 30rem;
  display: flex;
  margin-top: 1%;
`
const ServiceTitle = styled.div`
  width: 90%;
  font-weight: 500;
  font-size: 0.8rem;
  color: var(--secondary-color);
`
const ServiceTitleDesc = styled.div`
  width: 90%;
  font-weight: 800;
  font-size: 2.3rem;
  color: var(--primary-color);
`
const Stepper = styled.div`
  flex: 2.5;
  height: 100;
  display: flex;
`
const StepperHolder = styled.div`
  height: 100%;
  display: flex;
  margin-left: 8%;
`
const StepperImg = styled.img`
  height: 100%;
`
const StepperContent = styled.div`
  width: 80%;
  height: 100%;
  margin-left: 4%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const StepperContentScript = styled.div`
  width: 100%;
  height: 12%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    font-size: 1.5rem;
    font-weight: 800;
  }
  .desc {
    color: grey;
    font-size: 1rem;
    font-weight: 500;
  }
`
const TestimonialWrapper = styled.div`
  flex: 4;
  display: flex;
  justify-content:center;
  position:relative;
  .testcontainer{
    width:100%;
    height:100%;
    z-index:2;
    display:flex;
    position:absolute;
  }

`
const TestimonialColumn = styled.div`
  flex: 1;
  display: flex;

  flex-direction: column;
  z-index:2;
  align-items: center;
  .two {
    margin-top: 60%;
  }
`
const TestimonialCard = styled.div`
  width: 93%;
  height: 70%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  ${'' /* border: 2px solid var(--secondary-color); */}
  overflow: hidden;
  box-shadow: 0 0 20px hsl(0, 0%, 81%);
  background-color:white;
`
const TestimonialImg = styled.img`
  width: 100%;
  height: 45%;
  background-color: yellow;
`
const TestimonialDesc = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  padding: 5%;

  .location {
    font-weight: 800;
    font-size: 0.9rem;
    color: var(--secondary-color);
  }
  .title {
    font-weight: 700;
    font-size: 1rem;
    color: var(--primary-color);
  }
  .info {
    font-weight: 500;
    font-size: 0.8rem;
    margin-top: 3%;
    color: grey;
  }
  .bar {
    width: 100%;
    height: 3%;
    background-color: #d6eef9;
    margin-top: 5%;
    border-radius: 20px;
    overflow: hidden;
  }
  .filled {
    width: 80%;
    height: 100%;
    background-color: var(--secondary-color);
  }
  .raised {
    margin-top: 2%;
    font-weight: 500;
    font-size: 0.9rem;
    span {
      font-weight: 800;
      font-size: 1rem;
      color: var(--primary-color);
    }
  }
`

const ProBono = () => {
  return (
    <Wrapper>
      <ServiceTitle>LEGAL AID</ServiceTitle>
      {/* <ServiceTitleDesc>Apply for Legal-Aid</ServiceTitleDesc> */}

      <Container>
        <TestimonialWrapper>
          <div class='relative w-full max-w-lg'>
            <div class='absolute top-5 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
            <div class='absolute top-4 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
            <div class='absolute top-60 left-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
            <div class='absolute top-40 left-60 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
          </div>

          <div className='testcontainer'>
          <TestimonialColumn>
            <TestimonialCard>
              {/* <TestimonialImg src={earthquake} /> */}
              <TestimonialDesc>
                <div className='location'>MUMBAI , MH</div>
                <div className='title'>Earthquake Disaster</div>
                <div className='info'>
                  fasdfasdfs asdfadsf adsflaksjdf a;lsdfjas a;sldkfj als
                  klfasjdfasldkf fas;df
                </div>
                <div className='bar'>
                  <div className='filled'></div>
                </div>
                <div className='raised'>
                  <span>$1000 raised of </span> $200000
                </div>
              </TestimonialDesc>
            </TestimonialCard>
          </TestimonialColumn>

          <TestimonialColumn>
            <TestimonialCard className='two'>
              {/* <TestimonialImg src={earthquake} /> */}
              <TestimonialDesc>
                <div className='location'>MUMBAI , MH</div>
                <div className='title'>Earthquake Disaster</div>
                <div className='info'>
                  fasdfasdfs asdfadsf adsflaksjdf a;lsdfjas a;sldkfj als
                  klfasjdfasldkf fas;df
                </div>
                <div className='bar'>
                  <div className='filled'></div>
                </div>
                <div className='raised'>
                  <span>$1000 raised of </span> $200000
                </div>
              </TestimonialDesc>
            </TestimonialCard>
          </TestimonialColumn>

          <TestimonialColumn>
            <TestimonialCard>
              {/* <TestimonialImg src={earthquake} /> */}
              <TestimonialDesc>
                <div className='location'>MUMBAI , MH</div>
                <div className='title'>Earthquake Disaster</div>
                <div className='info'>
                  fasdfasdfs asdfadsf adsflaksjdf a;lsdfjas a;sldkfj als
                  klfasjdfasldkf fas;df
                </div>
                <div className='bar'>
                  <div className='filled'></div>
                </div>
                <div className='raised'>
                  <span>$1000 raised of </span> $200000
                </div>
              </TestimonialDesc>
            </TestimonialCard>
          </TestimonialColumn>
          </div>
        </TestimonialWrapper>
  
        <Stepper>
          <StepperHolder>
            {/* <StepperImg src={stepper} /> */}
          </StepperHolder>
          <StepperContent>
            <StepperContentScript>
              <div className='title'>Apply for Pro-Bono status</div>
              <div className='desc'>Fill out case details and files.</div>
            </StepperContentScript>

            <StepperContentScript>
              <div className='title'>Case authorization </div>
              <div className='desc'>Tests to check validity of case.</div>
            </StepperContentScript>

            <StepperContentScript>
              <div className='title'>Enable Crowd-funding</div>
              <div className='desc'>Post authorization of case.</div>
            </StepperContentScript>
          </StepperContent>
        </Stepper>
      </Container>
    </Wrapper>
  )
}

export default ProBono
