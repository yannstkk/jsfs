module.exports.home = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>HOME PAGE</h1>');
    res.end();
};