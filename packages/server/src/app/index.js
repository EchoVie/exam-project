const Koa = require('koa')
const { default: bodyParser } = require('koa-body'); 
const cors = require('@koa/cors');
const error = require('koa-json-error');
const useRoutes = require('../router')
const app = new Koa()

app.use(bodyParser());
app.use(cors());
app.use(error({
  postFormat(e, { stack, ...rest }) {
    return process.env.NODE_ENV === 'production' ? rest : { stack, ...rest}
  }
}));
useRoutes(app)

module.exports = app

