function calculateOnce(data) {
    // Calculate new rating for each team
    data.forEach(team => {
        let expectedWins = parseFloat(0);
        let expectedLosses = parseFloat(0);

        // Get expected wins and losses against each opponent using current ratings
        team.opponents.forEach(opponent => {
            let oppTeam = data.filter(x => x.name === opponent.name)[0];
            let winAB = team.rating * (1 - oppTeam.rating);
            let winBA = oppTeam.rating * (1 - team.rating);
            let winProb = winAB / (winAB + winBA);
            expectedWins = expectedWins + (winProb * (opponent.wins + opponent.losses + opponent.ties));
            expectedLosses = expectedLosses + ((1 - winProb) * (opponent.wins + opponent.losses + opponent.ties));
        });
        
        // Calculate overall expected winning percentage
        let expWinPct = expectedWins / (expectedWins + expectedLosses);

        // Calculate strength of schedule ("average" opponent rating, for which the team rating and opponent rating
        // result in a win probability equal to the expected winning percentage)
        team.sos = (1 - expWinPct) / (1 - (2 * expWinPct) + (expWinPct / team.rating));

        // Get updated team rating using the actual winning percentage and the strength of schedule rating
        team.newRtg = (team.sos * team.adjWinPct) / (1 - team.sos - team.adjWinPct + (2 * team.sos * team.adjWinPct));
    });

    // Replace each team rating with the updated rating
    data.forEach(team => team.rating = team.newRtg);
    return data;
}

