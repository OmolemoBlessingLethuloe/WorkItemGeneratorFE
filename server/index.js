const express = require("express");
var bodyParser = require("body-parser");

const { Views } = require("./entities/views");
const { APIs } = require("./entities/api");
const { BackgroundJobs } = require("./entities/backgroundJobs");
const { Notifications } = require("./entities/notifications");
const { OtherReqs } = require("./entities/otherReqs");
const { ViewReqs } = require("./entities/viewReqs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ type: "*/*" }));

app.post("/post", (req, res) => {
  console.log("Connected to React", req.body);

  function airtableSetup() {
    const Airtable = require("airtable");
    const base = new Airtable({ apiKey: req.body.apiKey }).base(
      req.body.baseId
    );
    return base;
  }

  function devopsSetup() {
    const username = req.body.username;
    const password = req.body.pat;
    const authorizationHeader = `Basic ${Buffer.from(
      `${username}:${password}`
    ).toString("base64")}`;
    return authorizationHeader;
  }

  const fieldPopulator = require("./utility/fieldPopulator");
  const EventEmitter = require("events");
  const fetch = require("node-fetch");
  const eventEmitter = new EventEmitter();
  eventEmitter.setMaxListeners(0);
  const baseTables = require("./utility/baseTables");
  const base = airtableSetup();
  let mainFields = [];
  let foreignFields = [];

  async function getMain(entityName, view) {
    return new Promise((resolve, reject) => {
      try {
        base(entityName)
          .select({
            view,
          })
          .all(async function (err, records) {
            if (err) {
              console.error(err);
              return;
            }
            let result = await fieldPopulator(mainFields, records, entityName);
            eventEmitter.on("finish", (result) => {
              mainFields = [];
              resolve(result);
            });
            eventEmitter.emit("finish", result);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  function getForeign(entityName, view) {
    return new Promise((resolve, reject) => {
      try {
        base(entityName)
          .select({
            view,
          })
          .all(async function (err, records) {
            if (err) {
              console.error(err);
              return;
            }
            let result = await fieldPopulator(
              foreignFields,
              records,
              entityName
            );
            eventEmitter.on("finish", (result) => {
              resolve(result);
            });
            eventEmitter.emit("finish", result);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  async function foreignTables() {
    var allTableFields = [];
    for (let table of baseTables) {
      for (let field of Object.entries(table)) {
        allTableFields = await getForeign(field[0], field[1]);
      }
    }
    return allTableFields;
  }

  for (let table of req.body.tables) {
    console.log(table);
    switch (table) {
      case "Views":
        Views(getMain, foreignTables, devopsSetup, req.body.projectUrl, fetch);
        break;

      case "APIs":
        APIs(getMain, foreignTables, devopsSetup, req.body.projectUrl, fetch);
        break;

      case "Background Jobs":
        BackgroundJobs(
          getMain,
          foreignTables,
          devopsSetup,
          req.body.projectUrl,
          fetch
        );
        break;

      case "Notifications":
        Notifications(
          getMain,
          foreignTables,
          devopsSetup,
          req.body.projectUrl,
          fetch
        );
        break;

      case "Other Reqs":
        OtherReqs(
          getMain,
          foreignTables,
          devopsSetup,
          req.body.projectUrl,
          fetch
        );
        break;

      case "View Reqs":
        ViewReqs(
          getMain,
          foreignTables,
          devopsSetup,
          req.body.projectUrl,
          fetch
        );
        break;
    }
  }
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.send("");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
