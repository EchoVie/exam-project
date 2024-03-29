const path = require('path');
const resolvePath = (relativePath) => path.resolve(process.cwd(), './src', relativePath);

module.exports = {
  resolvePath
}