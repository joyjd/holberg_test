import React, { useEffect } from "react";
import styles from "./main.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./../../store";
import { SiteState, fetchToken, fetchMetaInfo, fetchStudyList } from "./../../store/siteselector.action";
import SideMenu from "./../../components/sidemenu";
import TableData from "./../../components/tableData";

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { Token, MetaInfo } = useSelector((state: AppState) => state.siteSelectorReducer) as SiteState;
  const getToken = () => {
    dispatch(fetchToken());
  };
  const getMetaInfo = (token: string) => {
    dispatch(fetchMetaInfo(token));
  };
  const getStudyList = (token: string) => {
    dispatch(fetchStudyList(token));
  };
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (Object.keys(Token).length > 0) {
      getMetaInfo(Token.authHeader);
      getStudyList(Token.authHeader);
    }
  }, [Token]);

  return (
    <div className={styles.container}>
      <aside className={styles.sidePanel}>{MetaInfo.columnsMetaInformation && MetaInfo.columnsMetaInformation.length > 0 ? <SideMenu /> : <> Loading ... </>}</aside>
      <main className={styles.mainPanel}>
        <TableData />
      </main>
    </div>
  );
};

export default Main;
