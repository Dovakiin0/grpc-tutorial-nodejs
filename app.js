const express = require("express");

// IMPORTING THE CLIENT FOR USING THE FUNCTIONS WE DECLARED IN PROTO FILE
const client = require("./client");

const path = require("path");
const { employees } = require("./dummyEmp");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.post("/insert", (req, res) => {
  client.insert(
    {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
    (err, response) => {
      if (!err) {
        console.log("Success");
        res.redirect("/");
        console.log(response);
      } else {
        console.log(err.details);
      }
    }
  );
});

app.get("/", (req, res) => {
  // Getting getAll function from the client
  client.getAll({}, (err, response) => {
    if (!err) {
      res.render("home", { details: response.message });
    } else {
      console.log(err.details);
    }
  });
});

app.get("/:id", (req, res) => {
  /*
    the getDetails that we sent from the server to let the client use it is used here
    this getDetails takes a id as parameter as we defined in the proto file then gives out a response needed.
  */
  client.getDetails({ id: req.params.id }, (err, response) => {
    if (!err) {
      res.render("details", { details: response.message });
    } else {
      console.log(err.details);
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Process ${process.pid} Running on port ` + PORT);
});
