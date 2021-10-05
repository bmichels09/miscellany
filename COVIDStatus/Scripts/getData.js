var states = [
    {name: "Alabama", abbr: "AL", population: 5024279},
    {name: "Alaska", abbr: "AK", population: 733391},
    {name: "Arizona", abbr: "AZ", population: 7151502},
    {name: "Arkansas", abbr: "AR", population: 3011524},
    {name: "California", abbr: "CA", population: 39538223},
    {name: "Colorado", abbr: "CO", population: 5773714},
    {name: "Connecticut", abbr: "CT", population: 3605944},
    {name: "Delaware", abbr: "DE", population: 989948},
    {name: "Florida", abbr: "FL", population: 21538187},
    {name: "Georgia", abbr: "GA", population: 10711908},
    {name: "Hawaii", abbr: "HI", population: 1455271},
    {name: "Idaho", abbr: "ID", population: 1839106},
    {name: "Illinois", abbr: "IL", population: 12822739},
    {name: "Indiana", abbr: "IN", population: 6785528},
    {name: "Iowa", abbr: "IA", population: 3190369},
    {name: "Kansas", abbr: "KS", population: 2937880},
    {name: "Kentucky", abbr: "KY", population: 4505836},
    {name: "Louisiana", abbr: "LA", population: 4657757},
    {name: "Maine", abbr: "ME", population: 1362359},
    {name: "Maryland", abbr: "MD", population: 6177224},
    {name: "Massachusetts", abbr: "MA", population: 7029917},
    {name: "Michigan", abbr: "MI", population: 10077331},
    {name: "Minnesota", abbr: "MN", population: 5706494},
    {name: "Mississippi", abbr: "MS", population: 2961279},
    {name: "Missouri", abbr: "MO", population: 6154913},
    {name: "Montana", abbr: "MT", population: 1084225},
    {name: "Nebraska", abbr: "NE", population: 1961504},
    {name: "Nevada", abbr: "NV", population: 3104614},
    {name: "New Hampshire", abbr: "NH", population: 1377529},
    {name: "New Jersey", abbr: "NJ", population: 9288994},
    {name: "New Mexico", abbr: "NM", population: 2117522},
    {name: "New York", abbr: "NY", population: 20201249},
    {name: "North Carolina", abbr: "NC", population: 10439388},
    {name: "North Dakota", abbr: "ND", population: 779094},
    {name: "Ohio", abbr: "OH", population: 11799448},
    {name: "Oklahoma", abbr: "OK", population: 3959353},
    {name: "Oregon", abbr: "OR", population: 4237256},
    {name: "Pennsylvania", abbr: "PA", population: 13002700},
    {name: "Rhode Island", abbr: "RI", population: 1097379},
    {name: "South Carolina", abbr: "SC", population: 5118425},
    {name: "South Dakota", abbr: "SD", population: 886667},
    {name: "Tennessee", abbr: "TN", population: 6910840},
    {name: "Texas", abbr: "TX", population: 29145505},
    {name: "Utah", abbr: "UT", population: 3271616},
    {name: "Vermont", abbr: "VT", population: 643077},
    {name: "Virginia", abbr: "VA", population: 8631393},
    {name: "Washington", abbr: "WA", population: 7705281},
    {name: "West Virginia", abbr: "WV", population: 1793716},
    {name: "Wisconsin", abbr: "WI", population: 5893718},
    {name: "Wyoming", abbr: "WY", population: 576851},
    {name: "District of Columbia", abbr: "DC", population: 689545}
];

// Adjustment factors to estimate the population on July 1st of a given year.
// 2020 Census data is for 4/1/2020.
// So adj2019 is the US population on 7/1/2019 divided by the US population on 4/1/2020, and so on for the other years.
var censusData = {
    usPop: 331449281,
    adj2019: 0.9963114357,
    adj2020: 1.000257599,
    adj2021: 1.0030968298
};

