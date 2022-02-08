const http = require('http');

const PORT = 3000;

const server = http.createServer();


const friends = [
    {
        id: 0,
        name: 'India'
    },
    {
        id: 1,
        name: 'USA'
    },
    {
        id: 2,
        name: 'Africa'
    }
];

server.on('request', (req, res) => {
    const items = req.url.split('/');
    if (items[1] === '') {
        res.statusCode = 200;
        res.setHeader = ('Content-Type', 'application/json');
        res.end(
            "Welcome"
        );
    } else if (req.method === 'POST' && items[1] === 'data') {

      req.on('data', (data)=>{
         console.log(data.toString());
         friends.push(JSON.parse(data.toString()));
         

      });

      req.pipe(res);
    }else if (req.method === 'GET' && items[1] === 'data') {
        res.statusCode = 200;
        res.setHeader = ('Content-Type', 'application/json');
        if (items.length === 3) {
            let a = friends.findIndex(x => x.id === Number(items[2]));
            console.log(Number(a));
            res.end(JSON.stringify(friends[Number(a)]));
        } else {
            res.end(JSON.stringify(friends));
        }
    }
    else if (req.method === 'GET' && items[1] === 'messages') {

        res.setHeader = ('Content-Type', 'plain/text');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Isaac!</li>');
        res.write('<ul>');
        res.write('<body>');
        res.write('<html>');

        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});