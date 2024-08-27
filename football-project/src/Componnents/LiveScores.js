import {useEffect, useState} from "react";
import '../App.css';
import '../styling/livegames.css';
import axios from "axios";
import Cookies from "js-cookie";


 function LiveScores() {

     const [AllLiveGames, setAllLiveGames] = useState([]);

     useEffect(() => {
         getLiveGames();

         const interval = setInterval(() => {
             getLiveGames();
         }, 5000);
         return () => clearInterval(interval);
     }, []);


     async function getLiveGames () {
         await axios.get("http://localhost:8989/get-all-live-games").then(res => {
             setAllLiveGames(res.data)
         })
     }

     const groupByLeague = (games) => {
         const grouped = {};
         games.forEach((game) => {
             const leagueName = game.league.name;
             if (!grouped[leagueName]) {
                 grouped[leagueName] = [];
             }
             grouped[leagueName].push(game);
         });
         return grouped;
     };


     const checkToken=(item)=>{
         if(item.user.token===Cookies.get("token")){
             return "bold";
         }
     }

     const checkingHomeTeamColor=(item)=>{

         if(item.scoreHomeTeam > item.scoreAwayTeam){
             return "green";
         }
         else
         {
             if(item.scoreAwayTeam > item.scoreHomeTeam){
                return "red";
             }
             else {
                 return "blue";
             }
         }
     }

     const checkingAwayTeamColor=(item)=>{

         if(item.scoreAwayTeam > item.scoreHomeTeam){
             return "green";
         }
         else
         {
             if(item.scoreHomeTeam > item.scoreAwayTeam){
                 return "red";
             }
             else {
                 return "blue";
             }
         }
     }


     return (
         <div className="live-scores-container">
             {Object.entries(groupByLeague(AllLiveGames)).map(([league, games]) => (
                 <div key={league} className="league-container">
                     <div className="league-name">{league}</div>
                     {games.map((game, index) => (
                         <div key={index} className="game-row">
                             <div className="game-details">
                                 <div className="team">
                                     <img src={game.homeTeam.icon} alt={game.homeTeam.name} className="team-icon" />
                                     <span className="team-name" style={{color:checkingHomeTeamColor(game)}}>{game.homeTeam.name}</span>
                                 </div>
                                 <div className="score">{game.scoreHomeTeam} - {game.scoreAwayTeam}</div>
                                 <div className="team">
                                     <span className="team-name" style={{color:checkingAwayTeamColor(game)}}>{game.awayTeam.name}</span>
                                     <img src={game.awayTeam.icon} alt={game.awayTeam.name} className="team-icon" />
                                 </div>
                                 <div className="start-date">{game.startDate}</div>
                                 <div style={{fontWeight:checkToken(game)}} className="user">Created by: {game.user.username}</div>
                             </div>
                         </div>
                     ))}
                 </div>
             ))}
         </div>
     );
}

export default LiveScores;

