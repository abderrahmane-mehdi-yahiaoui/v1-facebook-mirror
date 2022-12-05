import React from 'react'
import { Redirect } from 'react-router-dom'
import Sidebar from '../components/sidebar/index'
import UseMediaQuery from '../components/Hooks/UseMediaQuery'
import Header from '../components/Navigation/Header';
function Bookmarks() {
    const matches = UseMediaQuery("(max-width:800px)");
    return (
        <>
        <Header />
            {matches ?
                <div className="f__bookmarksPage">
                    <Sidebar sidebarWidth="bookmarks"/>
                </div>
                : <Redirect to="/" />
            }
        </>
    )
}

export default Bookmarks
