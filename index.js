import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("view engine", "ejs");

const todayItems = [];
const workItems = [];
let type = "";
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
};
type = "today";
const date = new Date().toLocaleString("en", options);
app.get("/", (req, res) => {
  type = "Today";
  res.render("list.ejs", {
    date: date,
    newListItems: todayItems,
    type: type,
  });
});

app.get("/work", (req, res) => {
  type = "Work";
  res.render("list.ejs", {
    date: date,
    newListItems: workItems,
    type: type,
  });
});

app.post("/", (req, res) => {
  const item = req.body.newItem;
  const type = Object.keys(req.body)[1];
  if (type === "Today") {
    todayItems.push(item);
    res.redirect("/");
  } else {
    workItems.push(item);
    res.redirect("/work");
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}.`);
});
