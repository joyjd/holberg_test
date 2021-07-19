import { AppState } from "./index";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import CommunicationService from "./../services/communication";
import { HttpMethod, HttpContentType } from "./../types";

export interface SiteState {
  Token: TokenSiteState;
  MetaInfo: MetaInfoState;
  StudyList: StudyListState;
  ColumnVisible: ColumnVisibleState;
}
export interface ColumnVisibleItems {
  name: string;
  isVisible: boolean;
}
export interface ColumnVisibleState {
  items: ColumnVisibleItems[];
}
export interface TokenSiteState {
  accessToken: string;
  authHeader: string;
  errorDescription: string;
  expiresIn: number;
  scope: string;
  temporarySession: boolean;
  tokenType: string;
}
export interface nameState {
  primaryValue: string;
  secondaryValue: string;
}
export interface ColumnsMetaInformationResultState {
  name: nameState;
  dataType: number;
  propertyNameInternal: string;
  propertyName: string;
  order: number;
  isVisible: boolean;
  isFrozen: boolean;
  isSearchable: boolean;
  isMultiSelect: boolean;
  isCategorical: boolean;
  isACollection: boolean;
  width: number;
  endPoint: string;
  isSortable: boolean;
}
export interface conditionsResult {
  columnName: string;
  dataType: number;
  value: string;
  conditionType: number;
}
export interface nestedConditionsResult {}
export interface filterCriteriaResult {
  conditions: conditionsResult[];
  nestedConditions: nestedConditionsResult[];
  operator: number;
}

export interface sortCriteriaResult {
  sortOrder: number;
  columnName: string;
  sortDirection: number;
}
export interface MetaInfoState {
  columnsMetaInformation: ColumnsMetaInformationResultState[];
  filterCriteria: filterCriteriaResult;
  sortCriteria: sortCriteriaResult[];
}

export interface StudyListState {
  data: [];
  pagedMetaData: object;
}

interface SetToken extends Action<string> {
  payload: TokenSiteState;
}

interface SetMetaInfo extends Action<string> {
  payload: MetaInfoState;
}

interface SetStudyList extends Action<string> {
  payload: StudyListState;
}
interface SetColumnVisible extends Action<string> {
  payload: ColumnVisibleState;
}
export const setToken = (payload: TokenSiteState): SetToken => ({
  type: "SETTOKEN",
  payload,
});
export const setMetaInfo = (payload: MetaInfoState): SetMetaInfo => ({
  type: "SETMETAINFO",
  payload,
});
export const setStudyList = (payload: StudyListState): SetStudyList => ({
  type: "SETSTUDYLIST",
  payload,
});
export const setColumnVisible = (payload: ColumnVisibleState): SetColumnVisible => ({
  type: "SETCOLUMNVISIBLE",
  payload,
});
export type SiteSelectorAction = SetToken | SetMetaInfo | SetStudyList | SetColumnVisible;

export const fetchToken = (): ThunkAction<Promise<boolean>, AppState, null, SetToken> => {
  return async (dispatch) => {
    return CommunicationService(
      {
        method: HttpMethod.POST,
        requestType: HttpContentType.JSON,
        body: JSON.stringify({ token: "test:string" }),
      },
      "https://api.f3.k.scoreeeg.com/api/v1/account/token"
    )
      .then((result: TokenSiteState) => {
        dispatch(setToken(result));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};

export const fetchMetaInfo = (token: string): ThunkAction<Promise<boolean>, AppState, null, SetMetaInfo> => {
  return async (dispatch) => {
    return CommunicationService(
      {
        method: HttpMethod.GET,
        requestType: HttpContentType.TEXT,
        bearer: token,
      },
      "https://api.f3.k.scoreeeg.com/api/v1/studyList/metaInfo"
    )
      .then((result: MetaInfoState) => {
        dispatch(setMetaInfo(result));
        const { columnsMetaInformation } = result;
        const temp: ColumnVisibleItems[] = [];
        columnsMetaInformation.forEach((el) => {
          const { name, isVisible, propertyName } = el;
          temp.push({
            name: propertyName,
            isVisible: isVisible,
          });
        });
        dispatch(updateColumnVisibility({ items: temp }));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};

export const updateColumnVisibility = (result: ColumnVisibleState) => {
  return async (dispatch: (arg0: SetColumnVisible) => void) => {
    dispatch(setColumnVisible(result));
  };
};

export const fetchStudyList = (token: string): ThunkAction<Promise<boolean>, AppState, null, SetStudyList> => {
  return async (dispatch) => {
    return CommunicationService(
      {
        method: HttpMethod.POST,
        requestType: HttpContentType.JSON,
        bearer: token,
        body: JSON.stringify({ sortCriteria: [{ sortOrder: 1, columnName: "StudyStart", sortDirection: 1 }] }),
      },
      "https://api.f3.k.scoreeeg.com/api/v1/studyList"
    )
      .then((result: StudyListState) => {
        dispatch(setStudyList(result));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};
