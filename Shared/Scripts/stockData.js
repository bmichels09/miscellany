function getStockData(numDays) {    
    return (async () => {
        var transactions = new Array();
        var startTime;
        var startDate = new Date();

        if (numDays === "all") {
            startTime = 0;
        }
        else if (numDays === null || Number(numDays) === NaN) {
            startDate.setFullYear(2020, 0, 1);
            startDate.setHours(0, 0, 0, 0);
            startTime = startDate.getTime();
        }
        else {
            startDate.setHours(0, 0, 0, 0);
            startTime = startDate.getTime() - (Number(numDays) * 86400000);
        }

        var url = "https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json";
        const doneHouse = await axios.get(url)
            .then(response => {
                response.data.forEach(y => {
                    let disclosureDateArray = y.disclosure_date.split('/');
                    let transactionDateArray = y.transaction_date.split('-');

                    let discDate = new Date();
                    discDate.setFullYear(parseInt(disclosureDateArray[2]), parseInt(disclosureDateArray[0]) - 1, parseInt(disclosureDateArray[1]));
                    discDate.setHours(0, 0, 0, 0);
                    if (discDate.getTime() < startTime) {return;}

                    let description = "";
                    if (y.asset_description === null) {description = 'N/A';}
                    else if (y.asset_description.split('<').length > 1) {description = y.asset_description.split('<')[0];}
                    else {description = y.asset_description;}

                    let price = "";
                    /*url = `https://markets.financialcontent.com/stocks/quote/historical?Month=${disclosureDateArray[0]}&Year=${disclosureDateArray[2]}&Symbol=${y.ticker}&Range=1`;
                    (async () => {
                        const doneHouse = await axios.get(url)
                            .then(response => {
                                
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })();*/

                    let transaction = {
                        representative: getDisplayName(y.representative),
                        disclosureMonth: parseInt(disclosureDateArray[0]),
                        disclosureDay: parseInt(disclosureDateArray[1]),
                        disclosureYear: parseInt(disclosureDateArray[2]),
                        transactionMonth: parseInt(transactionDateArray[1]),
                        transactionDay: parseInt(transactionDateArray[2]),
                        transactionYear: parseInt(transactionDateArray[0]),
                        ticker: y.ticker,
                        price: price,
                        type: y.type,
                        description: description,
                        amount: y.amount,
                        error: ""
                    };

                    transaction = verifyStockTransaction(transaction);

                    transactions.push(transaction);
                });
            })
            .catch(error => {
                console.log(error);
            });

        url = "https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json";
        const doneSenate = await axios.get(url)
            .then(response => {
                response.data.forEach(y => {
                    let disclosureDateArray = y.disclosure_date.split('/');
                    let transactionDateArray = y.transaction_date.split('/');

                    let discDate = new Date();
                    discDate.setFullYear(parseInt(disclosureDateArray[2]), parseInt(disclosureDateArray[0]) - 1, parseInt(disclosureDateArray[1]));
                    discDate.setHours(0, 0, 0, 0);
                    if (discDate.getTime() < startTime) {return;}

                    let description = "";
                    if (y.asset_description === null) {description = 'N/A';}
                    else if (y.asset_description.split('<').length > 1) {description = y.asset_description.split('<')[0];}
                    else {description = y.asset_description;}

                    let price = "";
                    /*if (y.ticker !== '--') {
                        url = `https://markets.financialcontent.com/stocks/quote/historical?Month=${disclosureDateArray[0]}&Year=${disclosureDateArray[2]}&Symbol=${y.ticker}&Range=1`;
                        (async () => {
                            const doneHouse = await axios.get(url)
                                .then(response => {
                                    
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        })();
                    }*/

                    let transaction = {
                        representative: getDisplayName(y.senator),
                        disclosureMonth: parseInt(disclosureDateArray[0]),
                        disclosureDay: parseInt(disclosureDateArray[1]),
                        disclosureYear: parseInt(disclosureDateArray[2]),
                        transactionMonth: parseInt(transactionDateArray[0]),
                        transactionDay: parseInt(transactionDateArray[1]),
                        transactionYear: parseInt(transactionDateArray[2]),
                        ticker: y.ticker,
                        price: price,
                        type: y.type,
                        description: description,
                        amount: y.amount,
                        error: ""
                    };

                    transaction = verifyStockTransaction(transaction);
                    
                    transactions.push(transaction);
                });
            })
            .catch(error => {
                console.log(error);
            });

        return transactions;
    })();
}