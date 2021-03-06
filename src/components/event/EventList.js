import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"

export const EventList = (props) => {
    const { events, getEvents } = useContext(EventContext)

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
                  
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    props.history.push({ pathname: "/events/new" })
                }}
            >Create New Event</button>
            <header className="events__header">
                <h1>Level Up Game Events</h1>
            </header>
            {
                events.map(event => {
                    return <section key={event.id} className="registration">
                        <div className="registration__game">{event.game.title}</div>
                        <div>{event.description}</div>
                        <div>{event.date}</div>
                        <div>
                            {/* {
                                new Date({event.date}).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) */}
                              {event.time}
                            
                        </div>
                    </section>
                })
            }
        </article >
    )
}