const fs = require('fs');
const fastcsv = require('fast-csv');
const Pool = require('pg').Pool;

let stream = fs.createReadStream('data.csv');
let csvData = [];
let csvStream = fastcsv
    .parse()
    .on('data', (data) => {
        csvData.push(data)
    })
    .on("end", () => {
        csvData.shift();

        const pool = new Pool({
            host: "localhost",
            user: "postgres",
            database: "script_db",
            password: `${process.env.PSQL_PASSWORD}`,
            port: 5432
        });

        const query = "INSERT INTO user_info (Ник, Email, Зарегестрирован, Статус) VALUES ($1, $2, $3, $4)"

        pool.connect((err, client, done) => {
            if (err) throw err;

            try {
                csvData.forEach(row => {
                    client.query(query, row, (err, res) => {
                        if (err) {
                            console.log(err.stack);
                        } else {
                            console.log(`inserted ${res.rowCount} row: ${row}`);
                        }
                    });
                });
            } finally {
                done();
            }
        });
    });

stream.pipe(csvStream);

