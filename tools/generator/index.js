const fs = require('node:fs/promises');
const path = require('node:path');

const LOG_DIRECTORY_PATH = path.resolve('../../data/logs');
const USERS = [
  'Dave Toy',
  'Wayne Schmeler',
  'Rodolfo Schiller',
  'Jackie Labadie',
];
const OPERATIONS = ['ADD', 'GET', 'WRITE', 'UPDATE', 'READ', 'DELETE'];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateLogMessage = () => {
  const user = USERS[Math.floor(Math.random() * USERS.length)];
  const operation = OPERATIONS[Math.floor(Math.random() * OPERATIONS.length)];
  return `[Service #${Math.floor(Math.random() * 100)}] > ${user} did "${operation}" operation.\n`;
};

const getLogFilePath = () => {
  const logFileName = `${new Date().toISOString().slice(0, 10)}.log`;
  return path.join(LOG_DIRECTORY_PATH, logFileName);
};

const appendLog = async (logPath, message) => {
  await fs.appendFile(logPath, message, { encoding: 'utf8' });
};

const main = async () => {
  const logPath = getLogFilePath();

  try {
    await fs.access(logPath);
  } catch {
    await appendLog(logPath, '');
  }

  while (true) {
    const logMessage = generateLogMessage();
    await appendLog(logPath, logMessage);
    await delay(1000);
  }
};

main().catch(console.error);
