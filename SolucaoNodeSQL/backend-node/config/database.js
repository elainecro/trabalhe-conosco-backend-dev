const sql = require('mssql');
const connStr = process.env.SQL_URI ? process.env.SQL_URI :"Server=NANE-ACER;Database=PicPay;User Id=sa;Password=masterkey;Timeout=60000;";

//fazendo a conexão global
sql.connect(connStr)
   .then(conn => {
       global.conn = conn
    })
   .catch(err => console.log(err));