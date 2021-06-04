import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
app.globalData.ec_bar
let barChart = null;
let scatterChart = null;
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },
  refresh_page: function () {
  
    let that = this;
    that.setData({
      goOnAble: false
    })
    console.log("按钮")
    wx.showToast({
      title: '刷新中', // 标题
      icon: 'loading', // 图标类型，默认success
      duration: 400 // 提示窗停留时间，默认1500ms
    })
    let result;
    // 第一次从mysql数据库返回信息
    wx.cloud.callFunction({
      name: 'mysql',
      data: {
        sql: " select date(finish_time) as datetime, count(*) as count   from eyesight_task  where openid = \"",
        sql1: "\"group by date(finish_time)  asc;"

      }
    }).then(res => {
      result = res.result.rows
     
      let x_time_data = []
      let y_static_data = []

      for (let i = 0; i < 7; i++) {
        let localTime = new Date()
        // let dateTime = new Date(result[i]["datetime"]);
        localTime = localTime.setDate(localTime.getDate() - i);
        localTime = new Date(localTime);
        x_time_data.unshift(localTime.getMonth() + 1 +
          //月份
          "-" + localTime.getDate()) //日)
        y_static_data.unshift(0)
      }

      for (let i in result) {

        let localTime = new Date()
        let dateTime = new Date(result[i]["datetime"]);

        let timesDiff = Math.abs(localTime.getTime() - dateTime.getTime());
        let diffDays = Math.ceil(timesDiff / (1000 * 60 * 60 * 24)); //向上取整

        y_static_data[7 - diffDays] = result[i]["count"]
      }

      let echar_option = {

        series: [{
          name: '闹钟次数',
          data: y_static_data
        }, ]
      };


      barChart.setOption(echar_option)
      // console.log(barChart)
    })

    wx.cloud.callFunction({
      name: 'mysql',
      data: {
        sql: " select date(c_day) as datetime, count(*) as count   from  calendar  where openid = \"",
        sql1: "\"group by date(c_day)  asc;"
      }
    }).then(res => {
      result = res.result.rows
      // console.log(res) // 3
      // console.log(result) // 3
      let x_time_data = []
      let y_static_data = []

      for (let i = 0; i < 7; i++) {
        let localTime = new Date()
        // let dateTime = new Date(result[i]["datetime"]);
        localTime = localTime.setDate(localTime.getDate() - i);
        localTime = new Date(localTime);
        x_time_data.unshift(localTime.getMonth() + 1 +
          //月份
          "-" + localTime.getDate()) //日)
        y_static_data.unshift(0)
      }

      for (let i in result) {
        let localTime = new Date()
        let dateTime = new Date(result[i]["datetime"]);
        //  dateTime=dateTime.setDate(dateTime.getDate()-name);
        // dateTime=new Date(dateTime);
        let timesDiff = (localTime.getTime() - dateTime.getTime());
        if (timesDiff < 0) {
          continue;
        }
        let diffDays = Math.ceil(timesDiff / (1000 * 60 * 60 * 24)); //向上取整

        // console.log(diffDays, localTime, dateTime)
        y_static_data[7 - diffDays] = result[i]["count"]
      }

      // 返回信息后更新option
      let echar_option = {

        series: [{
          
          name: '日程数',
          data: y_static_data,
          label: {
            normal: {
              show: true,
              position: "inside",
              color:'black',
            }
          },
          itemStyle: {

          }
        }]
      };
      barChart.setOption(echar_option)

    });


    wx.cloud.callFunction({
      name: 'mysql',
      data: {
        sql: " select date(finish_time) as datetime, ROUND(sum(duration)/60) as count   from  eyesight_task  where openid = \"",
        sql1: "\"group by date(finish_time)  asc;"
      }
    }).then(res => {
      result = res.result.rows
      // console.log(res) // 3
      // console.log(result) // 3
      let x_time_data = []
      let y_static_data = []

      for (let i = 0; i < 7; i++) {
        let localTime = new Date()
        // let dateTime = new Date(result[i]["datetime"]);
        localTime = localTime.setDate(localTime.getDate() - i);
        localTime = new Date(localTime);
        x_time_data.push(localTime.getMonth() + 1 +
          //月份
          "-" + localTime.getDate()) //日)
        y_static_data.push(0)
      }

      for (let i in result) {

        let localTime = new Date()
        let dateTime = new Date(result[i]["datetime"]);

        let timesDiff = Math.abs(localTime.getTime() - dateTime.getTime());
        let diffDays = Math.ceil(timesDiff / (1000 * 60 * 60 * 24)); //向上取整

        // console.log(diffDays, localTime, dateTime)
        y_static_data[diffDays - 1] = result[i]["count"]
      }

      let echar_option = {
      
        series: [{
          data: y_static_data
        }, ]
      };
      scatterChart.setOption(echar_option);
      that.setData({
        goOnAble: true
      })
      wx.showToast({
        title: '成功', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 400 // 提示窗停留时间，默认1500ms
      })
      // return scatterChart;
    })


  },
  data: {
    goOnAble: true,
    ecBar: {
      // lazyLoad: true,
      // 首先对ecBar，也就是第一个图像进行初始化
      onInit: function (canvas, width, height, dpr) {


        // 设置画像
        barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);

        // 设置option，这个是最重要的，每个图表的不同就是option的不同，也就是说它决定了图表如何显示
        let demo_option = {
          color: ['#fac858', '#91cc75'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            confine: true
          },
          legend: {
            data: ['闹钟次数', '日程数']
          },
          grid: {
            left: 20,
            right: 20,
            bottom: 15,
            top: 40,
            containLabel: true
          },
          // x轴的数值，具体配置参考文档
          xAxis: [{
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              color: '#666'
            }
          }],
          // y轴的数值
          yAxis: [{
            type: 'category',
            axisTick: {
              show: false
            },
            data: [0, 1, 2, 3, 4, 5, 6],
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            // 下面有个函数，成为formatter，也就是格式化函数，目的是将我们的坐标轴显示的内容进行调整，比如传来的数据是123，你显示的时候想改为123次
            // 就可以写函数
            axisLabel: {
              color: '#666',
              formatter: function (name) {
                let dateTime = new Date();
                dateTime = dateTime.setDate(dateTime.getDate() - name);
                dateTime = new Date(dateTime);
                return dateTime.getMonth() + 1 + "-" + dateTime.getDate();
              }
            }
          }],
          // 这里用的数组来管理数据,因为我们的y轴上有两条数据,所以有两个类别
          series: [{
              name: '闹钟次数',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  color:'#fc5404',
                }
              },
              data: [0, 0, 0, 0, 0, 0, 0],
              itemStyle: {

              }
            },
            // 第二个类别
            {
              name: '日程数',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: "inside",
                  color:'black',
                }
              },
              data: [0, 0, 0, 0, 0, 0, 0],
              itemStyle: {

              }
            }
          ]
        };


        barChart.setOption(demo_option);
        app.globalData.ec_bar = barChart
        // 设置option
        // console.log("barchar",barChart)
        let result;
        // 第一次从mysql数据库返回信息
        wx.cloud.callFunction({
          name: 'mysql',
          data: {
            sql: " select date(finish_time) as datetime, count(*) as count   from eyesight_task  where openid = \"",
            sql1: "\"group by date(finish_time)  asc;"

          }
        }).then(res => {
          result = res.result.rows
          // console.log(res) // 3
          // console.log(result) // 3
          let x_time_data = []
          let y_static_data = []

          for (let i = 0; i < 7; i++) {
            let localTime = new Date()
            // let dateTime = new Date(result[i]["datetime"]);
            localTime = localTime.setDate(localTime.getDate() - i);
            localTime = new Date(localTime);
            x_time_data.unshift(localTime.getMonth() + 1 +
              //月份
              "-" + localTime.getDate()) //日)
            y_static_data.unshift(0)
          }

          for (let i in result) {

            let localTime = new Date()
            let dateTime = new Date(result[i]["datetime"]);
            //  dateTime=dateTime.setDate(dateTime.getDate()-name);
            // dateTime=new Date(dateTime);
            let timesDiff = Math.abs(localTime.getTime() - dateTime.getTime());
            let diffDays = Math.ceil(timesDiff / (1000 * 60 * 60 * 24)); //向上取整

            // console.log(diffDays, localTime, dateTime)
            y_static_data[7 - diffDays] = result[i]["count"]
          }

          let echar_option = {
            yAxis: [{
              data: x_time_data,
              axisLabel: {
                color: '#666',
                formatter: function (name) {
                  let dateTime = new Date(name);
                  let localTime = new Date();
                  let localday = localTime.getDate();
                  if (dateTime.getDate() < localday) {
                    // return dateTime.getDate();
                    return dateTime.getMonth() + 1 + "-" + dateTime.getDate();
                  } else {
                    return localTime.getMonth() + 1 + "-" + localTime.getDate();
                  }
                }
              }
            }],
            series: [{
              data: y_static_data
            }, ]
          };

          barChart.setOption(echar_option);
          return barChart;
        })



        // let result ;
        // 第二次从mysql数据库返回信息
        wx.cloud.callFunction({
          name: 'mysql',
          data: {
            sql: " select date(c_day) as datetime, count(*) as count   from  calendar  where openid = \"",
            sql1: "\"group by date(c_day)  asc;"
          }
        }).then(res => {
          result = res.result.rows
          // console.log(res) // 3
          // console.log(result) // 3
          let x_time_data = []
          let y_static_data = []

          for (let i = 0; i < 7; i++) {
            let localTime = new Date()
            // let dateTime = new Date(result[i]["datetime"]);
            localTime = localTime.setDate(localTime.getDate() - i);
            localTime = new Date(localTime);
            x_time_data.unshift(localTime.getMonth() + 1 +
              //月份
              "-" + localTime.getDate()) //日)
            y_static_data.unshift(0)
          }

          for (let i in result) {
            let localTime = new Date()
            let dateTime = new Date(result[i]["datetime"]);
            //  dateTime=dateTime.setDate(dateTime.getDate()-name);
            // dateTime=new Date(dateTime);
            let timesDiff = (localTime.getTime() - dateTime.getTime());
            if (timesDiff < 0) {
              continue;
            }
            let diffDays = Math.ceil(timesDiff / (1000 * 60 * 60 * 24)); //向上取整

            // console.log(diffDays, localTime, dateTime)
            y_static_data[7 - diffDays] = result[i]["count"]
          }

          // 返回信息后更新option
          let echar_option = {

            series: [{
              name: '日程数',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: "inside",
                  color:'black',
                }
              },
              data: y_static_data,
              itemStyle: {
                // emphasis: {
                //   color: '#67e0e3'
                // }
              }
            }]
          };

          barChart.setOption(echar_option);
          return barChart;
        })

        return barChart;
      }
    },

    ecScatter: {
      onInit: function (canvas, width, height, dpr) {
        scatterChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(scatterChart);
        // scatterChart.setOption(getScatterOption());


        let echar_option = {
          color: ['#67e0e3', '#32c5e9', '#67e0e3'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter(params) {
              // console.log(params[0])
              // console.log(typeof(params))
              return '共' + params[0].data + "分钟";
            }
          },
          legend: {
            data: ['总时间',
              // '正面','负面'
            ]
          },
          grid: {
            left: 20,
            right: 20,
            bottom: 15,
            top: 40,
            containLabel: true
          },
          yAxis: [{
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              color: '#666'
            }
          }],
          xAxis: [{
            type: 'category',
            axisTick: {
              show: false
            },
            data: [0, 1, 2, 3, 4, 5, 6],
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              color: '#666',
              formatter: function (name) {
                let localTime = new Date();
                let dateTime = new Date();
                dateTime = dateTime.setDate(dateTime.getDate() - name);
                dateTime = new Date(dateTime);
                if (dateTime.getTime() < localTime.getTime()) {
                  return dateTime.getDate();
                } else {
                  return dateTime.getMonth() + 1 + "-" + dateTime.getDate();
                }
              },
              interval: 0,
              rotate: 40

            }
          }],
          series: [{
            name: '总时间',
            type: 'bar',
            label: {
              normal: {
                show: false,
                position: 'inside'
              }
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          }, ]
        };


        scatterChart.setOption(echar_option);
        let result;
        wx.cloud.callFunction({
          name: 'mysql',
          data: {
            sql: " select date(finish_time) as datetime, ROUND(sum(duration)/60) as count   from  eyesight_task  where openid = \"",
            sql1: "\"group by date(finish_time)  asc;"
          }
        }).then(res => {
          result = res.result.rows
          // console.log(res) // 3

          // console.log(result) // 3
          let x_time_data = []
          let y_static_data = []

          for (let i = 0; i < 7; i++) {
            let localTime = new Date()
            // let dateTime = new Date(result[i]["datetime"]);
            localTime = localTime.setDate(localTime.getDate() - i);
            localTime = new Date(localTime);
            x_time_data.push(localTime.getMonth() + 1 +
              //月份
              "-" + localTime.getDate()) //日)
            y_static_data.push(0)
          }

          for (let i in result) {

            let localTime = new Date()
            let dateTime = new Date(result[i]["datetime"]);

            let timesDiff = Math.abs(localTime.getTime() - dateTime.getTime());
            let diffDays = Math.ceil(timesDiff / (1000 * 60 * 60 * 24)); //向上取整

            // console.log(diffDays, localTime, dateTime)
            y_static_data[diffDays - 1] = result[i]["count"]
          }

          let echar_option = {
            xAsix: [{
              type: 'category',
              data: x_time_data,
              axisLabel: {
                formatter: function (name) {
                  let dateTime = new Date(name);
                  let localTime = new Date();
                  let localday = localTime.getDate();
                  if (dateTime.getDate() < localday) {
                    return dateTime.getDate();
                  } else {
                    return localTime.getMonth() + 1 + "-" + localTime.getDate();
                  }
                },
                interval: 0,
                rotate: 40
              },
            }],
            series: [{
              data: y_static_data
            }, ]
          };
          scatterChart.setOption(echar_option);
          return scatterChart;
        })

        return scatterChart;
      }
    }
  },
  onReady() {}
});