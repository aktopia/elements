import { base64UrlEncodeObject, emptyObject } from '@elements/utils';

export const rpcGet = async <Params, Result>(
  id: string,
  params: Params | {} = emptyObject
): Promise<Result> => {
  const url = `/api/rpc/${id}?q=${base64UrlEncodeObject(params)}`;

  const res = await fetch(url);
  const json = await res.json();

  return json.data;
};

export const rpcPost = async (id: string, params: Record<string, any> = {}) => {
  const url = `/api/rpc/${id}`;

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();

  return json.data;
};
