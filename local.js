var request = require("request");

function exeReq(){
    request("http://45.78.57.90:3000/getip",function(err,response,body){
        if(err){
            console.log(err);
        }else if(response.statusCode !== 200){
            console.log(response.statusCode);
        }else{
            console.log(body);
        }
        // process.exit();
    });
}

exeReq();
// setInterval(exeReq,1000*60);