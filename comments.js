//Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer(function(req, res) {
    const method = req.method;
    const urlParsed = url.parse(req.url, true);
    let pathname = urlParsed.pathname;
    let query = urlParsed.query;
    let data = '';
    let comments = [];
    let id = 1;
    let comment = '';

    if (pathname === '/comments' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        fs.readFile('comments.json', 'utf8', (err, data) => {
            if (err) {
                res.end(err);
            }
            res.end(data);
        });
    } else if (pathname === '/comments' && method === 'POST') {
        req.on('data', function(chunk) {
            data += chunk;
        });
        req.on('end', function() {
            comments = JSON.parse(data);
            fs.readFile('comments.json', 'utf8', (err, data) => {
                if (err) {
                    res.end(err);
                }
                comments = JSON.parse(data);
                comment = querystring.parse(data);
                comment.id = id++;
                comments.push(comment);
                fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
                    if (err) {
                        res.end(err);
                    }
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(comment));
                });
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not found' }));
    }
});

server.listen(3000, function() {
    console.log('Server is running on port 3000');
});
