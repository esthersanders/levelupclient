import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { EventContext } from "../event/EventProvider"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    const { events, getEvents} = useContext(EventContext)

    useEffect(() => {
        getGames()
        getEvents()

    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    props.history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>

            {
                games.map(game => {
                    const gameEvents = events.filter(e => e.game.id === game.id)
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} </div>
                        <div className="game__edit">
                            <button className="btn btn-3"
                                    onClick={e => props.history.push(`/games/${game.id}/edit`)}
                                >Edit</button>
                        </div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <h4>Upcoming Events</h4>
                        {
                            events.filter(event => event.game.id === game.id)
                                .map(event => {
                                    return <div key={`gameEvent--${event.id}`}>
                                        {event.date} {event.time}
                                    </div>
                                })
                        }
                    
                    </section>
                })
            }
        </article>
    )
}