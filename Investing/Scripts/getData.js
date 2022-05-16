(async () => {
    var qsParams = new URLSearchParams(window.location.search);
    var purchases = {};
    var sales = {};
    var looseEntries = new Array();
    var numDays = qsParams.get("days");

    if (numDays === null) {numDays = 21;}

    var transactions = await getStockData(numDays);

    var purchaseRslt = d3.select("#purchaseRslt");
    var saleRslt = d3.select("#saleRslt");
    var looseRslt = d3.select("#looseRslt");
    
    transactions.forEach(x => {
        if (x.type === "Purchase") {
            if (x.ticker === "--" || x.ticker === undefined) {
                looseEntries.push(x);
            }
            
            else {
                if (purchases[x.ticker] === undefined) {
                    purchases[x.ticker] = {
                        score: 0,
                        entries: new Array()
                    }
                }

                purchases[x.ticker].entries.push(x);
            }            
        }

        else if (x.type.slice(0, 4) === "Sale") {
            if (x.ticker === "--" || x.ticker === undefined) {
                looseEntries.push(x);
            }
            
            else {
                if (sales[x.ticker] === undefined) {
                    sales[x.ticker] = {
                        score: 0,
                        entries: new Array()
                    }
                }

                sales[x.ticker].entries.push(x);
            }            
        }

        else {looseEntries.push(x);}
    });

    sortedPurchaseTickers = Object.keys(purchases).sort((a, b) => {
        if (purchases[a].entries.length > purchases[b].entries.length) {return -1;}
        else if (purchases[a].entries.length < purchases[b].entries.length) {return 1;}
        else {
            if (a < b) {return -1;}
            else if (a > b) {return 1;}
            else {return -1;}
        }
    });

    sortedSaleTickers = Object.keys(sales).sort((a, b) => {
        if (sales[a].entries.length > sales[b].entries.length) {return -1;}
        else if (sales[a].entries.length < sales[b].entries.length) {return 1;}
        else {
            if (a < b) {return -1;}
            else if (a > b) {return 1;}
            else {return -1;}
        }
    });

    looseEntries.sort((a, b) => {
        if (a < b) {return -1;}
        else if (a > b) {return 1;}
        else {return -1;}
    });

    var purchaseTable = purchaseRslt.append("table").attr("id", "purchaseTbl");
    var purchaseLabels = purchaseTable.append("tr").attr("id", "purchaseLabels");
    purchaseLabels.append("th").attr("id", "purchaseLabelTicker").html("Ticker");
    purchaseLabels.append("th").attr("id", "purchaseLabelRep").html("Representative");
    purchaseLabels.append("th").attr("id", "purchaseLabelPDate").html("Purchase Date");
    purchaseLabels.append("th").attr("id", "purchaseLabelDDate").html("Disclosure Date");
    purchaseLabels.append("th").attr("id", "purchaseLabelAmount").html("Amount");

    sortedPurchaseTickers.forEach(x => {
        let purchase = purchases[x];
        let tickerHeader = purchaseTable.append("tr").attr("id", `purchaseTickerHdr_${x}`)
        if (purchase.entries.length === 1) {
            tickerHeader.append("td")
                .attr("id", `purchaseDataTicker_${x}`)
                .attr("class", "tickerHeader")
                .attr("colspan", 5)
                .html(`${x} (${purchase.entries.length} purchase)`);
        }
        else {
            tickerHeader.append("td")
                .attr("id", `purchaseDataTicker_${x}`)
                .attr("class", "tickerHeader")
                .attr("colspan", 5)
                .html(`${x} (${purchase.entries.length} purchases)`);
        }

        purchase.entries.forEach(y => {
            let tickerRow = purchaseTable.append("tr").attr("id", `purchaseDataRow_${x}`);
            tickerRow.append("td")
                .attr("id", `purchaseDataSpacer_${x}`);
            tickerRow.append("td")
                .attr("id", `purchaseDataRep_${x}`)
                .html(`${y.representative}`);
            tickerRow.append("td")
                .attr("id", `purchaseDataPDate_${x}`)
                .html(`${y.transactionMonth}/${y.transactionDay}/${y.transactionYear}`);
            tickerRow.append("td")
                .attr("id", `purchaseDataDDate_${x}`)
                .html(`${y.disclosureMonth}/${y.disclosureDay}/${y.disclosureYear}`);
            tickerRow.append("td")
                .attr("id", `purchaseDataAmount_${x}`)
                .html(`${y.amount}`);
        });        
    });

    var saleTable = saleRslt.append("table").attr("id", "saleTbl");
    var saleLabels = saleTable.append("tr").attr("id", "saleLabels");
    saleLabels.append("th").attr("id", "saleLabelTicker").html("Ticker");
    saleLabels.append("th").attr("id", "saleLabelRep").html("Representative");
    saleLabels.append("th").attr("id", "saleLabelSDate").html("Sale Date");
    saleLabels.append("th").attr("id", "saleLabelDDate").html("Disclosure Date");
    saleLabels.append("th").attr("id", "saleLabelAmount").html("Amount");

    sortedSaleTickers.forEach(x => {
        let sale = sales[x];
        let tickerHeader = saleTable.append("tr").attr("id", `saleTickerHdr_${x}`)
        if (sale.entries.length === 1) {
            tickerHeader.append("td")
                .attr("id", `saleDataTicker_${x}`)
                .attr("class", "tickerHeader")
                .attr("colspan", 5)
                .html(`${x} (${sale.entries.length} sale)`);
        }
        else {
            tickerHeader.append("td")
                .attr("id", `saleDataTicker_${x}`)
                .attr("class", "tickerHeader")
                .attr("colspan", 5)
                .html(`${x} (${sale.entries.length} sales)`);
        }

        sale.entries.forEach(y => {
            let tickerRow = saleTable.append("tr").attr("id", `saleDataRow_${x}`);
            tickerRow.append("td")
                .attr("id", `saleDataSpacer_${x}`);
            tickerRow.append("td")
                .attr("id", `saleDataRep_${x}`)
                .html(`${y.representative}`);
            tickerRow.append("td")
                .attr("id", `saleDataSDate_${x}`)
                .html(`${y.transactionMonth}/${y.transactionDay}/${y.transactionYear}`);
            tickerRow.append("td")
                .attr("id", `saleDataDDate_${x}`)
                .html(`${y.disclosureMonth}/${y.disclosureDay}/${y.disclosureYear}`);
            tickerRow.append("td")
                .attr("id", `saleDataAmount_${x}`)
                .html(`${y.amount}`);
        });        
    });
})();