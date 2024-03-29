const fs = require('fs');
const { resolvePath } = require('../utils');
const dataFilePath = resolvePath('./service/database/data.json');
const updateFilePath = resolvePath('./service/database/update.json');

class HomeService { 
  getList () {
    return new Promise((resolve, reject) => {
      const rs = fs.createReadStream(dataFilePath, 'utf8')

      let bufferArr = [];

      rs.on('data', (chunk) => {
        bufferArr.push(chunk);
      })

      rs.on('end', () => {
        resolve(bufferArr.toString())
      })

      rs.on('error', (err) => {
        reject(err);
      })
    }).catch (err => {
      return Promise.reject(err)
    })
  }

  updateList (content) {
    return new Promise((resolve, reject) => {
      const ws = fs.createWriteStream(updateFilePath)
      const data = JSON.stringify(content, null, 2);

      ws.write(data)

      ws.end('finish', () => {
        resolve(data)
      })

      ws.on('error', (err) => {
        reject(err);
      })
      ws.end();
    }).catch (err => {
      return Promise.reject(err)
    })
  }
}

module.exports = new HomeService()
