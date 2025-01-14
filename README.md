# Cryptocurrency Capital Gain Estimator
Upload your Kraken CSV file and analyze your capital gains effortlessly.

## How to Generate a CSV File from Kraken for Capital Gain Analysis
This guide explains how to export a correctly formatted CSV file from Kraken, which can be used to analyze your cryptocurrency capital gains.

### Steps to Generate the CSV File

1. **Access the Kraken Export Tool**
   Go to the Kraken export page by clicking this link:
   [Kraken Export Tool](https://pro.kraken.com/app/history/export).

2. **Set the Correct Parameters:**
   - **Product**: Select **Spot**.  
     _(Do not choose options like Futures or Margin.)_
   - **Format**: Choose **CSV**.  
   - **Export Type**: Select **Ledger**.  
     _(The Ledger export type provides a detailed history of your transactions.)_
   - **Select Assets**: Choose **EUR** and the **cryptocurrency** you want to evaluate.  
     _(Export only one cryptocurrency per CSV file.)_

3. **Set the Date Range:**
   - **Start Date/Time**: **1 Jan 2024, 00:00:00**
   - **End Date/Time**: **31 Dec 2024, 23:59:59**

4. **Export the File:**
   Click **Submit** to generate the CSV file. Download the file once the export is complete.

> [!NOTE]
> **Stablecoins Not Supported**: Investments made using stablecoins (e.g., TUSD → BTC) are not currently considered by this calculator. Only transactions involving EUR → BTC (or the selected cryptocurrency) are supported.
