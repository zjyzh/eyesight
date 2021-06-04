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
      host: "",
      database: "",
      user: "",
      password: ""
    })
    let { OPENID, APPID, UNIONID } = cloud.getWXContext()
    const [rows, fields] = await connection.execute("select id, c_day, c_time, c_content from calendar where openid = '"+ OPENID + "' order by c_time asc;")
    return {
      rows
    }
   
  } catch (err) {
    console.log("链接错误", err)
    return err
  }
}
