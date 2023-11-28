const fs = require('fs');
const path = require('path');

exports.handler = async function (event, context) {
    try {
        const scansFilePath = path.join('/tmp', 'scans.json');

        if (event.httpMethod === 'GET') {
            // Read the 'scans.json' file
            const scansData = readScansFile(scansFilePath);
            console.log('GET Request - Scans Data:', scansData);

            return {
                statusCode: 200,
                body: JSON.stringify(scansData),
            };
        } else if (event.httpMethod === 'PUT') {
            const incomingData = JSON.parse(event.body);
            console.log('PUT Request - Incoming Data:', incomingData);

            // Read the 'scans.json' file
            const existingData = readScansFile(scansFilePath);
            console.log('PUT Request - Existing Data:', existingData);

            // Example: Update or append data
            existingData.push(...incomingData);

            // Write the updated data back to the file
            fs.writeFileSync(scansFilePath, JSON.stringify(existingData, null, 2));
            console.log('PUT Request - Data Updated Successfully:', existingData);

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Data updated successfully' }),
            };
        } else {
            return {
                statusCode: 405,
                body: JSON.stringify({ error: 'Method Not Allowed' }),
            };
        }
    } catch (error) {
        console.error('Error in updateScans function:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};

function readScansFile(filePath) {
    try {
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            // If not, create the file with an empty array
            console.log('File does not exist. Creating a new one.');
            fs.writeFileSync(filePath, '[]');
            return [];
        }

        // Read and parse the 'scans.json' file
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading scans file:', error);
        throw error;
    }
}
