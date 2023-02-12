export const pinoLoggerConfigs = {
  pinoHttp: { transport: { targets: getLoggerTransports() } },
};

function getLoggerTransports() {
  const isTestEnv = process.env.ENV === 'test';
  const loggingLevel = process.env.LOGGER_LEVEL;

  const consoleTransport = {
    level: loggingLevel,
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };

  const generalLogFileTransport = {
    level: loggingLevel,
    target: 'pino/file',
    options: { destination: '.logs/combined.log', mkdir: true },
  };

  const errorLogFileTransport = {
    level: 'error',
    target: 'pino/file',
    options: { destination: '.logs/errors.log', mkdir: true },
  };

  const transports = [];
  transports.push(consoleTransport);

  if (!isTestEnv) {
    transports.push(generalLogFileTransport, errorLogFileTransport);
  }

  return transports;
}
