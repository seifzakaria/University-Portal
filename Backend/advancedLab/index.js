const app = require('./server.js');
const PORT = 8080;

app.listen(PORT, () => {
    console.log("This server is running");
});