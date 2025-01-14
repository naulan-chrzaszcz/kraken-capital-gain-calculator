
document.getElementById('cryptoForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const cryptoTicker = document.getElementById('crypto').value.trim().toUpperCase();
    const file = document.getElementById('file').files[0];
    const resultsContainer = document.getElementById('results-container');
    const resultsTable = document.getElementById('results');

    if (!cryptoTicker || !file) {
        alert("Fill all fields before starting the estimation.");
        return;
    }

    const data = await readCSV(file);
    const cryptocurrencyPrice = await getCryptocurrencyPrice(cryptoTicker);
    const cryptocurrencyAmount = sumTotalCryptocurrencyAmount(filterReceivesForTicker(data, cryptoTicker));
    const actuelValue = convertCryptoToEUR(
        cryptocurrencyAmount,
        cryptocurrencyPrice,
    );
    const earnAmount = sumTotalEarnsForTicker(data, cryptoTicker);
    const earnEur = convertCryptoToEUR(earnAmount, cryptocurrencyPrice);
    const profitPercentageWithoutEarn = computeProfitPercentage(cryptocurrencyPrice, cryptocurrencyAmount);
    const profitPercentageWithEarn = computeProfitPercentage(cryptocurrencyPrice, cryptocurrencyAmount + earnAmount);

    resultsContainer.classList.remove('d-none');
    resultsTable.innerHTML = `
        <tr>
            <td>Total spent (EUR)</td>
            <td>${sumTotalSpendsInEUR(data).toFixed(2)} €</td>
        </tr>
        <tr>
            <td>Total received (${cryptoTicker})</td>
            <td>${cryptocurrencyAmount.toFixed(8)}</td>
        </tr>
        <tr>
            <td>Actual value (${cryptoTicker})</td>
            <td>${actuelValue.toFixed(2)} €</td>
        </tr>
        <tr>
            <td class="${profitPercentageWithoutEarn >= 0 ? 'profit-positive' : 'profit-negative'}">Profit/Loss percentage</td>
            <td class="${profitPercentageWithoutEarn >= 0 ? 'profit-positive' : 'profit-negative'}">${profitPercentageWithoutEarn.toFixed(2)}%</td>
        </tr>
        <tr>
            <td>Total earned from staking (${cryptoTicker})</td>
            <td>${earnAmount.toFixed(8)}</td>
        </tr>
        <tr>
            <td>Total gagné en staking (EUR)</td>
            <td>${earnEur.toFixed(2)} €</td>
        </tr>
        <tr>
            <td>Total final value (with staking)</td>
            <td>${(actuelValue + earnEur).toFixed(2)} €</td>
        </tr>
        <tr>
            <td class="${profitPercentageWithEarn >= 0 ? 'profit-positive' : 'profit-negative'}">Profit/Loss percentage</td>
            <td class="${profitPercentageWithEarn >= 0 ? 'profit-positive' : 'profit-negative'}">${profitPercentageWithEarn.toFixed(2)}%</td>
        </tr>
    `;
});
