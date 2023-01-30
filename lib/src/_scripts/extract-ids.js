import 'zx/globals';

const valueRgx = /useValue(?:<.*?>)?\([",'](.*)[",']\)/g;
const dispatchRgx = /useDispatch\([",'](.*)[",']\)/g;

function valueIdMatches(s) {
  let match;
  const ids = [];
  while (null != (match = valueRgx.exec(s))) {
    ids.push(match[1]);
  }
  return ids;
}

function dispatchIdMatches(s) {
  let match;
  const ids = [];
  while (null != (match = dispatchRgx.exec(s))) {
    ids.push(match[1]);
  }
  return ids;
}

try {
  const path = argv._[0];
  const data = fs.readFileSync(path, 'utf-8');
  const valueIds = valueIdMatches(data);
  const dispatchIds = dispatchIdMatches(data);
  console.dir({
    read: valueIds.reduce((res, id) => ({ ...res, [id]: '' }), {}),
    dispatch: dispatchIds,
  });
} catch (e) {
  console.error(e);
}
