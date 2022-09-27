const morgan = require("morgan");
const logger = require("../configs/logger.config");

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, "content-length"),
      response_time: Number.parseFloat(tokens["response-time"](req, res)),
    });
  },
  // ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message) => {
        const data = JSON.parse(message);
        logger.http(`Incoming request`, data);
      },
    },
    skip,
  }
);

module.exports = morganMiddleware;
