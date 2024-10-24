const express = require('express');
const app = express();
const routers = require('./routes');
const http = require('http');

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routers);

// app.get('/test', (req, res) => {
//     res.send('Test route working');
// });

const server = http.createServer(app);
server.listen(port,()=>{
    console.log(`app listen to port ${port}`);
});