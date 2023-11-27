import isEmpty from 'lodash/isEmpty';

export const rpcGet = async <Params, Result>(
  id: string,
  params: Params | {} = {}
): Promise<Result> => {
  const urlJson = isEmpty(params) ? null : encodeURIComponent(JSON.stringify(params));
  const url = `/api/rpc/${id}?json=${urlJson}`;

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
