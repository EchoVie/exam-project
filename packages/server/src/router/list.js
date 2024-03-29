const Router = require("koa-router")
const userRouter = new Router()
const { list, updateList } = require('../controller/list')

userRouter.get('/list', list)
userRouter.post('/updateList', updateList)

module.exports = userRouter
