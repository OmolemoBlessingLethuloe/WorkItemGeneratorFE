let triggeringScheduleAC = "";
let usesNotificationTemplatesAC = "";
let usesConfigsAC = "";
let logicRequirementsAC = "";
// let attachmentObject = [];
// let workItemDetails = [];

async function BackgroundJobs(getMain, foreignTables, devopsSetup, url, fetch) {
  var primary = await getMain("Background Jobs", "Requires DevOps Work Item");
  var foreign = await foreignTables();

  recordIdToName(primary, foreign);
  console.log(primary);

  createWorkItem(
    primary,
    devopsSetup,
    triggeringScheduleAC,
    usesNotificationTemplatesAC,
    usesConfigsAC,
    logicRequirementsAC,
    url,
    fetch
  );
}

// BackgroundJobs()

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
  triggeringScheduleAC,
  usesNotificationTemplatesAC,
  usesConfigsAC,
  logicRequirementsAC,
  url,
  fetch
) {
  primary.forEach((record) => {
    if (
      record["triggering schedule"] != "" &&
      record["triggering schedule"] != null
    ) {
      triggeringScheduleAC = `1.<b>Triggered Schedule:</b> ${record["triggering schedule"]}`;
    } else {
      triggeringScheduleAC = "";
    }

    if (
      record["uses notification templates"] != "" &&
      record["uses notification templates"] != null
    ) {
      usesNotificationTemplatesAC = `2.<b>Notification Template to use:</b> ${record["uses notification templates"]}`;
    } else {
      usesNotificationTemplatesAC = "";
    }

    if (record["uses configs"] != "" && record["uses configs"] != null) {
      usesConfigsAC = `3.<b>Must use config settings:</b> ${record["uses configs"]}`;
    } else {
      usesConfigsAC = "";
    }

    if (
      record["logic / requirements"] != "" &&
      record["logic / requirements"] != null
    ) {
      logicRequirementsAC = `4.<b>Logic/Requirement:</b> ${record["logic / requirements"]}`;
    } else {
      logicRequirementsAC = "";
    }

    // let airtableItem = `<a href='https://airtable.com/app8b4jMvvRiKVA3a/tblA92HsQrhOR2FT5/viwvU4QQH9ThM7Hkh/${record["Background JobsId"]}'>https://airtable.com/app8b4jMvvRiKVA3a/tblA92HsQrhOR2FT5/viwvU4QQH9ThM7Hkh/${record["Background JobsId"]}</a>`;
    // 3. <b>Airtable item:</b> ${airtableItem}

    //Posting to devops
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
          value: `NEW: ${record.type} BACKGROUND JOB: (${record.name})`,
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
          value: ` ${triggeringScheduleAC} <br/>
                                 ${usesNotificationTemplatesAC} <br/>
                                 ${usesConfigsAC}<br/>
                                 ${logicRequirementsAC}`,
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
    //         attachmentObject.push({ name, attachmentUrl });
    //       });
    //     }
    //   }
    // }
  });
}

module.exports = {
  BackgroundJobs,
};
