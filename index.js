var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true })
nightmare
	.goto('http://yahoo.com')
	.screenshot('yahoocom.png')
	.then(function(r){ console.log(r); });
