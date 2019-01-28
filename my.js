/**
 * Node 链接数据库 Test
 * 2019-01-27
 * v4
 */

const express = require('express');
const app = express();
const moment = require('moment')
const cors = require('cors');
app.use(cors());

//解析表单的插件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

//创建数据库连接对象
const mysql = require('mysql');
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'node',
});

//  get表中所有数据
app.get('/api/getUser', (req, res) => {
  const sqlStr = 'select * from user '
  conn.query(sqlStr, (err, results) => {
    if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
    res.json({ err_code: 200, message: results, affextedRows: results.affextedRows })
  })
});

//  按条件查询
app.get('/api/getUserDetail', (req, res) => {
  const number = req.query.number
  const sqlStr = 'select * from user where phone=?'
  conn.query(sqlStr, number, (err, results) => {
    if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
    res.json({ err_code: 200, message: results, affextedRows: results.affextedRows })
  })
});

//添加
app.post('/api/addUser', (req, res) => {
  const user = {
    phone: '18027132812',
    password: '123456',
    nick_name: 'v4',
    up_time: new Date().getTime(),
    login_time: new Date().getTime(),
    register_type: 1
  };
  const sqlStr = 'insert into user set ?'
  conn.query(sqlStr, user, (err, results) => {
    if (err) return res.json({ err_code: 1, message: err, affectedRows: 0 });
    res.json({ err_code: 200, message: '添加数据成功', affectedRows: results.affectedRows });
  })
});

app.listen(3030, () => {
  console.log('正在监听端口3000,http://127.0.0.1:3030');
});
