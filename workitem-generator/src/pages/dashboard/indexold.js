import React, { useState } from "react";
import DevopsProjects from "../../components/devopsProjects";

function Dashboard() {
  const [projectData, setProjectData] = useState([]);

  const getProjectData = async () => {
    console.log("Getting the project data from devOps");

    const requestUrl =
      "https://dev.azure.com/boxfusion/_apis/projects/?api-version=5.1&Authorization=Basic BASE64PATSTRING";

    try {
      const responseData = await fetch(requestUrl, {
        method: "GET",
        headers: {
          Authorization:
            "Basic UmV0aGFiaWxlIE1waGFobGVsZTptbzI0M3hxaDQ2bHI2dmozazRsY3EyeWkybWVmc2hzM2RqeHp0bHRjc216bTNyN2VqdXhx",
        },
      });

      const returnedData = await responseData.json();
      //   console.log(returnedData.value);
      setProjectData(returnedData.value);
    } catch (error) {
      console.log(error);
    }
  };

  const newProjectUrl = projectData.map((i) => {
    i["projectURL"] = i.url.substring(0, 32) + i.name;
    return i;
  });
  console.log("------", newProjectUrl);

  //dev.azure.com/boxfusion/
  console.log(projectData);

  return (
    <div>
      <h1>Project names:</h1>
      <button onClick={getProjectData}>Try </button>
      {projectData.map((eachProjectData) => {
        return (
          <div>
            <DevopsProjects
              eachProjectDataProp={eachProjectData}
              key={eachProjectData.id}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;



// const registerPersonFetchedValue = async (payload) => {
//   try {
//     const responseData = await fetch(
//       "https://localhost:44311/api/services/app/Person/Register",
//       {
//         method: "POST",
//         body: payload,
//       }
//     );

//     const returnedData = await responseData.json().then(async (info) => {
//       if (info.success) {
//         dispatch(personRegisterRequestAction(info.result));
//       } else if (info.error) {
//         dispatch(errorMessageRequestAction(info.error.message));
//       }
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };
// };