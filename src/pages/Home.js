import React from 'react'
import Feed from '../components/Feed'
import Sidebar from '../components/sidebar/index'
import UseMediaQuery from '../components/Hooks/UseMediaQuery'
import Header from '../components/Navigation/Header'
import {Flex} from '../components/Styles/Styles'
function Home() {
    const matches = UseMediaQuery("(min-width:1100px)")
    return (
        <div id="home">
            <Header />
            <Flex direction="row" wrap>
                {matches ? <Sidebar sidebarWidth="home" /> : null}
                <Feed />
            </Flex> 
        </div>

    )
}
export default Home
