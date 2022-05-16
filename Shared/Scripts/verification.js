function verifyStockTransaction(transaction) {
    // CORRECTIONS
        // representative

        // disclosureYear

        // disclosureMonth

        // disclosureDay

        // transactionYear
        if (transaction.transactionYear === 21) {transaction.transactionYear = 2021;}
        else if (transaction.transactionYear === 201) {transaction.transactionYear = 2021;}
        else if (transaction.transactionYear === 20221) {transaction.transactionYear = 2021;}
        else if (transaction.transactionMonth === 6 && transaction.transactionDay === 9 && transaction.transactionYear === 9) {transaction.transactionYear = 2021;}

        // transactionMonth

        // transactionDay

        // ticker
        if (transaction.ticker === "AA" && transaction.description === "American Airlines") {transaction.ticker = "AAL";}
        if (transaction.ticker === "APPL" && transaction.description === "Apple") {transaction.ticker = "AAPL";}
        if (transaction.ticker === "APPL" && transaction.description === "APPLE INC") {transaction.ticker = "AAPL";}
        if (transaction.ticker === "APPL" && transaction.description === "Apple Inc") {transaction.ticker = "AAPL";}
        if (transaction.ticker === "APPL" && transaction.description === "Apple Inc. This transaction was reported late due to oversight error that was just caught") {transaction.ticker = "AAPL";}
        if (transaction.ticker === "APPL" && transaction.description === "Apple, Inc.") {transaction.ticker = "AAPL";}
        if (transaction.ticker === "ADDDYY" && transaction.description === "Adidas AG Sponsored ADR") {transaction.ticker = "ADDYY";}
        if (transaction.ticker === "ALFY" && transaction.description === "Ally Financial Inc") {transaction.ticker = "ALLY";}
        if (transaction.ticker === "BOA" && transaction.description === "Bank of America Corporation") {transaction.ticker = "BAC";}
        if (transaction.ticker === "BLK" && transaction.description === "Black Knight Inc") {transaction.ticker = "BKI";}
        if (transaction.ticker === "BRKB" && transaction.description === "Berkshire Hathaway Inc New") {transaction.ticker = "BRK.B";}
        if (transaction.ticker === "BRK-B" && transaction.description === "Berkshire Hathaway Inc.") {transaction.ticker = "BRK.B";}
        if (transaction.ticker === "BSIXX" && transaction.description === "Blackrock Strategic") {transaction.ticker = "BSIIX";}
        if (transaction.ticker === "BTC" && transaction.description === "Bitcoin ") {transaction.ticker = "BTC-USD";}
        if (transaction.ticker === "CMCAS" && transaction.description === "Comcast Corporation Class A") {transaction.ticker = "CMCSA";}
        if (transaction.ticker === "DISCA" && transaction.description === "Discover financial service") {transaction.ticker = "DFS";}
        if (transaction.ticker === "DAWC" && transaction.description === "Digital World Acquisition Corp - Class A") {transaction.ticker = "DWAC";}
        if (transaction.ticker === "EBJ" && transaction.description === "Embraer S.A. / Stock") {transaction.ticker = "ERJ";}
        if (transaction.ticker === "FORD" && transaction.description === "Ford Motor Company") {transaction.ticker = "F";}
        if (transaction.ticker === "FEDX" && transaction.description === "Fedex Corporation") {transaction.ticker = "FDX";}
        if (transaction.ticker === "FNF" && transaction.description === "Fidelity national information services") {transaction.ticker = "FIS";}
        if (transaction.ticker === "FNF" && transaction.description === "Fidelity National Information Services") {transaction.ticker = "FIS";}
        if (transaction.ticker === "FNF" && transaction.description === "Fidelity National Information Svcs") {transaction.ticker = "FIS";}
        if (transaction.ticker === "FXM" && transaction.description === "Fomento Economico Mexicano") {transaction.ticker = "FMX";}
        if (transaction.ticker === "GOOGL" && transaction.description === "Alphabet Inc - Class C Capital Stock") {transaction.ticker = "GOOG";}
        if (transaction.ticker === "HS" && transaction.description === "Henry Schein Inc") {transaction.ticker = "HSIC";}
        if (transaction.ticker === "INTL" && transaction.description === "Intel Corporation") {transaction.ticker = "INTC";}
        if (transaction.ticker === "IQVA" && transaction.description === "Iqvia Holdings Inc") {transaction.ticker = "IQV";}
        if (transaction.ticker === "LBRDA" && transaction.description === "Liberty Broadband Corp Series C") {transaction.ticker = "LBRDK";}
        if (transaction.ticker === "LAM" && transaction.description === "Lam Research") {transaction.ticker = "LRCX";}
        if (transaction.ticker === "LCRX" && transaction.description === "LAM Research Corporation") {transaction.ticker = "LRCX";}
        if (transaction.ticker === "LCRX" && transaction.description === "Lam Research Corporation") {transaction.ticker = "LRCX";}
        if (transaction.ticker === "MFYV" && transaction.description === "SPDR SER TR S&P 400 MID Cap G") {transaction.ticker = "MDYG";}
        if (transaction.ticker === "MCRN" && transaction.description === "MICRON TECHNOLOGY INC") {transaction.ticker = "MU";}
        if (transaction.ticker === "NLG" && transaction.description === "NUVEEN ESG LARGE Cap Fund") {transaction.ticker = "NULG";}
        if (transaction.ticker === "NUGL" && transaction.description === "Nuveen ESG Large Cap Growth Fund") {transaction.ticker = "NULG";}
        if (transaction.ticker === "NVEE" && transaction.description === "Nuvve Holding Corp.") {transaction.ticker = "NVVE";}
        if (transaction.ticker === "PBF" && transaction.description === "PBF Logistics LP Common Units rep LTD partner Interests") {transaction.ticker = "PBFX";}
        if (transaction.ticker === "PLT" && transaction.description === "Planet Fitness Inc") {transaction.ticker = "PLNT";}
        if (transaction.ticker === "PHX" && transaction.description === "Phillips 66") {transaction.ticker = "PSX";}
        if (transaction.ticker === "PDX" && transaction.description === "Pioneer Natural Resources Company") {transaction.ticker = "PXD";}
        if (transaction.ticker === "RDS-B" && transaction.description === "Royal Dutch Shell plc") {transaction.ticker = "RDS.B";}
        if (transaction.ticker === "SEA" && transaction.description === "SEA Limited ADR") {transaction.ticker = "SE";}
        if (transaction.ticker === "SEA" && transaction.description === "SEA Ltd ADR") {transaction.ticker = "SE";}
        if (transaction.ticker === "SMJ" && transaction.description === "JM Smucker Company") {transaction.ticker = "SJM";}
        if (transaction.ticker === "CO" && transaction.description === "Southern Company") {transaction.ticker = "SO";}
        if (transaction.ticker === "SFY" && transaction.description === "Synchrony Financial") {transaction.ticker = "SYF";}
        if (transaction.ticker === "TT" && transaction.description === "AT&T Inc") {transaction.ticker = "T";}
        if (transaction.ticker === "TDDC" && transaction.description === "Teradata Corporation") {transaction.ticker = "TDC";}
        if (transaction.ticker === "TDXX" && transaction.description === "BLF FedFund") {transaction.ticker = "TFDXX";}
        if (transaction.ticker === "TF" && transaction.description === "Thermo Fisher") {transaction.ticker = "TMO";}
        if (transaction.ticker === "TF" && transaction.description === "Tyson Food") {transaction.ticker = "TSN";}
        if (transaction.ticker === "UA" && transaction.description === "Under Armour Inc, Class A") {transaction.ticker = "UAA";}
        if (transaction.ticker === "UHG" && transaction.description === "UnitedHealth Group") {transaction.ticker = "UNH";}
        if (transaction.ticker === "UHG" && transaction.description === "UnitedHealth Group Corp Growth Bond 3.7525%") {transaction.ticker = "UNH";}
        if (transaction.ticker === "UHG" && transaction.description === "UnitedHealth Group Growth Bond 3.75%") {transaction.ticker = "UNH";}
        if (transaction.ticker === "UHG" && transaction.description === "UnitedHealth Group Incorporated Common Stock") {transaction.ticker = "UNH";}
        if (transaction.ticker === "VIAC" && transaction.description === "Viacom CBS Class B") {transaction.ticker = "VIAB";}
        if (transaction.ticker === "VIAC" && transaction.description === "Viacom CBS Inc Common Class B") {transaction.ticker = "VIAB";}
        if (transaction.ticker === "VIAC" && transaction.description === "ViacomCBS Inc. - Class B") {transaction.ticker = "VIAB";}
        if (transaction.ticker === "VIAC" && transaction.description === "ViacomCbS Inc. - Class B") {transaction.ticker = "VIAB";}
        if (transaction.ticker === "VIAC" && transaction.description === "ViacomCBs Inc. - Class B") {transaction.ticker = "VIAB";}
        if (transaction.ticker === "VIAC" && transaction.description === "ViacomCBS Inc. - Class B (Spouse retirement portfolio)") {transaction.ticker = "VIAB";}
        if (transaction.ticker === "VMN" && transaction.description === "Vulcan Materials Company") {transaction.ticker = "VMC";}
        if (transaction.ticker === "VTRA" && transaction.description === "Viatris Inc Common Stock") {transaction.ticker = "VTRS";}
        if (transaction.ticker === "WLTL" && transaction.description === "Willis Towers Watson") {transaction.ticker = "WLTW";}
        if (transaction.ticker === "XMO" && transaction.description === "Exxon") {transaction.ticker = "XOM";}
        if (transaction.ticker === "ZOOM" && transaction.description === "Zoom Technologies, Inc.") {transaction.ticker = "ZM";}
        if (transaction.ticker === "--" && transaction.description === "aapl") {transaction.ticker = "AAPL";}
        if (transaction.ticker === "--" && transaction.description === "Apple Inc.") {transaction.ticker = "AAPL";}
        if (transaction.ticker === "--" && transaction.description === "American Balanced Fund") {transaction.ticker = "ABALX";}
        if (transaction.ticker === "--" && transaction.description === "Acumen Pharmaceuticals, Inc. ") {transaction.ticker = "ABOS";}
        if (transaction.ticker === "--" && transaction.description === "ADYEN N V ADR") {transaction.ticker = "ADYEY";}
        if (transaction.ticker === "--" && transaction.description === "ADYEN N.V. ADR CMN") {transaction.ticker = "ADYEY";}
        if (transaction.ticker === "--" && transaction.description === "American Funds Europacific") {transaction.ticker = "AEPGX";}
        if (transaction.ticker === "--" && transaction.description === "American Growth Fund") {transaction.ticker = "AGTHX";}
        if (transaction.ticker === "--" && transaction.description === "Investment Company of America") {transaction.ticker = "AIVSX";}
        if (transaction.ticker === "--" && transaction.description === "American Mutual Fund") {transaction.ticker = "AMRMX";}
        if (transaction.ticker === "--" && transaction.description === "American Fundamental Investors") {transaction.ticker = "ANCFX";}
        if (transaction.ticker === "--" && transaction.description === "American New Economy Fund") {transaction.ticker = "ANEFX";}
        if (transaction.ticker === "--" && transaction.description === "American New Perspective Cl A") {transaction.ticker = "ANWPX";}
        if (transaction.ticker === "--" && transaction.description === "Amphenol Corp") {transaction.ticker = "APH";}
        if (transaction.ticker === "--" && transaction.description === "Ares Cap Corp") {transaction.ticker = "ARCC";}
        if (transaction.ticker === "--" && transaction.description === "Ares Capital") {transaction.ticker = "ARCC";}
        if (transaction.ticker === "--" && transaction.description === "ba") {transaction.ticker = "BA";}
        if (transaction.ticker === "--" && transaction.description === "The Boeing Company") {transaction.ticker = "BA";}
        if (transaction.ticker === "--" && transaction.description === "Basic Attention Token Cryptocurrency") {transaction.ticker = "BAT-USD";}
        if (transaction.ticker === "--" && transaction.description === "Bristol-Myers Squibb Company Common Stock") {transaction.ticker = "BMY";}
        if (transaction.ticker === "--" && transaction.description === "American Capital Income") {transaction.ticker = "CAIBX";}
        if (transaction.ticker === "--" && transaction.description === "Crown Castle") {transaction.ticker = "CCI";}
        if (transaction.ticker === "--" && transaction.description === "Crown Castle Intl Corp") {transaction.ticker = "CCI";}
        if (transaction.ticker === "--" && transaction.description === "CDW LLC/ CDW Fin Corp") {transaction.ticker = "CDW";}
        if (transaction.ticker === "--" && transaction.description === "Celegene Corp") {transaction.ticker = "CELG";}
        if (transaction.ticker === "--" && transaction.description === "Costco Wholesale Corporation") {transaction.ticker = "COST";}
        if (transaction.ticker === "--" && transaction.description === "Calvert Equity Fund") {transaction.ticker = "CSIEX";}
        if (transaction.ticker === "--" && transaction.description === "CVS") {transaction.ticker = "CVS";}
        if (transaction.ticker === "--" && transaction.description === "Capital World Growth & Income Fund") {transaction.ticker = "CWGIX";}
        if (transaction.ticker === "--" && transaction.description === "Dominion Energy ") {transaction.ticker = "D";}
        if (transaction.ticker === "--" && transaction.description === "DISCOVER FINANCIAL") {transaction.ticker = "DFS";}
        if (transaction.ticker === "--" && transaction.description === "Quest Diagnostics Incorporated Common Stock") {transaction.ticker = "DGX";}
        if (transaction.ticker === "--" && transaction.description === "Editas Medicine, Inc.") {transaction.ticker = "EDIT";}
        if (transaction.ticker === "--" && transaction.description === "Elanco Animal Health") {transaction.ticker = "ELAN";}
        if (transaction.ticker === "--" && transaction.description === "Equitable Holdings inc") {transaction.ticker = "EQH";}
        if (transaction.ticker === "--" && transaction.description === "Equinix Inc") {transaction.ticker = "EQIX";}
        if (transaction.ticker === "--" && transaction.description === "I-SHARES TRUST ESG AWARE") {transaction.ticker = "ESGD";}
        if (transaction.ticker === "--" && transaction.description === "Ethereum Classic Cryptocurrenct") {transaction.ticker = "ETC-USD";}
        if (transaction.ticker === "--" && transaction.description === "Expedia Group Inc") {transaction.ticker = "EXPE";}
        if (transaction.ticker === "--" && transaction.description === "Ford Motor Company ") {transaction.ticker = "F";}
        if (transaction.ticker === "--" && transaction.description === "Fidelity Total Bond ETF") {transaction.ticker = "FBND";}
        if (transaction.ticker === "--" && transaction.description === "Fidelity Government Cash Reserves") {transaction.ticker = "FDRXX";}
        if (transaction.ticker === "--" && transaction.description === "FireEye, Inc.") {transaction.ticker = "FEYE";}
        if (transaction.ticker === "--" && transaction.description === "Fidelity Advisor Focused Emerging Markets") {transaction.ticker = "FIMKX";}
        if (transaction.ticker === "--" && transaction.description === "FS Energy & Power Fund") {transaction.ticker = "FSEN";}
        if (transaction.ticker === "--" && transaction.description === "FS Energy & Power Fund Com") {transaction.ticker = "FSEN";}
        if (transaction.ticker === "--" && transaction.description === "FS Energy & Power Fund Common") {transaction.ticker = "FSEN";}
        if (transaction.ticker === "--" && transaction.description === "Fs Energy and Power Fund") {transaction.ticker = "FSEN";}
        if (transaction.ticker === "--" && transaction.description === "FS Energy and Power Fund Com") {transaction.ticker = "FSEN";}
        if (transaction.ticker === "--" && transaction.description === "FS KKR Capital Corp II") {transaction.ticker = "FSKR";}
        if (transaction.ticker === "--" && transaction.description === "Fidelity Ltd Term Muni Income Fund") {transaction.ticker = "FSTFX";}
        if (transaction.ticker === "--" && transaction.description === "GILD") {transaction.ticker = "GILD";}
        if (transaction.ticker === "--" && transaction.description === "GMSYX - GOLDMAN SACHS SM MD CAP GROWTH I") {transaction.ticker = "GMSYX";}
        if (transaction.ticker === "--" && transaction.description === "Global Payments Inc") {transaction.ticker = "GPN";}
        if (transaction.ticker === "--" && transaction.description === "Global Pmts Inc") {transaction.ticker = "GPN";}
        if (transaction.ticker === "--" && transaction.description === "Grey Cloak Tech Inc") {transaction.ticker = "GRCK";}
        if (transaction.ticker === "--" && transaction.description === "Industrial Property Trust Inc Class A") {transaction.ticker = "IDDP";}
        if (transaction.ticker === "--" && transaction.description === "Industrrial Property Trust Inc Class A") {transaction.ticker = "IDDP";}
        if (transaction.ticker === "--" && transaction.description === "Interpublic Group") {transaction.ticker = "IPG";}
        if (transaction.ticker === "--" && transaction.description === "Interpublic Group Cos Inc") {transaction.ticker = "IPG";}
        if (transaction.ticker === "--" && transaction.description === "JP Morgan Chase and Co ") {transaction.ticker = "JPM";}
        if (transaction.ticker === "--" && transaction.description === "Kraft Heinz Foods Co") {transaction.ticker = "KHC";}
        if (transaction.ticker === "--" && transaction.description === "Lennar Corp") {transaction.ticker = "LEN";}
        if (transaction.ticker === "--" && transaction.description === "L3Harris Special Stock Grant") {transaction.ticker = "LHX";}
        if (transaction.ticker === "--" && transaction.description === "Linde plc Ordinary Share") {transaction.ticker = "LIN";}
        if (transaction.ticker === "--" && transaction.description === "Mondelez International") {transaction.ticker = "MDLZ";}
        if (transaction.ticker === "--" && transaction.description === "Metallic Minerals Corp.") {transaction.ticker = "MMNGF";}
        if (transaction.ticker === "--" && transaction.description === "msft") {transaction.ticker = "MSFT";}
        if (transaction.ticker === "--" && transaction.description === "NEUCOCRINE BIOSCIENCES INC") {transaction.ticker = "NBIX";}
        if (transaction.ticker === "--" && transaction.description === "NEUROCRINE BIOSCIENCES INC") {transaction.ticker = "NBIX";}
        if (transaction.ticker === "--" && transaction.description === "National Fuel Gas Company") {transaction.ticker = "NFG";}
        if (transaction.ticker === "--" && transaction.description === "Netflix Inc") {transaction.ticker = "NFLX";}
        if (transaction.ticker === "--" && transaction.description === "Nu Holdings Ltd") {transaction.ticker = "NU";}
        if (transaction.ticker === "--" && transaction.description === "OWENS & MINOR ") {transaction.ticker = "OMI";}
        if (transaction.ticker === "--" && transaction.description === "Oracle Corp") {transaction.ticker = "ORCL";}
        if (transaction.ticker === "--" && transaction.description === "Outfront Media") {transaction.ticker = "OUT";}
        if (transaction.ticker === "--" && transaction.description === "Philip Morris International Inc") {transaction.ticker = "PM";}
        if (transaction.ticker === "--" && transaction.description === "PM") {transaction.ticker = "PM";}
        if (transaction.ticker === "--" && transaction.description === "PPL") {transaction.ticker = "PPL";}
        if (transaction.ticker === "--" && transaction.description === "Paypal Holdings Inc") {transaction.ticker = "PYPL";}
        if (transaction.ticker === "--" && transaction.description === "Sherwin Williams Co") {transaction.ticker = "SHW";}
        if (transaction.ticker === "--" && transaction.description === "Salient MLP Fund") {transaction.ticker = "SIMCX";}
        if (transaction.ticker === "--" && transaction.description === "American Small Cap World Fund") {transaction.ticker = "SMCWX";}
        if (transaction.ticker === "--" && transaction.description === "Surgical Information Sciences ") {transaction.ticker = "SUS.ST";}
        if (transaction.ticker === "--" && transaction.description === "SwedenCare AB") {transaction.ticker = "SWDCF";}
        if (transaction.ticker === "--" && transaction.description === "BLF FedFun TDDXX") {transaction.ticker = "TDDXX";}
        if (transaction.ticker === "--" && transaction.description === "BLF FedFund TDD XX") {transaction.ticker = "TDDXX";}
        if (transaction.ticker === "--" && transaction.description === "BLF FedFund TDDXX") {transaction.ticker = "TDDXX";}
        if (transaction.ticker === "--" && transaction.description === "Target Corporation") {transaction.ticker = "TGT";}
        if (transaction.ticker === "--" && transaction.description === "United Health") {transaction.ticker = "UNH";}
        if (transaction.ticker === "--" && transaction.description === "US Bancorp Dep SHS PFD F Non-Cumulative Series F6.5%") {transaction.ticker = "USB";}
        if (transaction.ticker === "--" && transaction.description === "VGP Group") {transaction.ticker = "VGP.BR";}
        if (transaction.ticker === "--" && transaction.description === "Vulcan Materials ") {transaction.ticker = "VMC";}
        if (transaction.ticker === "--" && transaction.description === "VOYA FINL INC") {transaction.ticker = "VOYA";}
        if (transaction.ticker === "--" && transaction.description === "Valterra Products Holdings, LLC ") {transaction.ticker = "VQA.V";}
        if (transaction.ticker === "--" && transaction.description === "Vroom, Inc.") {transaction.ticker = "VRM";}
        if (transaction.ticker === "--" && transaction.description === "Verizon Comm. Inc.") {transaction.ticker = "VZ";}
        if (transaction.ticker === "--" && transaction.description === "VZ") {transaction.ticker = "VZ";}
        if (transaction.ticker === "--" && transaction.description === "Wells Fargo & Company") {transaction.ticker = "WFC";}
        if (transaction.ticker === "--" && transaction.description === "WFC - Wells Fargo & Company") {transaction.ticker = "WFC";}
        if (transaction.ticker === "--" && transaction.description === "Walmart Inc.") {transaction.ticker = "WMT";}
        if (transaction.ticker === "--" && transaction.description === "ACAP STRAGIC INTERVAL") {transaction.ticker = "XCAPX";}
        if (transaction.ticker === "--" && transaction.description === "Healthcare select SPDR") {transaction.ticker = "XLV";}
        if (transaction.ticker === "--" && transaction.description === "XEROX CORP ") {transaction.ticker = "XRX";}
        if (transaction.ticker === "--" && transaction.description === "Zimmer Biomet Holdings") {transaction.ticker = "ZBH";}
        if (transaction.ticker === "--" && transaction.description === "zm") {transaction.ticker = "ZM";}
        if (transaction.ticker === "--" && transaction.description === "Zoetis Inc") {transaction.ticker = "ZTS";}
        
        // price

        // type
        if (transaction.type === "exchange") {transaction.type = "Exchange";}
        else if (transaction.type === "purchase") {transaction.type = "Purchase";}
        else if (transaction.type === "sale_full") {transaction.type = "Sale (Full)";}
        else if (transaction.type === "sale_partial") {transaction.type = "Sale (Partial)";}
        
        // description
        
        // amount
        if (transaction.amount === "$1,000 - $15,000") {transaction.amount = "$1,001 - $15,000";}
        else if (transaction.amount === "$15,000 - $50,000") {transaction.amount = "$15,001 - $50,000";}
        else if (transaction.amount === "$1,000,000 - $5,000,000") {transaction.amount = "$1,000,001 - $5,000,000";}
        else if (transaction.amount === "Over $50,000,000") {transaction.amount = "$50,000,000 +";}
    
    // VERIFICATION
        var disclosureMonthLength;
        var transactionMonthLength;

        if ([1, 3, 5, 7, 8, 10, 12].includes(transaction.disclosureMonth)) {disclosureMonthLength = 31;}
        else if ([4, 6, 9, 11].includes(transaction.disclosureMonth)) {disclosureMonthLength = 30;}
        else if (transaction.disclosureYear % 4 === 0 && (transaction.disclosureYear % 100 !== 0 || transaction.disclosureYear % 400 === 0)) {
            disclosureMonthLength = 29;
        }
        else {disclosureMonthLength = 28;}

        if ([1, 3, 5, 7, 8, 10, 12].includes(transaction.transactionMonth)) {transactionMonthLength = 31;}
        else if ([4, 6, 9, 11].includes(transaction.transactionMonth)) {transactionMonthLength = 30;}
        else if (transaction.transactionYear % 4 === 0 && (transaction.transactionYear % 100 !== 0 || transaction.transactionYear % 400 === 0)) {
            transactionMonthLength = 29;
        }
        else {transactionMonthLength = 28;}
    
        // representative
        if (transaction.representative === undefined) {transaction.error = "No representative";}

        // disclosureYear
        else if (transaction.disclosureYear === undefined) {transaction.error = "No disclosure year";}
        else if (transaction.disclosureYear < 2000 || transaction.disclosureYear > 2100) {
            transaction.error = `Invalid disclosure date: ${transaction.disclosureMonth}/${transaction.disclosureDay}/${transaction.disclosureYear}`;
        }

        // disclosureMonth
        else if (transaction.disclosureMonth === undefined) {transaction.error = "No disclosure month";}
        else if (transaction.disclosureMonth < 1 || transaction.disclosureMonth > 12) {
            transaction.error = `Invalid disclosure date: ${transaction.disclosureMonth}/${transaction.disclosureDay}/${transaction.disclosureYear}`;
        }

        // disclosureDay
        else if (transaction.disclosureDay === undefined) {transaction.error = "No disclosure day";}
        else if (transaction.disclosureDay < 1 || transaction.disclosureDay > disclosureMonthLength) {
            transaction.error = `Invalid disclosure date: ${transaction.disclosureMonth}/${transaction.disclosureDay}/${transaction.disclosureYear}`;
        }

        // transactionYear
        else if (transaction.transactionYear === undefined) {transaction.error = "No transaction year";}
        else if (transaction.transactionYear < 2000 || transaction.transactionYear > 2100) {
            transaction.error = `Invalid transaction date: ${transaction.transactionMonth}/${transaction.transactionDay}/${transaction.transactionYear}`;
        }

        // transactionMonth
        else if (transaction.transactionMonth === undefined) {transaction.error = "No transaction month";}
        else if (transaction.transactionMonth < 1 || transaction.transactionMonth > 12) {
            transaction.error = `Invalid transaction date: ${transaction.transactionMonth}/${transaction.transactionDay}/${transaction.transactionYear}`;
        }

        // transactionDay
        else if (transaction.transactionDay === undefined) {transaction.error = "No transaction day";}
        else if (transaction.transactionDay < 1 || transaction.transactionDay > transactionMonthLength) {
            transaction.error = `Invalid transaction date: ${transaction.transactionMonth}/${transaction.transactionDay}/${transaction.transactionYear}`;
        }

        // ticker
        else if (transaction.ticker === undefined) {transaction.error = "No ticker";}
        
        // price
        else if (transaction.price === undefined) {transaction.error = "No price";}
        else if (Number(transaction.price) === NaN) {
            transaction.error = `Invalid price: ${transaction.price}`;
        }

        // type
        else if (transaction.type === undefined) {transaction.error = "No type";}
        else if (![
                "Exchange",
                "N/A",
                "Purchase",
                "Sale (Full)",
                "Sale (Partial)"
        ].includes(transaction.type)) {
            transaction.error = `Invalid type: ${transaction.type}`;
        }
        
        // description - it's fine if this is blank
        
        // amount
        else if (transaction.amount === undefined) {transaction.error = "No amount";}
        else if (![
            "$1,001 -",
            "$1,001 - $15,000",
            "$15,001 - $50,000",
            "$50,001 - $100,000",
            "$100,001 - $250,000",
            "$250,001 - $500,000",
            "$500,001 - $1,000,000",
            "$1,000,000 +",
            "$1,000,001 - $5,000,000",
            "$5,000,001 - $25,000,000",
            "$25,000,001 - $50,000,000",
            "$50,000,000 +",
            "Unknown"
        ].includes(transaction.amount)) {
            transaction.error = `Invalid amount: ${transaction.amount}`;
        }

    return transaction;
}