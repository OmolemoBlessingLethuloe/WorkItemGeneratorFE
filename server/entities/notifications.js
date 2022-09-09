let mechanismAC = "";
let triggeringScheduleAC = "";
let templateAC = "";
// let attachmentObject = [];
// let workItemDetails = [];

async function Notifications(getMain, foreignTables, devopsSetup, url, fetch) {
  var primary = await getMain("Notifications", "Requires DevOps Work Item");
  var foreign = await foreignTables();

  recordIdToName(primary, foreign);

  console.log(primary);
  createWorkItem(
    primary,
    devopsSetup,
    // workItemDetails,
    // attachmentObject,
    mechanismAC,
    triggeringScheduleAC,
    templateAC,
    url,
    fetch
  );
}

// Notifications()

function recordIdToName(primary, foreign) {
  primary.forEach((record) => {
    for (let key in record) {
      let eachRecord = record[key];

      if (eachRecord instanceof Array) {
        for (let x = 0; x < eachRecord.length; x++) {
          if (
            typeof foreign.find(
              (item) => Object.entries(item)[0][1] === eachRecord[x]
            ) !== "undefined"
          ) {
            if (key === "module") {
              record["devOpsBoardUrl"] = foreign.find(
                (item) => Object.entries(item)[0][1] === eachRecord[x]
              )["devops board url"];
            }

            eachRecord[x] =
              foreign.find(
                (item) => Object.entries(item)[0][1] === eachRecord[x]
              ).name ||
              foreign.find(
                (item) => Object.entries(item)[0][1] === eachRecord[x]
              ).num;
          }
        }
      }
    }
  });
}

function createWorkItem(
  primary,
  devopsSetup,
  // workItemDetails,
  // attachmentObject,
  mechanismAC,
  triggeringScheduleAC,
  templateAC,
  url,
  fetch
) {
  console.log("creating devops work item", new Date().getMilliseconds());
  primary.forEach((record) => {
    if (record["mechanism"] != "" && record["mechanism"] != null) {
      mechanismAC = `1.<b>Mechanism:</b> ${record["mechanism"]}`;
    } else {
      mechanismAC = "";
    }

    if (
      record["triggering schedule"] != "" &&
      record["triggering schedule"] != null
    ) {
      triggeringScheduleAC = `2.<b>Triggered Schedule:</b> ${record["triggering schedule"]}`;
    } else {
      triggeringScheduleAC = "";
    }

    if (record["template"] != "" && record["template"] != null) {
      templateAC = `3.<b>Template Text: </b>None specified}`;
    } else {
      templateAC = "";
    }

    //   let airtableItem = `<a href='https://airtable.com/app8b4jMvvRiKVA3a/tblHoaVBKSR86XM8M/viwC9c4ZBAtB12OzY/${record.NotificationsId}'>https://airtable.com/app8b4jMvvRiKVA3a/tblHoaVBKSR86XM8M/viwC9c4ZBAtB12OzY/${record.NotificationsId}</a>`;
    // 3. <b>Airtable item:</b> ${airtableItem}

    fetch(`${url}/_apis/wit/workitems/$Task?api-version=6.0`, {
      method: "POST",
      headers: {
        Authorization: devopsSetup(),
        "Content-Type": "application/json-patch+json",
      },
      body: JSON.stringify([
        {
          op: "add",
          path: "/fields/System.WorkItemType",
          value: "User Story",
        },
        {
          op: "add",
          path: "/fields/System.Title",
          value: `NEW NOTIFICATION TEMPLATE: (${record.name})`,
        },
        {
          op: "add",
          path: "/fields/System.Tags",
          value: `${record.release}`,
        },
        {
          op: "add",
          path: "/fields/System.Description",
          value: `1. <b>Description:</b> ${record.description} <br/> <br/>   \n
                                                    2. <b>Module:</b> ${record.module} <br/> <br/>  \n
                                                   
                                                    `,
        },
        {
          op: "add",
          path: "/fields/Microsoft.VSTS.Common.AcceptanceCriteria",
          value: ` ${mechanismAC} <br/>
                                               ${triggeringScheduleAC} <br/>
                                               ${templateAC}<br/>
                                             `,
        },
        {
          op: "add",
          path: "/fields/Custom.SkillRequired",
          value: "Shesha 3",
        },
        {
          op: "add",
          path: "/fields/Custom.Module",
          value: `${record.module}`,
        },
        {
          op: "add",
          path: "/fields/Custom.OriginatingProject",
          value: `${record.project}`,
        },
      ]),
    }).then(async (response) => {
      let id = JSON.parse(await response.text()).id;
      let title = record.name;
      //   workItemDetails.push({ id, title });
    });

    //adding hasOwnProperty variable to save attachments urls
    // if (record.hasOwnProperty("attachments")) {
    //   if (record.attachments !== undefined) {
    //     for (var i = 0; i < record.attachments.length; i++) {
    //       fetch(
    //         `https://dev.azure.com/boxfusion/_apis/wit/attachments?fileName=${record.attachments[i].filename}&api-version=6.0`,
    //         {
    //           method: "POST",
    //           headers: {
    //             Authorization: devopsSetup(),
    //             "Content-Type": "application/json-patch+json",
    //           },
    //         }
    //       ).then(async (response) => {
    //         let name = record.name;
    //         let attachmentUrl = JSON.parse(await response.text());
    //         // attachmentObject.push({ name, attachmentUrl });
    //       });
    //     }
    //   }
    // }
  });
}

//exporting the function
module.exports = {
  Notifications,
};
