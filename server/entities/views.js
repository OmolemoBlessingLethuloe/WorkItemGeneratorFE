let cardAC = "";
let menuAC = "";
let rolesAC = "";

async function Views(getMain, foreignTables, devopsSetup, url, fetch) {
  var primary = await getMain("Views", "Requires DevOps Work Item");
  var foreign = await foreignTables();

  recordIdToName(primary, foreign);
  console.log(primary);
  createWorkItem(primary, foreign, devopsSetup, cardAC, menuAC, rolesAC, url, fetch);
}

// Views()

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
            if (i == "module") {
              record["devOpsBoardUrl"] = query["devops board url"];
            }
            t[x] = query.name || query.num || query["project code"];
          }
        }
      }
    }
  });
}

function createWorkItem(
  primary,
  foreign,
  devopsSetup,
  cardAC,
  menuAC,
  rolesAC,
  url,
  fetch
) {
  console.log("creating devops work item", new Date().getMilliseconds());
  primary.forEach((record) => {
    foreign.forEach((reqNum) => {
      for (let i in reqNum) {
        if (i === 'View ReqsId') {
          if (record['detailed requirements'] != null) {
            if (record['detailed requirements'].includes(reqNum.num)) {
              if (reqNum['separate devops card'] === true) {
                cardAC = `1. ${reqNum.type} (${record.status}): ${reqNum.requirement}`;
              }
              if (record.menu != "N/A" && record.menu != null) {
                menuAC = `User should be able to access the view from the primarymenu: ${record.menuPath}`;
              }
              if (record['required roles'] != null) {
                if (record['required roles'].length != 0) {
                  rolesAC = `The view should only be accessible by users with the following role(s):`;
                  for (let i = 0; i < record['required roles'].length; i++) {
                    rolesAC += `${record['required roles'][i]} <br/>`;
                  }
                }
              }
            }
          }
        }
      }
    });
    // let airtableItem = `<a href='https://airtable.com/app8b4jMvvRiKVA3a/tbl534ZzdSVA5rJ57/viwGlhm0twQKuMw6b/${record['ViewsId']}'>https://airtable.com/app8b4jMvvRiKVA3a/tbl534ZzdSVA5rJ57/viwGlhm0twQKuMw6b/${record['ViewsId']}</a>`;
    // let airtableLink=airtableItem.link(airtableItem);
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
          value: `NEW VIEW: ${record.name} (${record["view type"]})`,
        },
        {
          op: "add",
          path: "/fields/System.Tags",
          value: `${record.release}`,
        },
        {
          op: "add",
          path: "/fields/System.Description",
          value: `1. <b>Description</b>: ${record.description} <br/><br/>
                                  2. <b>Mockup</b>: ${record.mockup} <br/><br/>
                                  3. <b>Module</b>: ${record.module} <br/><br/>
                                  `,
        },
        {
          op: "add",
          path: "/fields/Microsoft.VSTS.Common.AcceptanceCriteria",
          value: ` ${cardAC} <br/>
                             ${menuAC} <br/>
                             ${rolesAC}`,
        },
        {
          op: "add",
          path: "/fields/Custom.OriginatingProject",
          value: `${record.project}`,
        },
        {
          op: "add",
          path: "/fields/Custom.Module",
          value: `${record.module}`,
        },
        {
          op: "add",
          path: "/fields/Custom.SkillRequired",
          value: `React`,
        },
      ]),
    }).then(async (response) => {
      // console.log(JSON.parse(await response.text()))
      let id = JSON.parse(await response.text()).id;
      let title = record.name;
      // workItemDetails.push({ id, title });
    });
  });
}

module.exports = {
  Views,
};
