import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { GameContext } from "../game/GameProvider"


export const EventForm = props => {
    const { events, getEvents, createEvent } = useContext(EventContext)
    const { games, getGames} = useContext(GameContext)

    const [currentEvent, setEvent] = useState({
        organizer: 0,
        day: "",
        time: "",
        description: "",
        gameId: 0

    })

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newGamingEvent = Object.assign({}, currentEvent)          // Create copy
        newGamingEvent[event.target.name] = event.target.value    // Modify copy
        setEvent(newGamingEvent)                                 // Set copy as new state
    }


    useEffect(() => {
        // Get all existing games from API
        getGames()
    }, [])


    return (
        <form className="Form">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={currentEvent.gameId}
                        onChange={handleControlledInputChange}>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option value={game.id} key={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                   const event = {
                    organizer: parseInt(localStorage.getItem("lu_token")),
                    date: currentEvent.date,
                    description: currentEvent.description,
                    time: currentEvent.time,
                    gameId: parseInt(currentEvent.gameId)
                   }
                   createEvent(event)
                   props.history.push({ pathname: "/events" })

                    // Create the event
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
