let workItemDetails = [];
let attachmentObject = [];

async function ViewReqs(getMain, foreignTables, devopsSetup, url, fetch) {
  var primary = await getMain("View Reqs", "Requires DevOps Work Item");
  var foreign = await foreignTables();

  recordIdToName(primary, foreign);
  console.log(primary);
  createWorkItem(primary, devopsSetup, url, fetch);
}

//   ViewsReqs()

function recordIdToName(primary, foreign) {
  primary.forEach((record) => {
    for (let i in record) {
      let t = record[i];
      if (t instanceof Array) {
        for (let x = 0; x < t.length; x++) {
          let query = foreign.find(
            (item) => Object.entries(item)[0][1] === t[x]
          );
          if (typeof query !== "undefined") {
            if (i == "parent view") {
              foreign.forEach((itemF) => {
                if (itemF.hasOwnProperty("ViewsId")) {
                  record["viewModule"] = foreign.find(
                    (item) => Object.entries(item)[0][1] === t[x]
                  ).module;
                  if (record.hasOwnProperty("viewModule")) {
                    record["viewModule"] = query.module;
                  }
                }
              });
            }
            foreign.forEach((itemF) => {
              if (itemF.hasOwnProperty("ModulesId")) {
                if (record.hasOwnProperty("viewModule")) {
                  if (record["viewModule"].includes(itemF.ModulesId)) {
                    if (Object.entries(itemF)[0][1] == record["viewModule"]) {
                      record["devOpsBoardUrl"] = foreign.find(
                        (item) =>
                          Object.entries(item)[0][1] == record["viewModule"]
                      )["devops board url"];
                      record["viewModule"] = foreign.find(
                        (item) =>
                          Object.entries(item)[0][1] == record["viewModule"]
                      ).name;
                    }
                  }
                }
              }
            });
            t[x] = query.name || query.num;
          }
        }
      }
    }
  });
}

function createWorkItem(primary, devopsSetup, url, fetch) {
  console.log("creating devops work item", new Date().getMilliseconds());
  primary.forEach((record) => {
    //   let airtableItem = `<a href='https://airtable.com/app8b4jMvvRiKVA3a/tblKa2BNStudraVO6/viwT3MowUHIeWoFDQ/${record["view ReqsId"]}'>https://airtable.com/app8b4jMvvRiKVA3a/tblKa2BNStudraVO6/viwT3MowUHIeWoFDQ/${record["view ReqsId"]}</a>`;
    // 3. <b>Airtable Item</b>: ${airtableItem}

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
          value: `New requirement for ${record["parent view"]}`,
        },
        {
          op: "add",
          path: "/fields/System.Tags",
          value: `${record.release}`,
        },
        {
          op: "add",
          path: "/fields/System.Description",
          value: `1. <b>Requirement</b>: ${record.requirement} <br/><br/>
                                              2. <b>Module</b>: ${record.viewModule}
                                             `,
        },
        {
          op: "add",
          path: "/fields/Custom.Module",
          value: `${record.viewModule}`,
        },
        {
          op: "add",
          path: "/fields/Custom.SkillRequired",
          value: `React`,
        },
        {
          op: "add",
          path: "/fields/Custom.OriginatingProject",
          value: `${record.project}`,
        },
      ]),
    }).then(async (response) => {
      let id = JSON.parse(await response.text()).id;
      let title = record.num;
      // workItemDetails.push({ id, title });
    });

    //   if (record.hasOwnProperty("attachments")) {
    //     if (record.attachments !== undefined) {
    //       for (var i = 0; i < record.attachments.length; i++) {
    //         fetch(
    //           `https://dev.azure.com/boxfusion/_apis/wit/attachments?fileName=${record.attachments[i].filename}&api-version=6.0`,
    //           {
    //             method: "POST",
    //             headers: {
    //               Authorization: devopsSetup(),
    //               "Content-Type": "application/json-patch+json",
    //             },
    //           }
    //         ).then(async (response) => {
    //           let name = record.num;
    //           let attachmentUrl = JSON.parse(await response.text());
    //           attachmentObject.push({ name, attachmentUrl });
    //         });
    //       }
    //     }
    //   }
  });
  console.log("done creating devops work items", new Date().getMilliseconds());
}

module.exports = {
  ViewReqs,
};
