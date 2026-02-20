module.exports = (err, req , res , next) => {
    console.error(err.stack);

    res.status(err.status || 500).send(`
        <h1>Erreur ${err.status || 500}</h1>
        <p>${err.message}</p>
    `);   
};  