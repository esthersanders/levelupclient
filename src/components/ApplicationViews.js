import React from "react"
import { Route } from "react-router-dom"
import { GameProvider } from "./game/GameProvider"
import { GameList } from "./game/GameList"
import { EventProvider } from "./event/EventProvider"
import { EventList } from "./event/EventList"
import { GameForm } from "./game/GameForm"
import { EventForm } from "./event/EventForm"
import { ProfileProvider } from "./auth/ProfileProvider"
import { Profile } from "./auth/Profile"


export const ApplicationViews = (props) => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>


            <GameProvider>
                <Route exact path="/games">
                    <GameList {...props} />
                </Route>
                <Route exact path="/games/new" render={props => <GameForm {...props} />} />
            </GameProvider>

            <EventProvider>
                <GameProvider>
                    <Route exact path="/events">
                        <EventList {...props} />
                    </Route>
                    <Route exact path="/events/new" render={props => <EventForm {...props} />} />
                </GameProvider>
            </EventProvider>
            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </ProfileProvider>
        </main>
    </>
}
