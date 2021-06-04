const cloud = require('wx-server-sdk')
//引入mysql操作模块
const mysql = require('mysql2/promise')
cloud.init()
// 云函数入口函数
exports.main = async(event, context) => {
  //链接mysql数据库的test库，这里你可以链接你mysql中的任意库
  try {
    const connection = await mysql.createConnection({
      host: "",
      database: "",
      user: "",
      password: ""
    })
    let { OPENID, APPID, UNIONID } = cloud.getWXContext();
    let order;
    connection.connect();
    if(event.juest == 0){
      order = "insert into eyesight_task values (0,'"
       + OPENID + "', " + event.finish_time + ", " + event.duration + ", " + event.content + ");";
      connection.execute(order);
    }
    const [rows, fields] = await connection.execute('SELECT * from eyesight_task;')
    return order;
  } catch (err) {
    console.log("链接错误", err)
    return err
  }
}