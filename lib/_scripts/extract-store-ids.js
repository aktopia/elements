import 'zx/globals';

// Extract ids of useValue and useDispatch and create a mock store object

const valueRgx = /useValue(?:<.*?>)?\([",'](.*)[",'](?:\s*,\s*.*)?\)/g;
const dispatchRgx = /useDispatch\([",'](.*)[",']\)/g;

function valueIdMatches(s) {
  let match;
  const ids = [];
  while (null != (match = valueRgx.exec(s))) {
    ids.push(match[1]);
  }
  return ids.sort();
}

function dispatchIdMatches(s) {
  let match;
  const ids = [];
  while (null != (match = dispatchRgx.exec(s))) {
    ids.push(match[1]);
  }
  return ids.sort();
}

try {
  const path = argv._[0];
  const data = fs.readFileSync(path, 'utf-8');
  const valueIds = valueIdMatches(data);
  const dispatchIds = dispatchIdMatches(data);
  console.dir({
    sub: valueIds.reduce((res, id) => ({ ...res, [id]: '' }), {}),
    evt: dispatchIds,
  });
} catch (e) {
  console.error(e);
}
