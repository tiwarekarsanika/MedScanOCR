import React from 'react'
import Hero from './Hero'
import Services from './Services'
import ServiceDescription from './ServiceDescription'
import Probono from './Probono'

import styled from 'styled-components'

const HomeContent = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
`; // Add a closing backtick here

const Home = () => {
    return (
        <div>
            <Hero />
            <HomeContent>
                <Services/>
                <ServiceDescription/>
                <Probono/>
            </HomeContent>
        </div>
    )
}

export default Home
