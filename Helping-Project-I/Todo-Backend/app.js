// core module
const path = require("path");

// external module
const express = require("express");
const DB_PATH =
  "mongodb+srv://root:root@cluster0.2yvvkoz.mongodb.net/todo?appName=Cluster0";
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const todoItemsRouter = require("./routes/todoItemsRouter");

// local module
const errorPage = require("./controllers/errors").errorPage;

const app = express();

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());

app.use(express.json());
app.use(cors());

app.use("/api/todo", todoItemsRouter);

app.use(errorPage);

const PORT = 3000;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log(`Connected to mongodb`);
    app.listen(PORT, () => {
      console.log(`server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error while connecting to mongodb`);
  });
