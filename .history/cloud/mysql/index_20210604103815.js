// 云函数入口函数
// 云函数入口文件
const cloud = require('wx-server-sdk')
//引入mysql操作模块
const mysql = require('mysql2/promise')
cloud.init()
// 云函数入口函数
exports.main = async(event, context) => {
  //链接mysql数据库的test库，这里你可以链接你mysql中的任意库
  try {
    const connection = await mysql.createConnection({
     host: "106.52.180.208",
    database: "eyesight",
    user: "zjy",
    password: "zjy520123"
    })

const wxContext = cloud.getWXContext()
// let sql = 'SELECT * from eyesight_task where openid = \'' + wxContext.OPENID + '\' ;';
console.log(event.sql)
    const [rows, fields] = await connection.execute( event.sql + wxContext.OPENID + event.sql1 )
  
  return {
   
    rows,
    sql:event.sql + wxContext.OPENID + event.sql1,
    // fields,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
   
  } catch (err) {
    console.log("链接错误", err)
    return err
  }
}
