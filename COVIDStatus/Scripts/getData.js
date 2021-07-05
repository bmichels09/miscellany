states = [
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
]

function getDeathCount(dataSeries) {
    let currentTimestamp = Date.parse(new Date());
    let filterTimestamp = currentTimestamp - (15 * 86400000);
    let deaths = 0;
    dataSeries.forEach(data => {
        let dayTimestamp = Date.parse(data.date);
        if (dayTimestamp > filterTimestamp) {
            let dailyDeaths = data.newDeaths;
            if (dailyDeaths != null) {
                deaths = deaths + dailyDeaths;
            }
        }
    })
    return deaths;
}

function getColor(ddpm) {
    if (ddpm < parseFloat(0.3)) { return "rgb(0, 168, 84)"; }
    else if (ddpm < parseFloat(0.6)) { return "rgb(144, 224, 96)"; }
    else if (ddpm < parseFloat(0.9)) { return "rgb(255, 224, 96)"; }
    else { return "rgb(224, 64, 64)"; }
}

function getTooltip(stateName, deaths, ddpm) {
    return '<h3>'+ stateName + '</h3><hr><h4>Total deaths (last 14 days):&nbsp;' +
        deaths + '<br>Daily deaths/million:&nbsp;' + ddpm.toFixed(2) + '</h4>';
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
    let finalData = [];
    let errors = [];
    states.forEach(state => {
        let stateName = state.name;
        let stateAbbr = state.abbr;
        let statePop = state.population;
        let url = `https://api.covidactnow.org/v2/state/${stateAbbr}.timeseries.json?apiKey=${apiKey}`;
        axios.get(url)
            .then(response => {
                let days = response.data.actualsTimeseries
                let deaths = getDeathCount(days);
                let ddpm = parseFloat(1000000) * deaths / 14 / statePop;
                let color = getColor(ddpm);
                let tooltip = getTooltip(stateName, deaths, ddpm);
                setColorAndTooltip(stateAbbr, color, tooltip);
            })
            .catch(error => {
                console.log(error);
            });
    });
}

fillMap();
