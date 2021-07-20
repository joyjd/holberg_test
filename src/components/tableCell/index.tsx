import React, { useEffect, useState, useCallback } from "react";
import styles from "./tableCell.module.css";
import NameLabel from "./../../utils/nameLabel";
import { AppState } from "./../../store";
import { SiteState } from "./../../store/siteselector.action";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  headerTitle: string;
  header: boolean;
  tag: string;
}
const TableCell: React.FC<Props> = ({ headerTitle, header, tag }) => {
  const { ColumnVisible } = useSelector((state: AppState) => state.siteSelectorReducer) as SiteState;
  const [show, setShow] = useState(true);

  const changeDisplay = useCallback((state: boolean) => {
    setShow(state);
  }, []);

  const handleDisplay = useCallback(() => {
    if (ColumnVisible.items.length > 0) {
      let temp = [...ColumnVisible.items.filter((el) => el.name === tag)];
      changeDisplay(temp[0]["isVisible"]);
    }
  }, [ColumnVisible.items, changeDisplay, tag]);

  useEffect(() => {
    handleDisplay();
  }, [ColumnVisible, handleDisplay]);

  return show ? (
    <div className={header ? styles.header : styles.cell}>
      <NameLabel title={headerTitle} />
    </div>
  ) : null;
};

export default React.memo(TableCell);
