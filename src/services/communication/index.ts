import { httpOptions, HttpMethod, httpHeader } from "./../../types";

const CommunicationService = async (options: httpOptions, url: string) => {
  const option: httpHeader = {
    method: options.method || HttpMethod.POST,
    headers: new Headers(options.bearer ? { "content-type": options.requestType, authorization: options.bearer } : { "content-type": options.requestType }),
    body: options.body,
  };

  return await fetch(url, option).then((response) => response.json());
};

export default CommunicationService;
