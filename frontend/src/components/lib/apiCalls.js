export const getList = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await response.json();
  return result;
};

export const getRow = async (url, id) => {
  const response = await fetch(url + '/' + id, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await response.json();
  return result;
};

export const insertUpdateRow = async (url, obj) => {
  let body = {};
  for (let key in obj) {
    // empty values as "" may violate database constrains, so change to undefined
    body[key] = obj[key] === '' ? undefined : obj[key];
  }
  if (obj.id === null) {
    body.id = undefined;
  }
  const response = await fetch(url, {
    method: obj.id === null ? 'POST' : 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
};
