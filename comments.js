// Create web server
// Web server should respond to the following URL requests
// /comments - return a list of comments
// /comments/new - return a form that allows you to create a new comment
// /comments/create - create a new comment

var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var comments = [];

http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname;
    console.log(path);
    switch (path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('Hello, I am a web server!');
            res.end();
            break;
        case '/comments':
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(comments));
            res.end();
            break;
        case '/comments/new':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<form action="/comments/create" method="POST">');
            res.write('<input type="text" name="comment">');
            res.write('<input type="submit" value="Submit">');
            res.write('</form>');
            res.end();
            break;
        case '/comments/create':
            var body = '';
            req.on('data', function(data) {
                body += data;
            });
            req.on('end', function() {
                var post = qs.parse(body);
                comments.push(post.comment);
                res.writeHead(302, {'Location': '/comments'});
                res.end();
            });
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('Page not found');
            res.end();
            break;
    }
}).listen(3000);
console.log('Server running at http://localhost:3000/');