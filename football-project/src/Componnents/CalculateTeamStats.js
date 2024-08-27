export const calculateTeamsStats = (currentTeamStats) => {
    const sorted =  currentTeamStats.slice().sort((team1, team2) => {
        if (team1.points === team2.points) {
            if (team1.goalsBalance === team2.goalsBalance) {
                if(team1.goalsFor===team2.goalsFor) {
                    return team1.name < team2.name ? -1 : 1;
                }
                return team1.goalsFor > team2.goalsFor ? -1 :1;
            }
            return team1.goalsBalance > team2.goalsBalance ? -1 : 1;
        }
        return team1.points > team2.points ? -1 : 1;
    })
    return (sorted)
}