/*
 * @author: Thangadurai Nainamalai<duraithanga3@gmail.com>
 */

const path = require('path');
const _root = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server$/.exec(process.argv[1]));
}

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

exports.root = root;
exports.isWebpackDevServer = isWebpackDevServer;
exports.hasProcessFlag = hasProcessFlag;