function getDeathCount(dataSeries, endTimestamp) {
    let deaths = 0;
    let nullDays = 0;
    let startTimestamp = endTimestamp - (14 * 86400000);
    
    // Count the deaths for each day that's between 1 and 14 days ago, inclusive
    dataSeries.forEach(data => {
        let dataDate = new Date();
        dataDate.setFullYear(parseInt(data.date.substring(0, 4)));
        dataDate.setMonth(parseInt(data.date.substring(5, 7)) - 1);
        dataDate.setDate(parseInt(data.date.substring(8)));
        dataDate.setHours(0, 0, 0, 0);
        let dataTimestamp = dataDate.getTime();
        
        if (dataTimestamp >= startTimestamp && dataTimestamp < endTimestamp) {
            let dailyDeaths = data.newDeaths;
            if (dailyDeaths != null) {
                deaths = deaths + dailyDeaths;
            }
            else {
                // Count the number of null days to display in the map tooltip
                nullDays = nullDays + 1;
            }
        }
    })

    return {
        deaths: deaths,
        nullDays: nullDays
    };
}

function getEndTimestamp() {
    // Get the date parameter from the query string
    let qsParams = new URLSearchParams(window.location.search);
    let dateParam = qsParams.get("date");
    let endDate = new Date();

    console.log("dateParam = " + dateParam);

    // If the date parameter has a value, try to get a valid date from it
    if (dateParam !== undefined) {
        try {
            endDate.setFullYear(parseInt(dateParam.substring(0, 4)));
            endDate.setMonth(parseInt(dateParam.substring(4, 6)) - 1);
            endDate.setDate(parseInt(dateParam.substring(6)));
        }

        catch {
            // If the parameter specifies an invalid date, just use the current date
            endDate = new Date();
        }
    }

    // Set the time to midnight so it will match with dates in the Covid data
    endDate.setHours(0, 0, 0, 0);

    return endDate.getTime();
}

function getColor(ddpm) {
    if (ddpm < parseFloat(0.3)) { return "rgb(0, 168, 84)"; }
    else if (ddpm < parseFloat(0.6)) { return "rgb(144, 224, 96)"; }
    else if (ddpm < parseFloat(0.9)) { return "rgb(255, 224, 96)"; }
    else { return "rgb(224, 64, 64)"; }
}

function getTooltip(stateName, deaths, ddpm, nullDays) {
    return '<h3>'+ stateName + '</h3><hr><h4>Total deaths (last 14 days):&nbsp;' +
        deaths + '<br>Daily deaths/million:&nbsp;' + ddpm.toFixed(2) + '<br>Unrecorded days:&nbsp;' + nullDays + '</h4>';
}

function setColorAndTooltip(stateAbbr, color, tooltip) {
    function mouseOver(){
        d3.select("#tooltip").transition().duration(200).style("opacity", 1);
        
        d3.select("#tooltip").html(tooltip)
            .style("left", (d3.event.pageX + 28) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");
    }
    
    function mouseOut(){
        d3.select("#tooltip").transition().duration(500).style("opacity", 0);
    }

    d3.select("#state_" + stateAbbr)
        .style("fill", color)
        .on("mouseover", mouseOver).on("mouseout", mouseOut);
}

function fillMap() {
    let adjustment = 1;
    let endTimestamp = getEndTimestamp();
    
    // If the date in the query string is before 1/1/2021, use populations for July 2020.
    // Otherwise, use populations for July 2021.
    if (endTimestamp < 1609459200000) {
        adjustment = censusData.adj2020;
    }
    else {
        adjustment = censusData.adj2021;
    }

    states.forEach(state => {
        let stateName = state.name;
        let stateAbbr = state.abbr;
        let statePop = state.population;
        let url = `https://api.covidactnow.org/v2/state/${stateAbbr}.timeseries.json?apiKey=${apiKey}`;
        axios.get(url)
            .then(response => {
                let dataSeries = response.data.actualsTimeseries;
                let deathCount = getDeathCount(dataSeries, endTimestamp);
                let deaths = deathCount.deaths;
                let nullDays = deathCount.nullDays;
                let ddpm = parseFloat(1000000) * deaths / 14 / (statePop * parseFloat(adjustment));
                let color = getColor(ddpm);
                let tooltip = getTooltip(stateName, deaths, ddpm, nullDays);
                setColorAndTooltip(stateAbbr, color, tooltip);
            })
            .catch(error => {
                console.log(error);
            });
    });
}

fillMap();
