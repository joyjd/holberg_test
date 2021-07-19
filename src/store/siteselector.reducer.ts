import { SiteState, SiteSelectorAction, TokenSiteState, MetaInfoState, ColumnVisibleState, StudyListState } from "./siteselector.action";

const siteState: SiteState = {
  Token: {} as TokenSiteState,
  MetaInfo: {} as MetaInfoState,
  StudyList: {} as StudyListState,
  ColumnVisible: {
    items: [],
  },
};

export const siteSelectorReducer = (state = siteState, actions: SiteSelectorAction): SiteState => {
  switch (actions.type) {
    case "SETTOKEN":
      return { ...state, Token: { ...(actions.payload as TokenSiteState) } };
    case "SETMETAINFO":
      return { ...state, MetaInfo: { ...(actions.payload as MetaInfoState) } };
    case "SETSTUDYLIST":
      return { ...state, StudyList: { ...(actions.payload as StudyListState) } };
    case "SETCOLUMNVISIBLE":
      return { ...state, ColumnVisible: { ...(actions.payload as ColumnVisibleState) } };
    default:
      return state;
  }
};
