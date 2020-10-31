import React from 'react'
import EventCards from './EventCards'
import EventHeader from './EventHeader'
import SearchBox from "../../SearchBox"

export default function Events() {
    return (
        <div className="body-wrapper">
        <SearchBox />
        <EventHeader />
         <EventCards />
        </div>
    )
}
