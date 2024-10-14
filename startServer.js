const { exec } = require('child_process');
const path = require('path');

const serverName = process.argv[2]; // Get the server name from command line arguments
const scriptPath = path.join(__dirname, 'index.mjs'); // Adjust the path as needed
const logPath = path.join('/Users/vimal/.pm2/logs', `${serverName}-out.log`);

// Start the server with PM2
exec(`pm2 start ${scriptPath} --watch --ignore-watch="node_modules" --name ${serverName} || pm2 restart ${serverName}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting server: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`PM2 stderr: ${stderr}`);
    return;
  }
  console.log(`Server started: ${stdout}`);

  // Tail the log file
  exec(`tail -f ${logPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error tailing log: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Tail stderr: ${stderr}`);
      return;
    }
    console.log(`Tailing log: ${stdout}`);
  });
});
