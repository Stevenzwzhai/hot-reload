'use strict';

var _ws = require('./ws.js');

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('test js');
var oBtn = document.createElement('button');
oBtn.innerHTML = "click";
var oBody = document.querySelector('body');
oBody.appendChild(oBtn);

(0, _ws2.default)();