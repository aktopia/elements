import isEmpty from 'lodash/isEmpty';

export const rpcGet = async <T>(id: string, params: T) => {
  const key = encodeURIComponent(id);
  const urlJson = isEmpty(params) ? null : encodeURIComponent(JSON.stringify(params));
  const url = `/api/rpc/${key}?json=${urlJson}`;

  const res = await fetch(url);
  const json = await res.json();

  return json.data;
};

export const rpcPost = async (id: string, params: Record<string, any>) => {
  const key = encodeURIComponent(id);
  const url = `/api/rpc/${key}`;

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
