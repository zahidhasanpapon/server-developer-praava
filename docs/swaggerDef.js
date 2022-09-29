require("dotenv").config();

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "Praava Developer Documentation",
    version: "1.0.0",
    description: "All the documentation realted to Praava APIs",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}/v1`,
    },
  ],
};

module.exports = swaggerDef;
