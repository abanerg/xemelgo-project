const express = require("express");
const app = express();
const loginRouter = require('./routes/loginRoutes');
const employeeRouter = require('./routes/employeeRoutes');
const  managerRouter = require('./routes/managerRoutes');
require("dotenv").config();
const cors = require("cors");

app.use(cors({
  origin: '*'
}));

const port = process.env.PORT; 

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/log-in", loginRouter.router);
app.use("/employee", employeeRouter.router);
app.use("/manager", managerRouter.router);


// Error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`XemelgoProjectBackend listening at http://localhost:${port}`);
});