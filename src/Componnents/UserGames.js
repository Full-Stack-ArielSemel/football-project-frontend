import {IoMdFootball} from "react-icons/io";
import axios from "axios";
import '../App.css';
import '../styling/leagues.css';
import '../styling/usergames.css'
import {useEffect, useState} from "react";

export default function UserGames(props) {

    const [LeagueByLeagueID, setLeagueByLeagueID] = useState([])
    const [scoredHomeGameId, setScoredHomeGameId] = useState(null);
    const [scoredAwayGameId, setScoredAwayGameId] = useState(null);

    useEffect(() => {

        axios.get("http://localhost:8989/get-league-by-league-id", {
            params: {
                leagueID: props.leagueID
            }
        }).then(res => {
            setLeagueByLeagueID(res.data)
        })
    }, [props.leagueID])


    const setScoreHomeTeam = (game_id) => {
        axios.post("http://localhost:8989/update-score-home-team", null, {
            params: {gameID: game_id}
        }).then(res => {
        })
        setScoredHomeGameId(game_id);
        setTimeout(() => {
            setScoredHomeGameId(null);
        }, 300);

    }

    const setScoreAwayTeam = (game_id) => {

        axios.post("http://localhost:8989/update-score-away-team", null, {
            params: {gameID: game_id}
        }).then(res => {
        })
        setScoredAwayGameId(game_id);
        setTimeout(() => {
            setScoredAwayGameId(null);
        }, 300);

    }

    const endGame = (gameID) => {

        const tempArray1 = props.LiveGames.filter(game => game.game_Id !== gameID);
        props.setLiveGames(tempArray1)
        const tempArray2 = props.userLiveGames.filter(game => game.game_Id !== gameID);
        props.setLiveUSerGames(tempArray2)

        axios.post("http://localhost:8989/end-game", null, {
            params: {
                gameID: gameID
            }
        }).then(res => {
        })
    }

    return (

        <div>

            {
                props.userLiveGames.length > 0 ?

                <div>

                    <div className={"header-user-list"}>Your Live Games (Total Games : {props.userLiveGames.length})</div>


                    <div className={"user-live-games-container"}>

                        {
                            props.userLiveGames.map((userGame, index) => {

                                return (

                                    <div className={"row-user-live-games"} key={userGame.game_Id}>

                                        <div>
                                            <IoMdFootball onClick={() => setScoreHomeTeam(userGame.game_Id)}
                                                          className={`ball-icon-btn ${scoredHomeGameId === userGame.game_Id ? 'goal-flash' : ''}`}/>
                                        </div>

                                        <div className={"row-user-home-team"}>
                                            <img className={"icon-team"} src={userGame.homeTeam.icon} alt={""}/>
                                            <div className={"name-team"}>{userGame.homeTeam.name}</div>
                                        </div>

                                        <div className={"vs"}>VS</div>

                                        <div className={"row-user-away-team"}>
                                            <div className={"name-team"}>{userGame.awayTeam.name}</div>
                                            <img className={"icon-team"} src={userGame.awayTeam.icon} alt={""}/>
                                        </div>

                                        <div>
                                            <IoMdFootball onClick={() => setScoreAwayTeam(userGame.game_Id)}
                                                          className={`ball-icon-btn ${scoredAwayGameId === userGame.game_Id ? 'goal-flash' : ''}`}/>
                                        </div>

                                        <h2 className={'user-game-result'}>({userGame.scoreHomeTeam}-{userGame.scoreAwayTeam})</h2>

                                        <button className={"EndGame"} onClick={() => endGame(userGame.game_Id)}>End Game</button>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                :
                <div className="EmptyGameList">your live games is empty</div>
            }

        </div>
    )
}