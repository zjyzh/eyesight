# 目力小助手开发
---
本次开发为一个具有时间和日程管理功能的微信小程序，其使用了后端的云函数作为云开发，通过云函数执行sql语句与后端进行交互。

在项目根目录上面，有名为[目力小助手文档.pdf](./目力小助手文档.pdf)的文档，基本上所有的实现细节都在上面，请看文档

## 项目简介：

在科技不断发展进步的时候，我们打算设计一个利用科技去约束科技的小程序，简单说就是：帮你专注和管理日程。

但是市面上有很多这样的类似软件，种树、番茄闹钟、禅定模式等等等等，但是他们都有个缺点（或者说优点）就是：用户不完成一次设置的时间，就没办法得到奖励或者结束。当我不得不拿起手机的时候，发现自己设置的一个小时已经完成了50分钟，但是却不得不放弃。它有优点：可以通过这种方法约束用户的沉没成本，从而更好的实现效果；但也有缺点，就是无法灵活的记录。

为此，我们也想设计一个更加灵活的专注闹钟小程序，让用户能随时打断，而且每次打断的记录都算作有效，而我们的奖励机制则是通过用户的总时长，而不是次数来进行决定。

本次小程序的定位为日常专注助手，它能帮你保持专注，并且帮你记录日程。它如果检测到页面切换，就会自动暂停计时，然后页面切换回来后会自动继续。我们跟一些倒计时小程序（比如番茄闹钟）不同的是，我们支持自己搜索歌曲作为倒计时的BGM，配上简洁轻快的页面和精美的动态资料统计图，能吸引用户继续使用。

在日程表管理方面，我们选择了简洁为主，允许用户添加任意的日程，而且未来七天的日程会进行呈现。统计页面会统计您过去七天一共添加了多少的日程，在未来的升级我们也会对未来七天的日程进行统计。


### 在部署项目之前，您应该知道：   

1. 基本的微信小程序创建流程
2. 拥有你自己的appid和云环境ID，具体如何申请请百度
3. 知道基本的云函数的实现和`本地调试`
4. 拥有连接mysql数据库的基本知识，并知道怎么创建表


## 项目部署

如果想要部署项目，请更换APPID，并自行将后端数据库进行实现。
### 更换云开发环境
1. 请替换掉appid，换成你申请的appid
2. 请替换环境ID，换成你申请的环境ID
```
   wx.cloud.init({
      env:"eyesight-5gzo",//替换成你的环境ID
      traceUser:"true"
      })
```
3. 请按下面的操作，在mysql数据库中创建表，然后在根目录的cloud文件夹下面，有5个文件，把5个文件链接数据库的部分进行替换，请先本地调试，然后确保云函数能正常运行

### 数据库实现
1. 在你的本地或者远程数据库创建下面的表
```
CREATE TABLE `calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增长的主键,插入的时候不用管他',
  `c_day` date NOT NULL COMMENT '日程表的日期，格式为：2000-01-01，也就是年+横岗+月+横杠+日',
  `c_time` time NOT NULL COMMENT '日程表的时间，格式为：8:59:59，也就是小时+冒号+分钟+冒号+秒',
  `c_content` text COMMENT '日程表的详细信息',
  `openid` varchar(45) DEFAULT NULL COMMENT '唯一的openid',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `time_used` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `study_time` int(11) DEFAULT NULL,
  `work_time` int(11) DEFAULT NULL,
  `sleep_time` int(11) DEFAULT NULL,
  `sports_time` int(11) DEFAULT NULL,
  `openid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `eyesight_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增长的主键',
  `openid` varchar(50) NOT NULL COMMENT '唯一的openid',
  `finish_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '完成一个闹钟的时间点',
  `duration` float DEFAULT '0' COMMENT '一个闹钟的持续时间，格式为：8:59:59，也就是小时+冒号+分钟+冒号+秒，如果不精确的话，那就0:12:00代表12分钟这样',
  `content` varchar(45) DEFAULT NULL COMMENT '完成这件事情的备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4
```
2. 修改本地云函数数据库配置：
在本次项目的5个云函数下面，修改index.js的内容：
```
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
```
3. 确保云函数能正常执行，建议可以本地调试，然后再运行项目

## 总结：
本次项目使用了后端的云开发，部署起来会相对费劲，如果有任何问题，欢迎开issue进行讨论，在项目的根目录下面，有名为[目力小助手](./目力小助手文档.pdf)的文档，基本上所有的实现细节都在上面，感兴趣可以看看。

