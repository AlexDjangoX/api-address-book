const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const port = 3030;
const app = express();

let contacts = require("./data/contacts");
let meetings1 = require("./data/meetings");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // parse request bodies

app.get("/", (req, res) => {
  console.log("got request!");
  res.send("Hello!");
});
app.get("/", (req, res) => {
  console.log("got request!");
  res.json("Hello!");
});

app.get("/contacts", (req, res) => {
  res.json({ contacts: contacts });
});

app.get("/contacts/:id", (req, res) => {
  // 1. extract id
  console.log("params /contacts/:id", req.params);
  console.log("id", req.params.id);
  // 2. search
  const contact = contacts.find((item) => item.id === +req.params.id);

  res.json({ contact: contact });
});

app.get("/contacts/:id/meetings", (req, res) => {
  const meetings = meetings1.filter(
    (item) => item.contactId === +req.params.id
  );

  res.json({ meetings });
});

app.post("/contacts", (req, res) => {
  console.log(req.body);
  // returns json which is parsed into js app.use(express.json)
  // extract data from body
  const contactData = { ...req.body, id: contacts.length + 1 };
  contacts.push(contactData);
  // add data to store of contacts
  // send back response
  res.json({ contact: contactData });
});

app.delete("/contacts/:id", (req, res) => {
  const id = req.params.id;
  const contact = contacts.find((item) => item.id === Number(id));

  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);
  res.json({ contact });
});

app.put("/contacts/:id", (req, res) => {
  const id = req.params.id;
  const contact = contacts.find((item) => item.id === Number(id));

  contact.firstName = req.body.firstName;
  contact.lastName = req.body.lastName;
  contact.street = req.body.street;

  contact.city = req.body.city;
  contact.type = req.body.type;
  contact.email = req.body.email;
  contact.linkedin = req.body.linkedin;
  contact.twitter = req.body.twitter;
  //....

  res.json({ contact: contact });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
