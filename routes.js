// JavaScript source code
//在导入的包后面加上括号，立即执行
const routes = require('next-routes')();


routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/:address/requests', '/campaigns/requests/index')
    .add('/campaigns/:address/requests/new', '/campaigns/requests/new')


module.exports = routes;