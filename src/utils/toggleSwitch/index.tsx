import React, { useEffect, useCallback } from "react";
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
  const handleChange = useCallback(
    (status: boolean) => {
      let temp = [...ColumnVisible.items];
      temp[index].isVisible = !status;
      dispatch(updateColumnVisibility({ items: temp }));
    },
    [ColumnVisible.items, dispatch, index]
  );

  const getData = () => {
    return <Switch onChange={() => handleChange(ColumnVisible.items[index].isVisible)} checked={ColumnVisible.items[index].isVisible} />;
  };
  return ColumnVisible.items.length !== 0 ? getData() : null;
};

export default React.memo(ToggleSwitch);
