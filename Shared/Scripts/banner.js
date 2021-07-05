var qsParams = new URLSearchParams(window.location.search);
var pageHtml = "bob"

function getLeftPosition(){
    let position = parseFloat(d3.select("#homeButton").style("width"));
    position = position + parseFloat(d3.select("#homeButton").style("margin-left"));
    position = position + parseFloat(d3.select("#homeButton").style("margin-right"));
    position = position + "px";
    return position;
}

function onClickMenuButton(){
    let pageMenu = d3.select("#pageMenu");
    if (pageMenu.style("opacity") === "0") {
        d3.select("#menuButton")
            .html("&#x25BC; Select Page")    
            .style("background-color", "rgba(255, 255, 255, 0.2)");
        pageMenu.html(pageHtml)
            .style("position", "absolute")
            .style("top", d3.select("#bannerInner").style("height"))
            .style("left", getLeftPosition())
            .style("padding", "6px")
            .style("opacity", 1);
    }
    else {
        d3.select("#menuButton")
            .html("&#x25BA; Select Page")
            .style("background-color", null);
        pageMenu.html(null)
            .style("position", null)
            .style("top", null)
            .style("left", null)
            .style("padding", null)
            .style("opacity", 0);
    }
}

if (qsParams.has("nobanner") === false)
{
    var banner = d3.select("#banner");
    banner
        .style("box-shadow", "0 4px 2px -2px rgba(0, 0, 0, 0.3)")
        .style("position", "relative")
        .style("z-index", "1")
        .append("div").attr("id", "bannerInner");
    // banner.append("div").attr("id", "separator");

    var bannerInner = d3.select("#bannerInner");
    bannerInner.append("div")
        .attr("id", "pageMenu");
    bannerInner.append("button").html("Home")
        .attr("type", "button")
        .attr("id", "homeButton");
    bannerInner.append("button").html("&#x25BA; Select Page")
        .attr("type", "button")
        .attr("id", "menuButton")
        .attr("onclick", "onClickMenuButton()")
}