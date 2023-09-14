import { readFileSync, writeFileSync } from 'fs';

// Read JSON data from a file
const readData = (filePath) => {
  try {
    const data = readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON data:', error);
    return null;
  }
};

// Write JSON data to a file
const writeData = (filePath, data) => {
  try {
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Data written successfully.');
  } catch (error) {
    console.error('Error writing JSON data:', error);
  }
};

export default { readData, writeData };