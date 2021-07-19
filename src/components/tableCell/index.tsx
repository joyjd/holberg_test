import React, { useEffect, useState } from "react";
import styles from "./tableCell.module.css";
import NameLabel from "./../../utils/nameLabel";
import { AppState } from "./../../store";
import { SiteState } from "./../../store/siteselector.action";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  headerTitle: string;
  header: boolean;
  tag: string;
  visibility?: boolean;
}
const TableCell: React.FC<Props> = ({ headerTitle, header, tag, visibility }) => {
  const { ColumnVisible } = useSelector((state: AppState) => state.siteSelectorReducer) as SiteState;
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (ColumnVisible.items.length > 0) {
      let temp = [...ColumnVisible.items.filter((el) => el.name === tag)];
      setShow(temp[0]["isVisible"]);
    }
  }, [ColumnVisible]);
  console.log("table cell");
  return show ? (
    <div className={header ? styles.header : styles.cell}>
      <NameLabel title={headerTitle} />
    </div>
  ) : null;
};

export default TableCell;
