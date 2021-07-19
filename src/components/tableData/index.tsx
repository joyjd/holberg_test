import React, { useEffect } from "react";
import styles from "./table.module.css";
import TableCell from "./../tableCell";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./../../store";
import { SiteState } from "./../../store/siteselector.action";

const TableData: React.FC = () => {
  const { MetaInfo, StudyList } = useSelector((state: AppState) => state.siteSelectorReducer) as SiteState;

  const { columnsMetaInformation } = MetaInfo;
  const { data } = StudyList;
  console.log("table data");
  return (
    <div className={styles.container}>
      <div className={styles.tableRow}>
        {columnsMetaInformation && columnsMetaInformation.length > 0
          ? columnsMetaInformation.map((el, index) => {
              const { name, isVisible, propertyName } = el;
              return <TableCell visibility={isVisible} tag={propertyName} key={index} header={true} headerTitle={name.primaryValue || name.secondaryValue} />;
            })
          : null}
      </div>
      <div className={styles.tableWrapper}>
        {data && data.length > 0
          ? data.map((row, index) => {
              return (
                <div key={index} className={styles.tableRow}>
                  {columnsMetaInformation && columnsMetaInformation.length > 0
                    ? columnsMetaInformation.map((el, index) => {
                        const realData = Array.isArray(row[el["propertyName"]]) ? row[el["propertyName"]][0] : row[el["propertyName"]];
                        const { primaryValue, secondaryValue } = realData ? realData : { primaryValue: "", secondaryValue: "" };
                        return <TableCell visibility={el["isVisible"]} tag={el["propertyName"]} key={index} header={false} headerTitle={primaryValue || secondaryValue} />;
                      })
                    : null}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default TableData;
