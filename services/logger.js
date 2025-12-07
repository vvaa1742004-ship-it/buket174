const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'smart-search.log');

function logSmartSearch(payload) {
  try {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
    const entry = {
      ts: new Date().toISOString(),
      ...payload,
    };
    fs.appendFileSync(LOG_FILE, `${JSON.stringify(entry)}\n`, 'utf8');
  } catch (err) {
    console.warn('Не удалось записать лог smart-search:', err.message);
  }
}

module.exports = {
  logSmartSearch,
};
