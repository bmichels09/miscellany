(async () => {
    var qsParams = new URLSearchParams(window.location.search);
    var pendingStocks = new Array();
    var completedStocks = new Array();
    var numDays = qsParams.get("days");
    var transactions = await getStockData(numDays);

    var resultElement = d3.select("#result");
    resultElement.innerHTML = '';
    
    if (qsParams.has("aggregate")) {
        transactions.sort((a, b) => {
            if (a.displayName < b.displayName) {return -1;}
            else if (a.displayName > b.displayName) {return 1;}
            else {
                if (a.ticker < b.ticker) {return -1;}
                else if (a.ticker > b.ticker) {return 1;}
                else {
                    if (parseInt(a.disclosureYear) < parseInt(b.disclosureYear)) {return -1;}
                    else if (parseInt(a.disclosureYear) > parseInt(b.disclosureYear)) {return 1;}
                    else {
                        if (parseInt(a.disclosureMonth) < parseInt(b.disclosureMonth)) {return -1;}
                        else if (parseInt(a.disclosureMonth) > parseInt(b.disclosureMonth)) {return 1;}
                        else {
                            if (parseInt(a.disclosureDay) < parseInt(b.disclosureDay)) {return -1;}
                            else if (parseInt(a.disclosureDay) > parseInt(b.disclosureDay)) {return 1;}
                            else {
                                if (parseInt(a.transactionYear) < parseInt(b.transactionYear)) {return -1;}
                                else if (parseInt(a.transactionYear) > parseInt(b.transactionYear)) {return 1;}
                                else {
                                    if (parseInt(a.transactionMonth) < parseInt(b.transactionMonth)) {return -1;}
                                    else if (parseInt(a.transactionMonth) > parseInt(b.transactionMonth)) {return 1;}
                                    else {
                                        if (parseInt(a.transactionDay) < parseInt(b.transactionDay)) {return -1;}
                                        else if (parseInt(a.transactionDay) > parseInt(b.transactionDay)) {return 1;}
                                        else {
                                            if (parseInt(a.type) < parseInt(b.type)) {return -1;}
                                            else if (parseInt(a.type) > parseInt(b.type)) {return 1;}
                                            else {
                                                return -1;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        transactions.forEach(x => {
            if (x.error !== "") {
                console.log(`Error: ${x.error} (Representative: ${x.representative}, Disclosure Date: ${x.disclosureMonth}/${x.disclosureDay}/${x.disclosureYear}, Ticker: ${x.ticker})`);
            }
        });

        for (var i = 0; i < transactions.length; i++) {
            let transaction = transactions[i];
            
            if (transaction.error !== "") {
                console.log(`Error: ${transaction.error} (Representative: ${transaction.representative}, Disclosure Date: ${transaction.disclosureMonth}/${transaction.disclosureDay}/${transaction.disclosureYear}, Ticker: ${transaction.ticker})`);
                continue;
            }

            if (i > 0 && (transaction.representative !== transactions[i - 1].representative || transaction.ticker !== transactions[i - 1].ticker)) {
                console.log(transactions[i - 1]);
                pendingStocks = new Array();
            }

            if (transaction.type === "Purchase") {
                pendingStocks.push({
                    representative: transaction.representative,
                    ticker: transaction.ticker,
                    purchaseYear: transaction.transactionYear,
                    purchaseMonth: transaction.transactionMonth,
                    purchaseDay: transaction.transactionDay,
                    purchaseDisYear: transaction.disclosureYear,
                    purchaseDisMonth: transaction.disclosureMonth,
                    purchaseDisDay: transaction.disclosureDay,
                    purchasePrice: "",
                    amount: transaction.amount,
                    saleYear: "",
                    saleMonth: "",
                    saleDay: "",
                    saleDisYear: "",
                    saleDisMonth: "",
                    saleDisDay: "",
                    salePrice: "",
                });
            }

            else if (transaction.type.slice(0, 4) === "Sale") {
                pendingStocks.forEach(x => {
                    if (transaction.disclosureYear !== x.purchaseDisYear || transaction.disclosureMonth !== x.purchaseDisMonth || transaction.disclosureDay !== x.purchaseDisDay) {
                        x.saleYear = transaction.transactionYear;
                        x.saleMonth = transaction.transactionMonth;
                        x.saleDay = transaction.transactionDay;
                        x.saleDisYear = transaction.disclosureYear;
                        x.saleDisMonth = transaction.disclosureMonth;
                        x.saleDisDay = transaction.disclosureDay;
                        completedStocks.push(x);
                    }
                });

                pendingStocks = new Array();
            }
        }

        resultElement.append("span")
            .html("Representative~Ticker~Purchase Date~Purchase Dis Date~Purchase Dis Price~Purchase Amount~Sale Date~Sale Dis Date~Sale Dis Price");

        completedStocks.forEach(x => {            
            resultElement.append("span")
                .html(`<br>${x.representative}~${x.ticker}~${x.purchaseMonth}/${x.purchaseDay}/${x.purchaseYear}~${x.purchaseDisMonth}/${x.purchaseDisDay}/${x.purchaseDisYear}~${x.purchasePrice}~${x.amount}~${x.saleMonth}/${x.saleDay}/${x.saleYear}~${x.saleDisMonth}/${x.saleDisDay}/${x.saleDisYear}~${x.salePrice}`);
        });
    }
    
    else {
        resultElement.append("span")
            .html("Representative~Disclosure Date~Transaction Date~Ticker~Price~Type~Description~Amount");
        transactions.forEach(x => {
            if (x.error !== "") {
                console.log(`Error: ${x.error} (Representative: ${x.representative}, Disclosure Date: ${x.disclosureMonth}/${x.disclosureDay}/${x.disclosureYear}, Ticker: ${x.ticker})`);
            }
            
            else {
                resultElement.append("span")
                    .html(`<br>${x.representative}~${x.disclosureMonth}/${x.disclosureDay}/${x.disclosureYear}~${x.transactionMonth}/${x.transactionDay}/${x.transactionYear}~${x.ticker}~${x.price}~${x.type}~${x.description}~${x.amount}`);
            }
        });
    }
})();