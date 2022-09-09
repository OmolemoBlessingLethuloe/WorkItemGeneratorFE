let roles = "";
let otherRes = "";
let securityReqs = "";
let checks = "";
let logic = "";
// let workItemDetails = [];
// let attachmentObject = [];

async function APIs(getMain, foreignTables, devopsSetup, url, fetch) {
  var primary = await getMain("APIs", "Requires DevOps Work Item");
  var foreign = await foreignTables();

  recordIdToName(primary, foreign);
  console.log(primary);

  createWorkItem(
    primary,
    devopsSetup,
    roles,
    otherRes,
    securityReqs,
    checks,
    logic,
    // workItemDetails,
    // attachmentObject,
    url,
    fetch
  );
}

// APIs()

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
            if (i == "used by views") {
              foreign.forEach((itemF) => {
                if (itemF.hasOwnProperty("ViewsId")) {
                  record["viewModule"] = query.module;
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

function createWorkItem(
  primary,
  devopsSetup,
  roles,
  otherRes,
  securityReqs,
  checks,
  logic,
  // workItemDetails,
  // attachmentObject,
  url,
  fetch
) {
  console.log("creating devops work item", new Date().getMilliseconds());
  primary.forEach((record) => {
    if (record["required roles"] !== undefined) {
      for (let i = 0; i < record["required roles"].length; i++) {
        roles += `${record["required roles"][i]},`;
      }
    } else {
      roles = "None specified";
    }

    if (record["other standard restrictions"] !== undefined) {
      for (let i = 0; i < record["other standard restrictions"].length; i++) {
        otherRes += `${record["other standard restrictions"][i]},`;
      }
    } else {
      otherRes = "None specified";
    }

    record["security requirements"] == undefined
      ? (securityReqs = "None specified")
      : (securityReqs = `${record["security requirements"]}`);

    record["checks before execution"] == undefined
      ? (checks = "None specified")
      : (checks = `${record["checks before execution"]}`);

    record["business logic"] == undefined
      ? (logic = "None specified")
      : (logic = `${record["business logic"]}`);

    //   let airtableItem = `<a href='https://airtable.com/app8b4jMvvRiKVA3a/tbl5XawvXNmdelPax/viwfTLDf1Vh9W2apa/${record["APIsId"]}'>https://airtable.com/app8b4jMvvRiKVA3a/tbl5XawvXNmdelPax/viwfTLDf1Vh9W2apa/${record["APIsId"]}</a>`;
    // 3. Airtable item:

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
          value: `NEW API for '${record.name}' (${record["endpoint type"]} : ${record.url})`,
        },
        {
          op: "add",
          path: "/fields/System.Tags",
          value: `${record.release}`,
        },
        {
          op: "add",
          path: "/fields/System.Description",
          value: `1. Description: ${record.description} <br/><br/>
                                        2. Module: ${record.viewModule} <br/><br/>
                                         `,
        },
        {
          op: "add",
          path: "/fields/Microsoft.VSTS.Common.AcceptanceCriteria",
          value: ` i. Url should be: ${record.url}<br/>
                                         ii. Request format: ${record["request type"]} : ${record.request} ${record["request dto"]} <br/>
                                         iii. Response format: ${record["response type"]} : ${record["response dto"]} <br/>
                                         iv. "Security Requirements:" <br/>
                                              1. Roles required to access this end-point: ${roles} <br/>
                                              2. Standard restrictions: ${otherRes} <br/>
                                              3. Security requirements: ${securityReqs} <br/>
                                         v. "Business Logic:" <br/>
                                              1. "Checks to perform before execution: ${checks}<br/>
                                              2. Logic to apply: ${logic} <br/>`,
        },
        {
          op: "add",
          path: "/fields/Custom.OriginatingProject",
          value: `${record.project}`,
        },
        {
          op: "add",
          path: "/fields/Custom.Module",
          value: `${record.viewModule}`,
        },
        {
          op: "add",
          path: "/fields/Custom.SkillRequired",
          value: `Shesha3`,
        },
      ]),
    }).then(async (response) => {
      let id = JSON.parse(await response.text()).id;
      let title = record.name;
      // workItemDetails.push({ id, title });
    });

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
  //   return { roles, otherRes, securityReqs, checks, logic };
}

module.exports = {
  APIs,
};
