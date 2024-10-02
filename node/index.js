const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'desafiodb',
}
const mysql = require('mysql2')

const pool = mysql.createPool(config);

app.get('/', (req, res) => {
    const sqlInsert = `INSERT INTO people(name) VALUES(?)`
    const values = [`Renan Souza`]

    pool.query(sqlInsert, values, (insertErr) => {
        if (insertErr) {
            return res.status(500).send('Erro ao inserir no banco de dados')
        }

        const sqlSelect = 'SELECT * FROM people';
        pool.query(sqlSelect, (selectErr, results) => {
            if (selectErr) {
                return res.status(500).send('Erro ao consultar o banco de dados')
            }

            let table = '<table border="1"><tr><th>ID</th><th>Nome</th><th>Criado em</th></tr>'
            results.forEach(row => {
                table += `<tr><td>${row.id}</td><td>${row.name}</td><td>${row.created_at}</td></tr>`
            })
            table += '</table>'

            res.send(`<h1>Full Cycle Rocks!</h1>${table}`)
        })
    })
})

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
})