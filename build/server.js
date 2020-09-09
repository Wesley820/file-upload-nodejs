"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/*
|--------------------------------------------------------------------------
| HTTP server
|--------------------------------------------------------------------------
|
| This file imports a new http server instance.
|
*/

var _app = require('./start/app'); var _app2 = _interopRequireDefault(_app);

_app2.default.listen(process.env.PORT || 3333);
