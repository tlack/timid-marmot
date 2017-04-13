var MAXTIMEOUT=2000;
var DIRCHECKTIME=100;
var folder='/tmp/screenshotq/';
var newq=folder+'new/';
var workq=folder+'work/';
var outq=folder+'out/';
var n_skipped=0;
console.log('init');

function emit(o) {
	console.log(JSON.encode(o));
}

function start(fn) {
	var start=new Date();
	var start_skipped=n_skipped;
	console.log('starting', fn);
	fs.remove(newq+fn);
	var u=decodeURIComponent(fn);
	console.log('doing screenshot: '+u);
	page.open(u, function() {
		console.log('saving..');
		var wfn=workq+encodeURIComponent(u)+'.png';
		var ofn=outq+encodeURIComponent(u)+'.png';
		page.render(wfn);
		fs.move(wfn,ofn);
		console.log('done', ofn);
		console.log('time', new Date()-start);
		console.log('n_skipped', n_skipped - start_skipped);
		emit(page.viewportSize);
	});
}

function check() {
	var list = fs.list(newq);
	for (var i in list) {
		var fn=list[i];
		if(fn.substr(0,4)=="http") start(fn);
	}
	setTimeout(check, DIRCHECKTIME);
}

var fs=require('fs');
var page=require('webpage').create();
page.onResourceRequested = function(req,netreq) {
	console.log(req.url);
	if(blklist.match(req.url)) {
		console.log('Skipped', req.url);
		n_skipped++;
		netreq.abort();
	}
}
var chars=fs.read('blocked-urls.txt');
// chars=chars.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
chars=chars.replace(/\*/g,'.*');
chars=chars.replace(/\./g,'\\.');
chars=chars.replace(/\?/g,'\\?');
var blklist=chars.split(/\n/);
blklist=new RegExp(blklist.join('|'));
console.log(blklist);

page.settings.resourceTimeout = MAXTIMEOUT;
console.log('running..');
check();

