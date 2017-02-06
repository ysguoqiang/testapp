var express = require('express');
var fs = require("fs");
var app = express();

app.get('/sendip', function (req, res) {
    //获取客户端真实IP
    var clientAddr = getLocalIp(req);
    // 获取当前时间
    var date = new Date();
    // 组成log内容，写入到文件中
    var content = date.toLocaleString() + " address is" + clientAddr;
    fs.writeFile("ip.log",content,function(err){
		if (err) {
			return console.error(err);
		}
    });

    res.send(content);
});

app.get('/getip', function (req, res) {
    //读取log文件,并回复给客户端
    fs.readFile("ip.log","utf-8",function(err,data){
        if(err){
            return console.error(err);
        }else{
            res.send(data);
        }
    });    
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


function getLocalIp(req) {
    var ipAddress;
    var headers = req.headers;
    var forwardedIpsStr = headers['x-real - ip'] || headers['x - forwarded -for'];
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
}
