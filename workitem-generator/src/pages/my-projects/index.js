import React, { useState } from 'react'
import DevopsProjects from '../../components/devopsProjects';
import AppLayout from '../../components/layout'

const Projects = () => {
  const [projectData, setProjectData] = useState([]);

  const getProjectData = async () => {
    console.log("Getting the project data from devOps");

    const requestUrl =
      "https://dev.azure.com/boxfusion/_apis/projects/?api-version=5.1&Authorization=Basic BASE64PATSTRING";

    try {
      const responseData = await fetch(requestUrl, {
        method: "GET",

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
    <AppLayout>
            <h1>Project names:</h1>
      <button onClick={getProjectData}>Try </button>
      {projectData.map((eachProjectData, index) => {
        return (
          <div key={index}>
            <DevopsProjects
              eachProjectDataProp={eachProjectData}
              key={eachProjectData.id}
            />
          </div>
        );
      })}
    </AppLayout>
  )
}

export default Projects