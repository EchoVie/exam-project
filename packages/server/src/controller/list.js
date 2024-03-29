const service = require('../service');

class ListController { 
  async list (ctx) {
    const response = await service.getList();
    ctx.body = response
  }

  async updateList (ctx) {
    const request = ctx.request;
    const response = await service.updateList(request.body);
    ctx.body = response
  }
}

module.exports = new ListController()
