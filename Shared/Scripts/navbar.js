/************************************************************
 * Name: navbar.js 
 * Description: A shared script that adds a navigation bar to
 *              pages in the bmichels09 universe.
 * 
 *              The nav bar will only display if the URL
 *              includes "navbar" in the query string.
 * 
 *              When creating new pages, include an empty div
 *              at the top with the id "navbar".  Then add
 *              the new page to the getItems function in this
 *              script.
 ************************************************************/

// Function to get the site information to show in the nav bar
function getItems() {
    let items = [
        {
            buttonId: "btn_home",
            text: "Home",
            url: "index.html"
        },
        {
            buttonId: "btn_pages",
            text: "Pages",
            items: [
                {
                    buttonId: "btn_covid",
                    text: "COVID Dashboard",
                    url: "covid_status.html?navbar"
                },
                {
                    buttonId: "btn_heightmap",
                    text: "Heightmap Generator",
                    url: "heightmap_generator.html?navbar"
                }
            ]
        },
        {
            buttonId: "btn_external",
            text: "External Pages",
            items: [
                {
                    buttonId: "btn_google",
                    text: "Google",
                    url: "https://www.google.com"
                },
                {
                    buttonId: "btn_bing",
                    text: "Bing",
                    url: "https://www.bing.com"
                }
            ]
        }
    ]

    return items;
}

// Function for opening/closing a menu in the nav bar
function onClickMenuButton(clickedButtonId) {
    let items = getItems();
    // let isClickedMenuOpen = (d3.select("#menu_" + clickedButtonId).length !== undefined);
    let xpos = 25;
    items.forEach(i => {
        // For each link button, just update the current X position and move on
        if (i.url !== undefined) {
            xpos = xpos + d3.select("#" + i.buttonId).node().getBoundingClientRect().width + 50;
        }
        else if (i.items !== undefined) {
            let isCurrentMenuOpen = (d3.select("#menu_" + i.buttonId).node() !== null);
            let wasCurrentMenuClicked = (i.buttonId === clickedButtonId);
            // If the menu we're looking at is open, close it
            if (isCurrentMenuOpen) {
                d3.select("#menu_" + i.buttonId).selectAll("*").remove();
                d3.select("#menu_" + i.buttonId).remove();
                d3.select("#" + i.buttonId)
                    .html("&#x25BA; " + i.text)
                    .style("background-color", null);
            }
            // If the menu we're looking at was closed and just got clicked, open it
            else if (wasCurrentMenuClicked) {
                d3.select("#" + i.buttonId)
                    .html("&#x25BC; " + i.text)
                    .style("background-color", "rgba(255, 255, 255, 0.2)")
                    .append("div")
                        .attr("type", "button")
                        .attr("class", "openMenu")
                        .attr("id", "menu_" + i.buttonId)
                        .style("position", "absolute")
                        .style("top", d3.select("#navbar").style("height"))
                        .style("left", xpos.toString() + "px");
                let menu = d3.select("#menu_" + i.buttonId);
                // Add the links into the menu box
                i.items.forEach(x => {
                    menu.append("button").html(x.text)
                        .attr("type", "button")
                        .attr("class", "menuLinkButton")
                        .attr("id", x.buttonId)
                        .attr("onclick", "location.href='" + x.url + "';");
                });
            }

            xpos = xpos + d3.select("#" + i.buttonId).node().getBoundingClientRect().width + 50;
        }
    });
}

// Check the query string for "navbar"
// If it's there, create the nav bar
var qsParams = new URLSearchParams(window.location.search);
if (qsParams.has("navbar"))
{
    // Select the navbar div and style it
    var navbar = d3.select("#navbar");
    navbar
        .style("box-shadow", "0 4px 2px -2px rgba(0, 0, 0, 0.3)")
        .style("position", "relative")
        .style("z-index", "1");
        //.append("div").attr("id", "navbarInner");

    // Get the menu items and add buttons for each one
    let items = getItems();
    items.forEach(i => {
        if (i.url !== undefined) {
            navbar.append("button").html(i.text)
                .attr("type", "button")
                .attr("class", "linkButton")
                .attr("id", i.buttonId)
                .attr("onclick", "location.href='" + i.url + "';");
        }

        else if (i.items !== undefined) {
            navbar.append("button").html("&#x25BA; " + i.text)
                .attr("type", "button")
                .attr("class", "menuButton")
                .attr("id", i.buttonId)
                .attr("onclick", "onClickMenuButton('" + i.buttonId + "')");
        }
    });
}