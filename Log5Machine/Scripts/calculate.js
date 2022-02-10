function calculateOnce(data) {
    // Calculate new rating for each team
    data.forEach(team => {
        let expectedWins = 0;
        let expectedLosses = 0;

        // Get expected wins and losses against each opponent using current ratings
        team.opponents.forEach(opponent => {
            let oppTeam = data.filter(item => item.name === opponent.name)[0];
            let winAB = team.rating * (1 - oppTeam.rating);
            let winBA = oppTeam.rating * (1 - team.rating);
            let winProb = winAB / (winAB + winBA);
            expectedWins = expectedWins + (winProb * (opponent.wins + opponent.losses));
            expectedLosses = expectedLosses + ((1 - winProb) * (opponent.wins + opponent.losses));
        });
        
        // Calculate overall expected winning percentage
        let expWinPct = expectedWins / (expectedWins + expectedLosses);

        // Calculate strength of schedule ("average" opponent rating, for which the team rating and opponent rating
        // result in a win probability equal to the expected winning percentage)
        team.sos = (1 - expWinPct) / (1 - (2 * expWinPct) + (expWinPct / team.rating));

        // Get updated team rating using the actual winning percentage and the strength of schedule rating
        team.newRtg = (team.sos * team.winPct) / (1 - team.sos - team.winPct + (2 * team.sos * team.winPct));
    });

    // Replace each team rating with the updated rating
    data.forEach(team => team.rating = team.newRtg);
    return data;
}

function processData(rawData) {
    console.log(rawData);
    // ROW AND COLUMN VALIDITY CHECKS
    // Row 1, Cell 1 is not blank
    if (rawData.columns[0].length === 0) {
        let html = "<b>Invalid file:</b> Row 1, cell 1 cannot be blank";
        d3.select("#result").html(html);
        return;
    }
    // Equal number of rows and columns
    if (rawData.length !== rawData.columns.length - 1) {
        let html = `<b>Invalid file:</b> The number of rows must equal the number of columns.
                    The file you uploaded has ${rawData.length + 1} rows and ${rawData.columns.length} columns.`;
        d3.select("#result").html(html);
        return;
    }
    // Row labels match the column labels
    for (let i = 0; i < rawData.length; i++) {
        if (rawData[i][rawData.columns[0]] !== rawData.columns[i + 1]) {
            let html = `<b>Invalid file:</b> The label for each row must match the label for its corresponding column.
                        Row number ${i + 2} (${rawData[i][rawData.columns[0]]}) and column number ${i + 2}
                        (${rawData.columns[i + 1]}) do not match.`;
            d3.select("#result").html(html);
            return;
        }
    }

    // No duplicate rows or columns
    // https://stackoverflow.com/questions/49215358/checking-for-duplicate-strings-in-javascript-array
    let duplicates = rawData.columns.filter((item, index) => rawData.columns.indexOf(item) !== index);
    if (duplicates.length > 0) {
        let html = `<b>Invalid file:</b> Rows cannot have duplicate labels.
                    The following rows appear more than once:<br>`
        duplicates.forEach(item => html = html + `<br>${item}`);
        d3.select("#result").html(html);
        return;
    }

    // PUT DATA INTO MORE USABLE FORMAT
    let data = [];

    // For each team, create an array item with its name and a blank list of opponents
    rawData.forEach(row => {
        data.push({
            name: row[rawData.columns[0]],
            rating: 0,
            wins: 0,
            losses: 0,
            winPct: 0,
            sos: 0,
            newRtg: 0,
            opponents: []
        });
        
        // Add in the opponents, along with wins and losses against the opponent
        rawData.columns.filter(item => item !== rawData.columns[0]).forEach(column => {
            data.filter(item => item.name === row[rawData.columns[0]])[0].opponents.push({
                name: column,
                wins: Number(row[column]),
                losses: Number(rawData.filter(item => item[rawData.columns[0]] === column)[0][row[rawData.columns[0]]])
            });
        });
    });

    // Calculate wins and losses for each team
    data.forEach(team => {
        team.opponents.forEach(opponent => {
            // If matchup has a negative number of wins, throw an error
            if (opponent.wins < 0) {
                let html = `<b>Invalid file:</b> No matchup can have a negative number of wins.
                    ${team.name} has ${opponent.wins} against ${opponent.name}.`
                d3.select("#result").html(html);
                return;
            }

            if (opponent.losses < 0) {
                let html = `<b>Invalid file:</b> No matchup can have a negative number of wins.
                    ${opponent.name} has ${opponent.losses} against ${team.name}.`
                d3.select("#result").html(html);
                return;
            }
            
            // If team has wins against itself, throw an error
            if ((opponent.name === team.name) && (opponent.wins + opponent.losses !== 0)) {
                let html = `<b>Invalid file:</b> No competitor can have a win against itself.
                    ${opponent.name} currently has ${opponent.wins} wins against itself.`
                d3.select("#result").html(html);
                return;
            }
            
            // Add wins and losses against this opponent to the team's wins and losses
            team.wins = team.wins + opponent.wins;
            team.losses = team.losses + opponent.losses;
        });
        
        // If team has zero total wins or zero total losses, throw an error (this is technically a valid configuration,
        // the log5 model just doesn't handle these cases well)
        if (team.wins === 0) {
            let html = `<b>Invalid file:</b> Each competitor must have more than zero total wins and zero total losses.
                ${team.name} currently has zero total wins.`
            d3.select("#result").html(html);
            return;
        }

        if (team.losses === 0) {
            let html = `<b>Invalid file:</b> Each competitor must have more than zero total wins and zero total losses.
                ${team.name} currently has zero total losses.`
            d3.select("#result").html(html);
            return;
        }
        
        // Calculate winning percentage and use it as a default rating
        team.winPct = parseFloat(team.wins) / (parseFloat(team.wins) + parseFloat(team.losses));
        team.rating = team.winPct;
    });

    console.log(data);

    // Do rating calculation an arbitrarily large number of times
    for (let i = 0; i < 1000; i++) {
        data = calculateOnce(data);
        console.log(data);
    }

    let html = `<table>
                    <tr>
                        <th>${rawData.columns[0]}</th>
                        <th>Rating</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Pct</th>
                        <th>SOS</th>
                    </tr>`;

    data.forEach(team => {
        html = `${html}
                <tr>
                    <td>${team.name}</td>
                    <td>${team.rating.toFixed(3)}</td>
                    <td>${Math.round(team.wins * 1000) / parseFloat(1000)}</td>
                    <td>${Math.round(team.losses * 1000) / parseFloat(1000)}</td>
                    <td>${team.winPct.toFixed(3)}</td>
                    <td>${team.sos.toFixed(3)}</td>
                </tr>`
    });

    html = html + "</table>";

    d3.select("#result").html(html);
    return;
}

function loadFile() {      
    var file = document.getElementById('uploadButton').files[0];
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
                processData(data);
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
                processData(data);
            }
        })
    }

    else {
        console.log("Wrong file extension")
    }

    URL.revokeObjectURL(url);

    
}