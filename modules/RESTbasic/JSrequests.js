var http = require('http');
var querystring = require('querystring');
var Method = require('./methods');

var defaultParams = {
    host:"127.0.0.1",
    port : 3000,
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IllPVUxJTkxJTiIsImlhdCI6MTUyNDY0MjA5OSwiZXhwIjoxNTU2MTc4MDk5fQ.9BYoyySFagsQUdR7LmVOqWugEiKU_F0c41jRQF8ZQh4"
};

var callbackRes = null;

var postData;

var options = {
    host: "",
    path: "",
    method: "",
    headers: {}
};

module.exports ={

    setRes: function(res){
        callbackRes = res;
    },

    setOptions: function(method, apiStr, data, host, port, token ) {
        options = {
            host: "",
            path: "",
            method: "",
            headers: {}
        };

        //Set up the host
        if (typeof host !== 'undefined' ) {
            options.host = host;
        }
        else {
            options.host = defaultParams.host;
        }

        //Set up the port
        if (typeof port !== 'undefined') {
            options.port = port;
        }
        else
        {
            options.port = defaultParams.port;
        }

        //Set up the token
        if(typeof token !== 'undefined')
        {
            options.headers['x-access-token'] = token;
        }
        else
        {
            //throw new Error('please give a API access token!');
            options.headers['x-access-token'] = defaultParams.token;
        }

        //if it is the GET method,
        if(typeof method !== 'undefined' && method === Method.GET) {

            options.method = method;

            if (typeof data !== 'undefined') {
                options.path = apiStr + '?' + querystring.stringify(data);
            }
            else {
                options.path = apiStr;
            }
        }

        //if it is the POST method
        else if (typeof method !== 'undefined' && method === Method.POST)
        {
            // the data must be defined in POST method
            if (typeof data !== 'undefined') {
                options.method = method;
                options.path = apiStr;
                options.headers['Content-Type'] = "application/json";
                postData = JSON.stringify(data);
                options.headers['Content-Length'] = postData.length;
            }
            else
            {
                throw new Error('please provide uploading data!');
            }
        }

        //if it is the PUT method
        else if (typeof method !== 'undefined' && method === Method.PUT){
            // the data must be defined in PUT method
            if (typeof data !== 'undefined') {
                options.method = method;
                options.path = apiStr;
                options.headers['Content-Type'] = "application/json";
                postData = JSON.stringify(data);
                options.headers['Content-Length'] = postData.length;
            }
            else
            {
                throw new Error('please provide uploading data!');
            }
        }

        // if it is the DELETE method
        else if (typeof method !== 'undefined' && method === Method.DELETE){
            // the data must be defined in DELETE method
            if (typeof  data !== 'undefined') {
                options.method = method;
                options.path = apiStr;
                options.headers['Content-Type'] = "application/json";
                postData = JSON.stringify(data);
                options.headers['Content-Length'] = postData.length;
            }
            else
            {
                throw new Error('please provide uploading data!');
            }
        }

        // throw an error, a method shall must be defined
        else {
            throw new Error('please give define a validated API method !');
        }

        return options;
    },

    sendRequest: function(callback){

        console.log("options: " + options);

        // initial a http request
        var req = http.request(options, function(res) {

            res.setEncoding('utf-8');
            var responseString = '';

            res.on('data', function(data) {
                responseString += data;
            });

            res.on('end', function() {
                console.log("response: " + responseString);
                var responseObject = JSON.parse(responseString);
                callback(responseObject,callbackRes);
            });
        });

        // set the uploading data, if the method is POST, PUT, or DELETE
        if(options.method === Method.POST ||
            options.method === Method.PUT ||
            options.method === Method.DELETE)
        {
            console.log("postData: " + postData);
            req.write(postData);
        }

        // set the request, if there is an error, out put the error
        req.on('error', function(e) {
            console.error(e);
        });

        // close the request
        req.end();
    }
}