const fs = require('node:fs');
const path = require('node:path');

const LOG_DIRECTORY_PATH = path.resolve('../log-streaming-sample/logs');
const USERS = [
  'Dave Toy',
  'Wayne Schmeler',
  'Rodolfo Schiller',
  'Jackie Labadie',
];
const OPERATIONS = ['ADD', 'GET', 'WRITE', 'UPDATE', 'READ', 'DELETE'];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  // create or read existing log file
  const logFileName = `${new Date().toLocaleDateString().replace(/\//g, '-')}.log`;
  const logPath = path.join(LOG_DIRECTORY_PATH, logFileName);

  const isExists = fs.existsSync(logPath);
  if (!isExists) {
    fs.appendFileSync(logPath, '');
  }

  while (true) {
    const content = fs.readFileSync(logPath).toString();
    fs.writeFileSync(
      logPath,
      content +
        `[Service #${Math.floor(Math.random() * 100)}] > ${USERS[Math.floor(Math.random() * USERS.length)]} did "${OPERATIONS[Math.floor(Math.random() * OPERATIONS.length)]}" operation.\n`,
      { encoding: 'utf8' },
    );
    await delay(1000);
  }
})();
