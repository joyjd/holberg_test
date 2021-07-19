export enum HttpContentType {
  JSON = "application/json",
  TEXT = "text/plain",
}

export enum HttpMethod {
  POST = "post",
  GET = "get",
}

export interface httpOptions {
  method: HttpMethod;
  body?: any;
  requestType: HttpContentType;
  bearer?: string;
}

export interface httpHeader {
  method: HttpMethod;
  headers: Headers;
  body?: HttpContentType;
}
