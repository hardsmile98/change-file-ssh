const { Client } = require('ssh2');

async function changeFileBySSH({
  host,
  port = 22,
  username,
  password,
  path,
  content,
}) {
  if (!host || !username || !password || !path || !content) {
    return {
      success: false,
      message: (!host && 'host parameter not specified')
        || (!username && 'username parameter not specified')
        || (!password && 'password parameter not specified')
        || (!path && 'path parameter not specified')
        || (!content && 'content parameter not specified'),
    };
  }

  const sshClient = new Client();
  sshClient.connect({
    host,
    port,
    username,
    password,
  });

  return new Promise((resolve) => {
    sshClient.on('ready', () => {
      sshClient.exec(
        `echo "${content}" > ${path}`,
        (err, stream) => {
          if (err) {
            resolve({
              succes: false,
              message: err.message,
            });
          }

          stream
            .on('close', () => {
              sshClient.end();

              resolve({
                success: true,
              });
            }).on('data', () => {});
        },
      );
    });

    sshClient.on('error', (error) => {
      resolve({
        message: error.message,
        success: false,
      });
    });
  });
}

async function commandBySSH({
  host,
  port = 22,
  username,
  password,
  commands,
}) {
  if (!host || !username || !password || !commands) {
    return {
      success: false,
      message: (!host && 'host parameter not specified')
        || (!username && 'username parameter not specified')
        || (!password && 'password parameter not specified')
        || (!commands && 'commands parameter not specified'),
    };
  }

  const sshClient = new Client();
  sshClient.connect({
    host,
    port,
    username,
    password,
  });

  return new Promise((resolve) => {
    sshClient.on('ready', () => {
      sshClient.exec(
        `${commands}`,
        (err, stream) => {
          if (err) {
            resolve({
              succes: false,
              message: err.message,
            });
          }

          stream
            .on('close', () => {
              sshClient.end();

              resolve({
                success: true,
              });
            }).on('data', (data) => {
              console.log(`OUTPUT: ${data}`);
            });
        },
      );
    });

    sshClient.on('error', (error) => {
      resolve({
        message: error.message,
        success: false,
      });
    });
  });
}

const start = async () => {
  const resultChangeFile = await changeFileBySSH({
    host: '-',
    username: '-',
    password: '-',
    path: '/tmp/filename.txt',
    content: 'test\ntest1',
  });

  console.log(resultChangeFile);

  const resultCommands = await commandBySSH({
    host: '-',
    username: '-',
    password: '-',
    commands: 'ls /tmp; ls /',
  });

  console.log(resultCommands);
};

start();
