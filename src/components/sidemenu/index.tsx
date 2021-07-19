import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./../../store";
import { SiteState } from "./../../store/siteselector.action";
import NameLabel from "./../../utils/nameLabel";
import ToggleSwitch from "./../../utils/toggleSwitch";
import styles from "./sideMenu.module.css";

const SideMenu: React.FC = () => {
  const { MetaInfo } = useSelector((state: AppState) => state.siteSelectorReducer) as SiteState;

  const { columnsMetaInformation } = MetaInfo;
  console.log("sidemenu");
  return (
    <div>
      {columnsMetaInformation && columnsMetaInformation.length > 0 ? (
        columnsMetaInformation.map((el, index) => {
          const { name, isVisible } = el;
          return (
            <div key={index} className={styles.container}>
              <NameLabel title={name.primaryValue || name.secondaryValue} />
              <ToggleSwitch index={index} />
            </div>
          );
        })
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default SideMenu;
