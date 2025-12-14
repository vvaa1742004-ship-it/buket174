const { spawn } = require('child_process');

const DEFAULT_MODEL = process.env.LLM_MODEL || 'gemma2:9b';
const DEFAULT_COMMAND = process.env.LLM_COMMAND || 'ollama';
const DEFAULT_ARGS = process.env.LLM_ARGS
  ? process.env.LLM_ARGS.split(/\s+/).filter(Boolean)
  : ['run', DEFAULT_MODEL];

function runLLM(prompt, userInput, { signal } = {}) {
  return new Promise((resolve, reject) => {
    if (process.env.DISABLE_LLM === '1') {
      return reject(new Error('LLM usage disabled via DISABLE_LLM env'));
    }

    const child = spawn(DEFAULT_COMMAND, DEFAULT_ARGS, { stdio: 'pipe', signal });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString('utf8');
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString('utf8');
    });

    child.once('error', (err) => {
      reject(new Error(`LLM process failed: ${err.message}`));
    });

    child.once('close', (code) => {
      if (code !== 0) {
        return reject(
          new Error(
            `LLM process exited with code ${code}. stderr: ${stderr.trim() || 'n/a'}`,
          ),
        );
      }

      resolve(stdout.trim());
    });

    const message = `${prompt.trim()}\n\nUSER_QUERY:\n${userInput.trim()}`;
    child.stdin.write(message);
    child.stdin.end();
  });
}

module.exports = {
  runLLM,
};