function processData(rawData, numCycles, nullGames, useNullOpp) {
    console.log(rawData);
    
    // ROW AND COLUMN VALIDITY CHECKS
    // Data has 3 columns
    if (rawData.columns.length !== 3) {
        let html = "<b>Invalid file:</b> File must 3 columns - Winner, Loser, and Tie";
        d3.select("#result").html(html);
        return;
    }

    // Correct column labels
    if (rawData.columns[0] !== "Winner" || rawData.columns[1] !== "Loser" || rawData.columns[2] !== "Tie") {
        let html = `<b>Invalid file:</b> The column labels must be Winner, Loser, and Tie`;
        d3.select("#result").html(html);
        return;
    }

    // Each row must have a winner and a loser
    for (let i = 0; i < rawData.length; i++) {
        if (rawData[i].Winner === "" || rawData[i].Loser === "") {
            let html = `<b>Invalid file:</b> Each row must have a winner and a loser`;
            d3.select("#result").html(html);
            return;
        }
    }

    // PUT DATA INTO MORE USABLE FORMAT
    let data = [];

    // If using the null opponent model, create the null team
    if(useNullOpp && nullGames > 0) {
        data.push({
            name: "Null",
            rating: parseFloat(0),
            wins: parseFloat(0),
            losses: parseFloat(0),
            ties: parseFloat(0),
            winPct: parseFloat(0),
            adjWinPct: parseFloat(0),
            sos: parseFloat(0),
            newRtg: parseFloat(0),
            opponents: []
        });
    }

    // Incorporate the winner and loser from each row into the data array
    rawData.forEach(row => {
        
        // Check if the winner already has an entry in the array, and if so, use that
        let winnerIdx = data.findIndex(x => x.name === row.Winner);
        if(winnerIdx !== -1) {
            
            // Check if the loser is in the list of the winner's opponents, and if so, use that
            let loserIdx = data[winnerIdx].opponents.findIndex(x => x.name === row.Loser);
            if(loserIdx !== -1) {
                
                // Add win or tie to that matchup
                if (row.Tie === "") {
                    data[winnerIdx].opponents[loserIdx].wins += 1;
                }
                else {
                    data[winnerIdx].opponents[loserIdx].ties += 1;
                }
            }

            else {
                // Create the matchup
                if (row.Tie === "") {
                    data[winnerIdx].opponents.push({
                        name: row.Loser,
                        wins: parseFloat(1),
                        losses: parseFloat(0),
                        ties: parseFloat(0)
                    });
                }
                else {
                    data[winnerIdx].opponents.push({
                        name: row.Loser,
                        wins: parseFloat(0),
                        losses: parseFloat(0),
                        ties: parseFloat(1)
                    });
                }
            }
        }

        // If the winner doesn't have an entry in the data array, create it
        else {
            let opponents = [];
            
            if (useNullOpp && nullGames > 0) {
                opponents.push({
                    name: "Null",
                    wins: parseFloat(0),
                    losses: parseFloat(0),
                    ties: parseFloat(nullGames)
                });

                data[0].opponents.push({
                    name: row.Winner,
                    wins: parseFloat(0),
                    losses: parseFloat(0),
                    ties: parseFloat(nullGames)
                });
            }
            
            if (row.Tie === "") {
                opponents.push({
                    name: row.Loser,
                    wins: parseFloat(1),
                    losses: parseFloat(0),
                    ties: parseFloat(0)
                });
            }

            else {
                opponents.push({
                    name: row.Loser,
                    wins: parseFloat(0),
                    losses: parseFloat(0),
                    ties: parseFloat(1)
                });
            }
            
            data.push({
                name: row.Winner,
                rating: parseFloat(0),
                wins: parseFloat(0),
                losses: parseFloat(0),
                ties: parseFloat(0),
                winPct: parseFloat(0),
                adjWinPct: parseFloat(0),
                sos: parseFloat(0),
                newRtg: parseFloat(0),
                opponents: opponents
            });
        }
        
        // Do the same thing but for the loser
        loserIdx = data.findIndex(x => x.name === row.Loser);
        if(loserIdx !== -1) {
            winnerIdx = data[loserIdx].opponents.findIndex(x => x.name === row.Winner);
            if(winnerIdx !== -1) {
                if (row.Tie === "") {
                    data[loserIdx].opponents[winnerIdx].losses += 1;
                }
                else {
                    data[loserIdx].opponents[winnerIdx].ties += 1;
                }
            }

            else {
                if (row.Tie === "") {
                    data[loserIdx].opponents.push({
                        name: row.Winner,
                        wins: parseFloat(0),
                        losses: parseFloat(1),
                        ties: parseFloat(0)
                    });
                }
                else {
                    data[loserIdx].opponents.push({
                        name: row.Winner,
                        wins: parseFloat(0),
                        losses: parseFloat(0),
                        ties: parseFloat(1)
                    });
                }
            }
        }

        else {
            let opponents = [];
            
            if (useNullOpp && nullGames > 0) {
                opponents.push({
                    name: "Null",
                    wins: parseFloat(0),
                    losses: parseFloat(0),
                    ties: parseFloat(nullGames)
                });

                data[0].opponents.push({
                    name: row.Loser,
                    wins: parseFloat(0),
                    losses: parseFloat(0),
                    ties: parseFloat(nullGames)
                });
            }
            
            if (row.Tie === "") {
                opponents.push({
                    name: row.Winner,
                    wins: parseFloat(0),
                    losses: parseFloat(1),
                    ties: parseFloat(0)
                });
            }

            else {
                opponents.push({
                    name: row.Winner,
                    wins: parseFloat(0),
                    losses: parseFloat(0),
                    ties: parseFloat(1)
                });
            }
            
            data.push({
                name: row.Loser,
                rating: parseFloat(0),
                wins: parseFloat(0),
                losses: parseFloat(0),
                ties: parseFloat(0),
                winPct: parseFloat(0),
                adjWinPct: parseFloat(0),
                sos: parseFloat(0),
                newRtg: parseFloat(0),
                opponents: opponents
            });
        }
    });

    // Calculate wins and losses for each team
    data.forEach(team => {
        let adjWins = 0;
        let adjLosses = 0;
        
        if(useNullOpp) {
            team.wins = team.opponents.filter(x => x.name !== "Null").map(x => x.wins).reduce((a, b) => a + b, parseFloat(0));
            team.losses = team.opponents.filter(x => x.name !== "Null").map(x => x.losses).reduce((a, b) => a + b, parseFloat(0));
            team.ties = team.opponents.filter(x => x.name !== "Null").map(x => x.ties).reduce((a, b) => a + b, parseFloat(0));
            adjWins = team.opponents.map(x => x.wins).reduce((a, b) => a + b, parseFloat(0));
            adjWins = adjWins + (team.opponents.map(x => x.ties).reduce((a, b) => a + b, parseFloat(0))) * 0.5;
            adjLosses = team.opponents.map(x => x.losses).reduce((a, b) => a + b, parseFloat(0));
            adjLosses = adjLosses + (team.opponents.map(x => x.ties).reduce((a, b) => a + b, parseFloat(0))) * 0.5;
        }

        else {
            team.wins = team.opponents.map(x => x.wins).reduce((a, b) => a + b, parseFloat(0));
            team.losses = team.opponents.map(x => x.losses).reduce((a, b) => a + b, parseFloat(0));
            team.ties = team.opponents.map(x => x.ties).reduce((a, b) => a + b, parseFloat(0));
            adjWins = team.wins + team.ties * 0.5 + parseFloat(nullGames) * 0.5;
            adjLosses = team.losses + team.ties * 0.5 + parseFloat(nullGames) * 0.5;
        }

        // If team has zero total wins or zero total losses, throw an error (this is technically a valid configuration,
        // the log5 model just doesn't handle these cases well)
        if (adjWins === 0) {
            let html = `<b>Invalid file:</b> Each competitor must have more than zero total wins and zero total losses,
                after null games are added in. ${team.name} currently has zero total wins.`
            d3.select("#result").html(html);
            return;
        }

        if (adjLosses === 0) {
            let html = `<b>Invalid file:</b> Each competitor must have more than zero total wins and zero total losses.
                after null games are added in. ${team.name} currently has zero total losses.`
            d3.select("#result").html(html);
            return;
        }

        // Calculate winning percentage and use it as a default rating
        team.winPct = (team.wins + team.ties * 0.5) / (team.wins + team.losses + team.ties);
        team.adjWinPct = adjWins / (adjWins + adjLosses);
        team.rating = team.adjWinPct;
    });

    console.log(data);

    // Do rating calculation an arbitrarily large number of times
    for (let i = 0; i < numCycles; i++) {
        data = calculateOnce(data);
        console.log(data);
    }

    // Sort by rating
    data.sort((a, b) => b.rating - a.rating);
    
    // Write column headers
    let html = `<table>
                    <tr>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Ties</th>
                        <th>Win Pct</th>
                        <th>Adj Win Pct</th>
                        <th>SOS</th>
                    </tr>`;

    // Write each row of data
    data.forEach(team => {
        html = `${html}
                <tr>
                    <td>${team.name}</td>
                    <td>${team.rating.toFixed(3)}</td>
                    <td>${Math.round(team.wins * 1000) / parseFloat(1000)}</td>
                    <td>${Math.round(team.losses * 1000) / parseFloat(1000)}</td>
                    <td>${Math.round(team.ties * 1000) / parseFloat(1000)}</td>
                    <td>${team.winPct.toFixed(3)}</td>
                    <td>${team.adjWinPct.toFixed(3)}</td>
                    <td>${team.sos.toFixed(3)}</td>
                </tr>`
    });

    html = html + "</table>";

    d3.select("#result").html(html);
    return;
}

function loadFile() {
    var file = document.getElementById('uploadButton').files[0];
    var numCycles = document.getElementById('numCycles').value;
    var nullGames = document.getElementById('nullGames').value;
    var useNullOpp = document.getElementById('nullOpp').checked;
    var extension = file.name.split('.').pop();
    console.log(extension);
    let url = window.URL.createObjectURL(file);
    console.log(url);

    if (extension === "csv") {
        d3.csv(url, function(error, data) {
            if (error) {
                URL.revokeObjectURL(url);
                console.log(error);
            }
            else {
                URL.revokeObjectURL(url);
                processData(data, numCycles, nullGames, useNullOpp);
            }
        })
    }

    else if (extension === "tsv") {
        d3.tsv(url, function(error, data) {
            if (error) {
                URL.revokeObjectURL(url);
                console.log(error);
            }
            else {
                URL.revokeObjectURL(url);
                processData(data, numCycles, nullGames, useNullOpp);
            }
        })
    }

    else {
        console.log("Wrong file extension")
    }

    URL.revokeObjectURL(url);

}