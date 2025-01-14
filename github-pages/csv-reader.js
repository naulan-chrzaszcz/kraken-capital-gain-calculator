
/**
 * Parses CSV data from a FileReader event.
 *
 * @param {Event} event - Event triggered by FileReader when the file is loaded.
 * @returns {Object[]} - Array of objects, where each object represents a row in the CSV.
 */
function CSVReader(event) {
    const lines = event.target.result.split('\n').map(row => row.split(','));
    const headers = lines[0].map(header => header.trim().replace(/"/g, ''));

    return lines.slice(1).map(row => {
        return Object.fromEntries(row.map((value, i) => [
            headers[i],
            value.trim().replace(/"/g, '') // Removes extra quotes from the data
        ]));
    });
}

/**
 * Reads a CSV file and returns its parsed content.
 *
 * @param {File} file - CSV file to be read.
 * @returns {Promise<Object[]>} - Promise that resolves to an array of objects, 
 * each representing a row in the CSV.
 * @throws {Error} - If there is an error while reading the file.
 */
async function readCSV(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(CSVReader(event));
        reader.onerror = () => reject(new Error('Error while reading the file'));
        reader.readAsText(file);
    });
}
