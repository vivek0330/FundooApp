/* eslint-disable comma-dangle */
const { format, createLogger, transports, winston } = require("winston");
const { timestamp, combine, json } = format;

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "./info.log",
      level: "info",
      format: format.combine(
        format.timestamp(), format.json())
    }),
    new transports.File({
      filename: "./error.log",
      level: "error",
      format: combine(
        timestamp(), json())
    })
  ]
});

//  displaying logger message in console
logger.add(
  new transports.Console({
    format: format.simple(),
  })
);

module.exports = logger;
