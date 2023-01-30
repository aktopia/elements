import 'zx/globals';

/* Extract keys of t */

const translationRgx = /t\([",'](.*)[",']\)/g;

function tMatches(s) {
  let match;
  const ids = [];
  while (null != (match = translationRgx.exec(s))) {
    ids.push(match[1]);
  }
  return ids;
}

try {
  const path = argv._[0];
  const data = fs.readFileSync(path, 'utf-8');
  const tKeys = tMatches(data);
  console.dir(tKeys.reduce((res, id) => ({ ...res, [id]: '' }), {}));
} catch (e) {
  console.error(e);
}
