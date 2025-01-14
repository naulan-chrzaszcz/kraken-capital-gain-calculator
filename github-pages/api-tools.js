
const currency = "eur"

const proxyURL = "https://cors-anywhere.herokuapp.com"
const apiURL = "https://api.coingecko.com/api/v3"

/**
 * Maps cryptocurrency tickers to their full names.
 * @type {Object.<string, string>}
 */
const tickerToFullName = {
    "BTC": "bitcoin",
    "ETH": "ethereum",
    "SOL": "solana",
    "XTZ": "tezos",
};


/**
 * Fetches the price of a cryptocurrency by its ticker.
 * 
 * @async
 * @param {string} ticker - Ticker symbol of the cryptocurrency (e.g., "BTC").
 * @returns {Promise<number>} Price of the cryptocurrency in EUR.
 * @throws {Error} If the price cannot be fetched.
 */
async function getCryptocurrencyPrice(ticker) {
    const cryptoName = tickerToFullName[ticker];
    const route = `simple/price?ids=${cryptoName}&vs_currencies=${currency}&precision=full`;

    const response = await fetch(`${proxyURL}/${apiURL}/${route}`);
    const priceData = await response.json();

    if (!response.ok || !priceData[cryptoName])
        throw new Error(`Unable to fetch price for ${cryptoName}`);

    return priceData[cryptoName]["eur"];
}
