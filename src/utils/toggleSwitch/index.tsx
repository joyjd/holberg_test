import React, { useEffect } from "react";
import Switch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import { SiteState, updateColumnVisibility } from "./../../store/siteselector.action";
import { AppState } from "./../../store";

interface Props {
  index: number;
}

const ToggleSwitch: React.FC<Props> = ({ index }) => {
  const dispatch = useDispatch();
  const { ColumnVisible } = useSelector((state: AppState) => state.siteSelectorReducer) as SiteState;
  const handleChange = (status: boolean) => {
    let temp = [...ColumnVisible.items];
    temp[index].isVisible = !status;
    dispatch(updateColumnVisibility({ items: temp }));
  };
  console.log("switch");
  return ColumnVisible.items.length !== 0 ? <Switch onChange={() => handleChange(ColumnVisible.items[index].isVisible)} checked={ColumnVisible.items[index].isVisible} /> : null;
};

export default ToggleSwitch;
