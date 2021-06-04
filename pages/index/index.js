// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    addDate: '2021-05-20',
    addTime: '12:30',
    inputContent: '',
    addContent: '',
    onOffAdd: true,
    changeNum: 0,
    currentDay: 0,
    weekDay: [],
    firstList: [],
    secondList: [],
    thirdList: [],
    fourList: [],
    fiveList: [],
    sixList: [],
    sevenList: [],
  },

  onLoad: function(e) {
    let that = this
    wx.cloud.callFunction({
      name: 'getCalendar',
    }).then((res) => {
        let nDate = new Date();
        let dayNum = (new Date(nDate.getFullYear(), nDate.getMonth() + 1, 0)).getDate()
        for (let j = 0; j < 7; j++) {
          for (let i = 0 ; i < res.result.rows.length ; i++) {
            let myDate = new Date(res.result.rows[i].c_day);
            let nMonth = nDate.getMonth() + 1;
            let nDay = nDate.getDate();
            if ((nDay + j) > dayNum) {
              nMonth = nMonth + 1;
              nDay = nDay + j - dayNum; 
            } else {
              nDay = nDay + j;
            }
            if (myDate.getFullYear() === nDate.getFullYear()) {
              if (myDate.getMonth() + 1 === nMonth) {
                if (myDate.getDate() === nDay) {
                  let mTime = res.result.rows[i].c_time.split(':')[0] + ":" + res.result.rows[i].c_time.split(':')[1];
                  let data = {id: res.result.rows[i].id, day: nMonth + "." + nDay, time: mTime, content: res.result.rows[i].c_content} ;  
                  if (j === 0) {
                    // let nHour = nDate.getHours();
                    // let nMinute = nDate.getMinutes();
                    // if (nHour <= res.result.rows[i].c_time.split(':')[0]) {
                    //   if (nMinute <= res.result.rows[i].c_time.split(':')[1]) {
                        let firstList = that.data.firstList;
                        if (firstList.length == 0) {
                          firstList.push(data);
                          that.setData({
                            firstList: firstList
                          })
                        } else {
                          let num = firstList.length
                          for (let k = 0 ; k < num; k++) {
                            if (firstList[k].id != data.id && k == (num - 1) ) {
                              firstList.push(data); 
                              that.setData({
                                firstList: firstList
                              })
                            } else if (firstList[k].id == data.id) {
                              break;
                            }
                          }
                        }
                    //   }
                    // }
                  }
                  if (j === 1) {
                    let secondList = that.data.secondList;
                    if (secondList.length == 0) {
                      secondList.push(data);
                      that.setData({
                        secondList: secondList
                      })
                    } else {
                      let num = secondList.length
                      for (let k = 0 ; k < num; k++) {
                        if (secondList[k].id != data.id && k == (num - 1) ) {
                          secondList.push(data); 
                          that.setData({
                            secondList: secondList
                          })
                        } else if (secondList[k].id == data.id) {
                          break;
                        }
                      }
                    }
                  }
                  if (j === 2) {
                    let thirdList = that.data.thirdList;
                    if (thirdList.length == 0) {
                      thirdList.push(data);
                      that.setData({
                        thirdList: thirdList
                      })
                    } else {
                      let num = thirdList.length
                      for (let k = 0 ; k < num; k++) {
                        if (thirdList[k].id != data.id && k == (num - 1) ) {
                          thirdList.push(data); 
                          that.setData({
                            thirdList: thirdList
                          })
                        } else if (thirdList[k].id == data.id) {
                          break;
                        }
                      }
                    }
                  }
                  if (j === 3) {
                    let fourList = that.data.fourList;
                    if (fourList.length == 0) {
                      fourList.push(data);
                      that.setData({
                        fourList: fourList
                      })
                    } else {
                      let num = fourList.length
                      for (let k = 0 ; k < num; k++) {
                        if (fourList[k].id != data.id && k == (num - 1) ) {
                          fourList.push(data); 
                          that.setData({
                            fourList: fourList
                          })
                        } else if (fourList[k].id == data.id) {
                          break;
                        }
                      }
                    }
                  }
                  if (j === 4) {
                    let fiveList = that.data.fiveList;
                    if (fiveList.length == 0) {
                      fiveList.push(data);
                      that.setData({
                        fiveList: fiveList
                      })
                    } else {
                      let num = fiveList.length
                      for (let k = 0 ; k < num; k++) {
                        if (fiveList[k].id != data.id && k == (num - 1) ) {
                          fiveList.push(data); 
                          that.setData({
                            fiveList: fiveList
                          })
                        } else if (fiveList[k].id == data.id) {
                          break;
                        }
                      }
                    }
                  }
                  if (j === 5) {
                    let sixList = that.data.sixList;
                    if (sixList.length == 0) {
                      sixList.push(data);
                      that.setData({
                        sixList: sixList
                      })
                    } else {
                      let num = sixList.length
                      for (let k = 0 ; k < num; k++) {
                        if (sixList[k].id != data.id && k == (num - 1) ) {
                          sixList.push(data); 
                          that.setData({
                            sixList: sixList
                          })
                        } else if (sixList[k].id == data.id) {
                          break;
                        }
                      }
                    }
                  }
                  if (j === 6) {
                    let sevenList = that.data.sevenList;
                    if (sevenList.length == 0) {
                      sevenList.push(data);
                      that.setData({
                        sevenList: sevenList
                      })
                    } else {
                      let num = sevenList.length
                      for (let k = 0 ; k < num; k++) {
                        if (sevenList[k].id != data.id && k == (num - 1) ) {
                          sevenList.push(data); 
                          that.setData({
                            sevenList: sevenList
                          })
                        } else if (sevenList[k].id == data.id) {
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
    })
    // console.log(this.data.thirdList)
    // console.log(this.data.thirdList.length)
    let myDate = new Date();
    let week = myDate.getDay();
    let weekName = ['周天', '周一', '周二', '周三', '周四', '周五', '周六'];
    let now0 = "";
    let now1 = "";
    let now2 = "";
    let now3 = "";
    let now4 = "";
    let now5 = "";
    let now6 = "";
    let toDay = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
    let toTime = myDate.getHours() + ':' + myDate.getMinutes();
    if (this.data.firstList.length != 0) {
      now0 = weekName[week] + '*';
    } else {
      now0 = weekName[week];
    }
    if (this.data.secondList.length != 0) {
      now1 = weekName[(week + 1) % 7] + '*';
    } else {
      now1 = weekName[(week + 1) % 7];
    }
    if (this.data.thirdList.length != 0) {
      now2 = weekName[(week + 2) % 7] + '*';
    } else {
      now2 = weekName[(week + 2) % 7];
    }
    if (this.data.fourList.length != 0) {
      now3 = weekName[(week + 3) % 7] + '*';
    } else {
      now3 = weekName[(week + 3) % 7];
    }
    if (this.data.fiveList.length != 0) {
      now4 = weekName[(week + 4) % 7] + '*';
    } else {
      now4 = weekName[(week + 4) % 7];
    }
    if (this.data.sixList.length != 0) {
      now5 = weekName[(week + 5) % 7] + '*';
    } else {
      now5 = weekName[(week + 5) % 7];
    }
    if (this.data.sevenList.length != 0) {
      now6 = weekName[(week + 6) % 7] + '*';
    } else {
      now6 = weekName[(week + 6) % 7];
    }
    this.setData({
      inputContent: '',
      addDate: toDay,
      addTime: toTime,
      changeNum: 0,
      weekDay: [now0, now1, now2, now3, now4, now5, now6],
    })
  },

  //swiper切换时会调用
  dayChange: function (e) {
    if ("touch" === e.detail.source) {
      let currentDayIndex = this.data.currentDay
      currentDayIndex = (currentDayIndex + 1) % 7
      this.setData({
        currentDay: currentDayIndex
      })
    }
  },
  //用户点击tab时调用
  dayClick: function (e) {
    let currentDayIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentDay: e.currentTarget.dataset.idx
      })
  },
  changeDayName: function () {
    if (this.data.changeNum == 0) {
      let myDate = new Date();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      let now0 = "";
      let now1 = "";
      let now2 = "";
      let now3 = "";
      let now4 = "";
      let now5 = "";
      let now6 = "";
      let dayNum = (new Date(myDate.getFullYear(), month, 0)).getDate()
      if (this.data.firstList.length != 0) {
        now0 = month + '.' + day + '*';
      } else {
        now0 = month + '.' + day;
      }
      if (this.data.secondList.length != 0) {
        if ((day + 1) <= dayNum) {
          now1 = month + '.' + (day + 1) + '*';
        } else {
          now1 = (month + 1) + '.' + (day + 1 - dayNum) + '*';
        }
      } else {
        if ((day + 1) <= dayNum) {
          now1 = month + '.' + (day + 1);
        } else {
          now1 = (month + 1) + '.' + (day + 1 - dayNum);
        }
      }
      if (this.data.thirdList.length != 0) {
        if ((day + 2) <= dayNum) {
          now2 = month + '.' + (day + 2) + '*';
        } else {
          now2 = (month + 1) + '.' + (day + 2 - dayNum) + '*';
        }
      } else {
        if ((day + 2) <= dayNum) {
          now2 = month + '.' + (day + 2);
        } else {
          now2 = (month + 1) + '.' + (day + 2 - dayNum);
        }
      }
      if (this.data.fourList.length != 0) {
        if ((day + 3) <= dayNum) {
          now3 = month + '.' + (day + 3) + '*';
        } else {
          now3 = (month + 1) + '.' + (day + 3 - dayNum) + '*';
        }
      } else {
        if ((day + 3) <= dayNum) {
          now3 = month + '.' + (day + 3);
        } else {
          now3 = (month + 1) + '.' + (day + 3 - dayNum);
        }
      }
      if (this.data.fiveList.length != 0) {
        if ((day + 4) <= dayNum) {
          now4 = month + '.' + (day + 4) + '*';
        } else {
          now4 = (month + 1) + '.' + (day + 4 - dayNum) + '*';
        }
      } else {
        if ((day + 4) <= dayNum) {
          now4 = month + '.' + (day + 4);
        } else {
          now4 = (month + 1) + '.' + (day + 4 - dayNum);
        }
      }
      if (this.data.sixList.length != 0) {
        if ((day + 5) <= dayNum) {
          now5 = month + '.' + (day + 5) + '*';
        } else {
          now5 = (month + 1) + '.' + (day + 5 - dayNum) + '*';
        }
      } else {
        if ((day + 5) <= dayNum) {
          now5 = month + '.' + (day + 5);
        } else {
          now5 = (month + 1) + '.' + (day + 5 - dayNum);
        }
      }
      if (this.data.sevenList.length != 0) {
        if ((day + 6) <= dayNum) {
          now6 = month + '.' + (day + 6) + '*';
        } else {
          now6 = (month + 1) + '.' + (day + 6 - dayNum) + '*';
        }
      } else {
        if ((day + 6) <= dayNum) {
          now6 = month + '.' + (day + 6);
        } else {
          now6 = (month + 1) + '.' + (day + 6 - dayNum);
        }
      }
      this.setData({
        changeNum: 1,
        weekDay: [now0, now1, now2, now3, now4, now5, now6],
      })
    }
    else if (this.data.changeNum == 1) {
      let myDate = new Date();
      let week = myDate.getDay();
      let weekName = ['周天', '周一', '周二', '周三', '周四', '周五', '周六'];
      let now0 = "";
      let now1 = "";
      let now2 = "";
      let now3 = "";
      let now4 = "";
      let now5 = "";
      let now6 = "";
      if (this.data.firstList.length != 0) {
        now0 = weekName[week] + '*';
      } else {
        now0 = weekName[week];
      }
      if (this.data.secondList.length != 0) {
        now1 = weekName[(week + 1) % 7] + '*';
      } else {
        now1 = weekName[(week + 1) % 7];
      }
      if (this.data.thirdList.length != 0) {
        now2 = weekName[(week + 2) % 7] + '*';
      } else {
        now2 = weekName[(week + 2) % 7];
      }
      if (this.data.fourList.length != 0) {
        now3 = weekName[(week + 3) % 7] + '*';
      } else {
        now3 = weekName[(week + 3) % 7];
      }
      if (this.data.fiveList.length != 0) {
        now4 = weekName[(week + 4) % 7] + '*';
      } else {
        now4 = weekName[(week + 4) % 7];
      }
      if (this.data.sixList.length != 0) {
        now5 = weekName[(week + 5) % 7] + '*';
      } else {
        now5 = weekName[(week + 5) % 7];
      }
      if (this.data.sevenList.length != 0) {
        now6 = weekName[(week + 6) % 7] + '*';
      } else {
        now6 = weekName[(week + 6) % 7];
      }
      this.setData({
        changeNum: 0,
        weekDay: [now0, now1, now2, now3, now4, now5, now6],
      })
    }
  },
  addEvent: function () {
    this.setData({
      onOffAdd: !this.data.onOffAdd
    })
  },
  delEvent: function (event) {
    let that = this;
    wx.showModal({
      title: '请确认删除',
      success: function(res) {
        if (res.confirm) {
          wx.cloud.callFunction ({
            name: 'deleteEvent',
            data:{
              delId: event.currentTarget.dataset.id
            },
          }).then((res) => {
            // console.log("success")
            that.setData({
              firstList: [],
              secondList: [],
              thirdList: [],
              fourList: [],
              fiveList: [],
              sixList: [],
              sevenList: [],
            })
            that.onLoad();
          })
          wx.showToast({
            title: "删除成功",
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  cancelAdd: function () {
    console.log("用户取消添加日程");
    this.setData({
      onOffAdd: !this.data.onOffAdd
    })
    this.onLoad();
  },
  confirmAdd: function (e) {
    let that = this;
    console.log("用户确认添加日程");
    wx.cloud.callFunction({
      name: 'insertEvent',
      data:{
        addDate: this.data.addDate,
        addTime: this.data.addTime,
        addContent: this.data.addContent,
      },
    }).then((res) => {
      console.log("success")
      that.setData({
        firstList: [],
        secondList: [],
        thirdList: [],
        fourList: [],
        fiveList: [],
        sixList: [],
        sevenList: [],
      })
      that.onLoad();
    })
    this.setData({
      onOffAdd: !this.data.onOffAdd,
    })
    wx.showToast({
      title: "添加成功",
    });
  },
  addContent: function (e) {
    this.setData({
      addContent: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      addDate: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      addTime: e.detail.value
    })
  },
})