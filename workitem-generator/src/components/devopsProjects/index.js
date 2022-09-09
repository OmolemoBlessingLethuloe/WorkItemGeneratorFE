import React from "react";
import styles from "./DevopsProjects.module.css";
function DevopsProjects({ eachProjectDataProp }) {
  return (
    <div className={styles.devopsCard}>
      <p>{eachProjectDataProp.name}</p>
      <p>{eachProjectDataProp.url}</p>
      <p>{eachProjectDataProp.description}</p>
      <a href={eachProjectDataProp.projectURL}>
        <p>{eachProjectDataProp.projectURL}</p>
      </a>
    </div>
  );
}

export default DevopsProjects;
