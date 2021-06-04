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
    let { OPENID, APPID, UNIONID } = cloud.getWXContext()
    let order = "insert into calendar values( 0, '" + event.addDate + "', '" + event.addTime + "', '" + event.addContent + "', '" + OPENID + "');";
    connection.execute(order);

  return {
    OPENID
  }
   
  } catch (err) {
    console.log("链接错误", err)
    return err
  }
}
