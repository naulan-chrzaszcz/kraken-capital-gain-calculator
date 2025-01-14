
/**
 * Filters spend transactions in EUR from CSV row data.
 *
 * @param {Array<Object>} data - CSV rows, where each row is an object representing a transaction.
 * @returns {Array<Object>} Spend transactions in EUR.
 */
function filterSpendsInEUR(data) {
    return data.filter(row => row.type === "spend" && row.asset === "EUR");
}

/**
 * Filters receive transactions for a given ticker from CSV row data.
 *
 * @param {Array<Object>} data - CSV rows, where each row is an object representing a transaction.
 * @param {string} ticker - Cryptocurrency ticker.
 * @returns {Array<Object>} Receive transactions for the ticker.
 */
function filterReceivesForTicker(data, ticker) {
    return data.filter(row => row.type === "receive" && row.asset === ticker);
}

/**
 * Sums up total spend in EUR matching spend and receive times from CSV row data.
 *
 * @param {Array<Object>} data - CSV rows, where each row is an object representing a transaction.
 * @returns {number} Total spend in EUR.
 */
function sumTotalSpendsInEUR(data) {
    const receives = filterReceivesForTicker(data, "EUR");
    return filterSpendsInEUR(data)
        .filter(spend => receives.some(receive => receive.time === spend.time))
        .reduce((sum, row) => sum + parseFloat(row.amount || 0), 0) * -1;
}

/**
 * Sums up cryptocurrency amount from receive transactions in CSV row data.
 *
 * @param {Array<Object>} receives - CSV rows with receive transactions.
 * @returns {number} Total cryptocurrency amount.
 */
function sumTotalCryptocurrencyAmount(receives) {
    return receives.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
}

/**
 * Filters earn transactions for a given ticker from CSV row data.
 *
 * @param {Array<Object>} data - CSV rows, where each row is an object representing a transaction.
 * @param {string} ticker - Cryptocurrency ticker.
 * @returns {Array<Object>} Earn transactions for the ticker.
 */
function filterEarnsForTicker(data, ticker) {
    return data.filter(row => row.type === "earn" && row.asset === ticker);
}

/**
 * Sums up total earnings for a given ticker from CSV row data.
 *
 * @param {Array<Object>} data - CSV rows, where each row is an object representing a transaction.
 * @param {string} ticker - Cryptocurrency ticker.
 * @returns {number} Total earnings for the ticker.
 */
function sumTotalEarnsForTicker(data, ticker) {
    return filterEarnsForTicker(data, ticker).reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
}

/**
 * Converts cryptocurrency amount to EUR.
 *
 * @param {number} amount - Cryptocurrency amount.
 * @param {number} price - Current price in EUR.
 * @returns {number} Equivalent value in EUR.
 */
function convertCryptoToEUR(amount, price) {
    return amount * price;
}

/**
 * Calculates profit percentage based on price and spend.
 *
 * @param {number} price - Current price in EUR.
 * @param {number} spend - Total spend in EUR.
 * @returns {number} Profit percentage.
 */
function computeProfitPercentage(price, spend) {
    return ((price - spend) / spend) * 100;
}
