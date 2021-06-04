const special_minutes = [];
const special_seconds = [];
const app = getApp();

const innerAudioContext = wx.createInnerAudioContext();//create music
innerAudioContext.volume = 0.5;
innerAudioContext.autoplay = true;

function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
  return Y+M+D+h+m+s;
}
var timestamp=Math.round(new Date().getTime()/1000);
// console.log(timestampToTime(timestamp));


for (let i = 0; i <= 59; i++) {
  special_minutes.push(i)
}

for (let i = 0; i <= 59; i++) {
  special_seconds.push(i)
}

function PageChange(element, minutes, seconds) { //更改页面显示
  element.setData({
    magicMinutes: minutes,
    magicSeconds: seconds,
    magicSymbol: ":",
  });
  element.onLoad();
}

function resetTimeControl(element) {
  element.setData({timeControl: 0});
}

function StartClock(element, timeLength) { //开始计时，循环调用TimeFly直到时间为0
  element.setData({
    stopFlagBOOLEAN: false,
    totalSeconds: timeLength,
  });
  element.musicStart();
  var idOfInterval = setInterval(TimeFly, 1000, element);
  element.setData({
    idOfInterval: idOfInterval,
  });
}

function upDateDatabase(element, index) {
  let task = '"' + element.data.task + '"';
  let finish = "'" + timestampToTime(Math.round(new Date().getTime()/1000)) + "'";
  let dur;
  if(index == 0){
    dur = element.data.minutes*60 + element.data.seconds;
  } else {
    dur = element.data.minutes*60 + element.data.seconds - element.data.totalSeconds;
  }
  // console.log(finish);
  // console.log(dur);
  // console.log(task);
  wx.cloud.callFunction({
    name: 'updateTime',
    data:{
      juest: 0,
      finish_time: finish,
      duration: dur,
      content: task,
    },
    success: function(res) {
      // console.log(res.result);
  },
    fail: console.error
  });
  element.setStopState(element);
}

function TimeFly(element) { //时间减少以及调用页面更改的函数，时间为0时停止计时
  PageChange(element, checkTime(Math.floor((element.data.totalSeconds) / 60)), checkTime((element.data.totalSeconds) % 60));
  if (!element.data.totalSeconds && element.data.idOfInterval) {
    clearInterval(element.data.idOfInterval);
    wx.vibrateLong();
    wx.showModal({
      title: '恭喜！',
      showCancel: false,
      content: '成功完成你的计划！',
      success: function(res) {
        if(res.confirm){
          resetData(element);
        } else {
          resetData(element);
        }
      }
    })
    upDateDatabase(element, 0);
  }
  else {
    element.setData({
      totalSeconds: element.data.totalSeconds - 1,
    })
  } 
}

function PauseClock(element) {
  clearInterval(element.data.idOfInterval);
}

function checkTime(i){ 
  if(i<10) 
  { 
    i = "0" + i; 
  } 
  return i; 
}

function resetData(element) {
  element.setData({
    timeControl: 0,
    special_minutes: special_minutes,
    special_seconds: special_seconds,
    magicMinutes: 0,
    magicSeconds: 0,
    magicSymbol: "^",
    minutes: 0,
    seconds: 0,
    symbol: null,
    initZero: 0,
    totalSeconds: 0,
    stopFlagBOOLEAN: true,
    idOfInterval: null,
    task: null,
    tipOnTop: "请选择你想做的事",
    startAble: false,
    goOnAble: false,
    pauseAble: false,
    stopAble: false,
    tomAble: false,
    timeAble: false,
    setAble: true,
    setMusicAble: false,
    okAble: false,
    cancelAble: false,
    searchOrNot: false,
    tryPlayId: '',
    songsResult: [],
    voiceOrNot: false,
    pictureSrc: './ovo.png',
    value: [30, 0],
    winOrNot: false,
    buttonAble: false,
    searchAble: true,
  })
  element.Timer();
}

Page({
  data: {
    // 控制相关
    timeControl: 0,
    //计时相关
    special_minutes: special_minutes,
    special_seconds: special_seconds,
    magicMinutes: 0,
    magicSeconds: 0,
    magicSymbol: "^",
    minutes: 0,
    seconds: 0,
    symbol: null,
    initZero: 0,
    totalSeconds: 0,
    stopFlagBOOLEAN: true,
    idOfInterval: null,
    task: null,
    //按钮相关
    tipOnTop: "请选择你想做的事",
    startAble: true,
    goOnAble: false,
    pauseAble: false,
    stopAble: false,
    tomAble: false,
    timeAble: false,
    setAble: true,
    setMusicAble: false,
    okAble: false,
    cancelAble: false,
    searchOrNot: false,
    songsResult: [],
    winOrNot: false,
    buttonAble: false,
    searchAble: true,
    // 默认主页按钮的样式
    choice: "睡眠",
    work_border:"0px",
        study_border:"0px",
        sleep_border:"0px",
        sport_border:"0px",
    //音频相关
    tryPlayId: '',
    voiceOrNot: false,
    pictureSrc: './ovo.png',
    value: [30, 0],
    musicUrl: 'https://music.163.com/song/media/outer/url?id=1305993204.mp3',
    musicId: 1305993204,
    playStatus: 0,
  },

  Timer: function() {
    this.setData({
      magicMinutes: this.data.minutes,
      magicSeconds: this.data.seconds,
    });
    if (this.data.totalSeconds) {
      this.setData({
        magicSymbol: ':',
      })
    }
    else {
      this.setData({
        magicSymbol: '^',
      })
    }
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.Timer();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.goOnAble){
      wx.showToast({
        title: '继续计时',
      })
      this.ClickOnGo();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.idOfInterval){this.ClickOnPause();}
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    resetData(this);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '"你拉你码呢"',
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '拉到底了',
    });
  },

  bindChange: function (e) {
    const val = e.detail.value;
    this.setData({
      minutes: this.data.special_minutes[val[0]],
      seconds: this.data.special_seconds[val[1]],
    })
  },

  ClickOnOVO: function() {
    if(!this.data.playStatus){
      if(!this.data.voiceOrNot){
        wx.showToast({
          title: '开启静音',
        })
        this.setData({voiceOrNot: true});
      } else {
        wx.showToast({
          title: '关闭静音',
        })
        this.setData({voiceOrNot: false});
        if(!this.data.goOnAble && !this.data.startAble) {
          this.musicStart();
        }
      }
    } else if (this.data.playStatus == 1 && !this.data.voiceOrNot) {
      this.setData({voiceOrNot: true});
      wx.showToast({
        title: '开启静音',
      })
      this.canel_handover();
    } else if (this.data.playStatus == 2 || this.data.voiceOrNot) {
      if(this.data.voiceOrNot){
        this.setData({voiceOrNot: false});
        wx.showToast({
          title: '关闭静音',
        })
      }
      this.musicStart();
    }

  },

  LongOnOVO: function() {
    wx.showToast({
      title: '快松开',
    })
  },

  ClickOnPause: function() {
    let that = this;
    if(that.data.timeControl == 1){
      wx.showModal({
        title: '警告',
        showCancel: false, 
        confirmText: "关你屁事？",
        content: '你点得太快了！',
        success: function (res) {  
          if (res.confirm) {  
            wx.showToast({
              title: '呜呜呜我错了',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '呜呜呜我错了',
              duration: 2000
            })
          }
        }
      })
    }
    else{
      that.setData({timeControl: 1});
      clearInterval(this.data.idOfInterval);
      // console.log("pause" + this.data.timeControl);
      that.canel_handover();
      that.setData({
        pauseAble: false,
        stopAble: true,
        startAble: false,
        goOnAble: true,
        continue_border:"tan 2px solid",
        tomAble: false,
      });
      that.setData({timeControl: 0});
    }
  },

  ClickOnStart: function() {
    this.setData({
      pauseAble: true,
      stopAble: true,
      goOnAble: false,
      startAble: false,
      tomAble: false,
    });
    var timerLength = this.data.totalSeconds;
    if (!this.data.totalSeconds) {
      wx.showToast({
        title: '还没设置时间！',
      });
      return StartClock(this, 1800);
    }
    StartClock(this, timerLength);
  },

  ClickOnSet: function() {
    this.setData({
      startAble: false,
      setAble: true,
      setMusicAble: true,
      okAble: true,
      cancelAble: true,
      timeAble: false,
      winOrNot: false
    });
  },

  ClickOnOk: function() {
    this.setData({
      startAble: true,
      setAble: false,
      setMusicAble: false,
      okAble: false,
      cancelAble: false,
      searchOrNot: false,
      winOrNot: true,
      songsResult: [],
      timeAble: true,
      totalSeconds: this.data.minutes*60 + this.data.seconds,
    });
    let toDo;
    switch (this.data.task) {
      case 'work': toDo = "工作";
        break;
      case 'study': toDo = "学习";
        break;
      case 'sports': toDo = "运动";
        break;
      case 'sleep': toDo = "睡眠";
        break;
      default:
        break;
    }
    if (!this.data.totalSeconds){
      this.setData({
        minutes: 30,
        seconds: 0,
        tipOnTop: "还未设定时间，默认"+ toDo +"时长30分"
      })
    }else {
      let tipTop = "本次设定的总" + toDo + "时长为" + 
        this.data.minutes + "分" + this.data.seconds + "秒";
      this.setData({
        tipOnTop: tipTop
      })
    }
    this.Timer();
    this.tryPlayStop();
  },

  ClickOnCancel: function() {
    this.setData({
      startAble: true,
      setAble: false,
      setMusicAble: false,
      okAble: false,
      cancelAble: false,
      searchOrNot: false,
      winOrNot: true,
      songsResult: [],
      timeAble: true,
    });
    this.tryPlayStop();
  },

  ClickOnGo: function() {
    if(this.data.timeControl == 1){
      wx.showModal({
        title: '警告',
        showCancel: false, 
        confirmText: "关你屁事？",
        content: '你点得太快了！',
        success: function (res) {  
          if (res.confirm) {  
            wx.showToast({
              title: '呜呜呜我错了',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '呜呜呜我错了',
              duration: 2000
            })
          }
        }
      })
    }
    else{
      // console.log("go" + this.data.timeControl);
      this.musicStart();
      this.setData({
        pauseAble: true,
        stopAble: true,
        goOnAble: false,
        startAble: false,
        tomAble: false,
      });
      var timerLength = this.data.totalSeconds;
      this.setData({timeControl: 1});
      // setTimeout(StartClock, 1000, this, timerLength);
      StartClock(this, timerLength);
      resetTimeControl(this);
    }
  },

  ClickOnClock: function() {
    let that = this;
    if(!that.data.totalSeconds){
      wx.showModal({
        title: "提示",
        content: "是否返回？",
        success: function(res) {
          if(res.confirm){
            that.setTimeStop();
          }
        }
      })
    }else {
      that.ClickOnStop();
    }
  },

  setTimeStop: function() {
    this.setData({
      timeControl: 0,
      minutes: 0,
      seconds: 0,
      tipOnTop: "请选择你想做的事",
      pauseAble: false,
      stopAble: false,
      goOnAble: false,
      startAble: false,
      setAble: true,
      totalSeconds: 0,
      stopFlagBOOLEAN: true,
      timeAble: false,
      buttonAble: false,
      searchAble: true,
      voiceOrNot: false,
      winOrNot: false,
    });
    if (this.data.idOfInterval) {
      clearInterval(this.data.idOfInterval);
    }
    this.setData({
      idOfInterval: null,
    })
    this.Timer();
    this.setStopState(this);
  },

  ClickOnStop: function() {
    let that = this;
    that.ClickOnPause();
    wx.showModal({
      title: "警告",
      content: "是否取消倒计时并返回？",
      success: function(res){
        if(res.confirm){
          upDateDatabase(that, 1);
          that.setTimeStop();
        }
      }
    })
  },

  ClickOnChoose: function(e) {
    // console.log("worksss")
         this.setData({
          background: "#89dcf8",
          color:'#ffffff',
          height:"322rpx"
         })
    // this.setData({
    //   buttonAble: true,
    //   startAble: true,
    //   winOrNot: true,
    //   timeAble: true,
    //   setAble: false,
    //   totalSeconds: this.data.minutes*60 + this.data.seconds,
    //   task: e.mark.MyMark,
    // })
    let toDo;
    let that = this;
    switch (e.mark.MyMark) {
      case 'work': 
      {
        // console.log("workjjjjjjjjjjjjjjj")
        toDo = "工作";
        that.setData({
          // work_background: "#89dcf8",
          // work_color:'#ffffff',
          work_border:"tan 2px solid",
          study_border:"0px",
          sleep_border:"0px",
          sport_border:"0px",
          choice: "工作"
         })
         // console.log("work")
        break;
      }

        
      case 'study': 
      toDo = "学习";
      that.setData({
        // work_background: "#89dcf8",
        // work_color:'#ffffff',
        work_border:"0px",
        study_border:"tan 2px solid",
        sleep_border:"0px",
        sport_border:"0px",
        // study_bottom:"15px",
        choice: "学习"
       })
        break;
      case 'sports': toDo = "运动";
      that.setData({
        // work_background: "#89dcf8",
        // work_color:'#ffffff',
        work_border:"0px",
        study_border:"0px",
        sleep_border:"0px",
        sport_border:"tan 2px solid",
        choice: "运动"
       })
        break;
      case 'sleep': toDo = "睡眠";

      that.setData({
        // work_background: "#89dcf8",
        // work_color:'#ffffff',
        work_border:"0px",
        study_border:"0px",
        sleep_border:"tan 2px solid",
        sport_border:"0px",
        choice: "睡眠"
       })
        break;
      default:
        break;
    }
    //显示头部信息（计时时长）
    // if (!this.data.totalSeconds){
    //   this.setData({
    //     tipOnTop: "还未设定时间，默认"+ toDo +"时长21分26秒"
    //   })
    // }else {
    //   let tipTop = "本次设定的总" + toDo + "时长为" + 
    //     this.data.minutes + "分" + this.data.seconds + "秒";
    //   this.setData({
    //     tipOnTop: tipTop
    //   })
    // }
  },

  ComfirmChoose: function(){
    switch(this.data.choice){
      case "学习": this.setData({task: 'study'});
      case "工作": this.setData({task: 'work'});
      case "睡眠": this.setData({task: 'sleep'});
      case "运动": this.setData({task: 'sports'});
    }
     this.setData({
      buttonAble: true,
      searchAble: false,
      startAble: true,
      winOrNot: true,
      timeAble: true,
      setAble: false,
      totalSeconds: this.data.minutes*60 + this.data.seconds,
    })

    //  显示头部信息（计时时长）
    if (!this.data.totalSeconds){
      this.setData({
        minutes: 30,
        seconds: 0,
        tipOnTop: "还未设定时间，默认"+ this.data.choice +"时长30分"
      })
    }else {
      let tipTop = "本次设定的总" + this.data.choice + "时长为" + 
        this.data.minutes + "分" + this.data.seconds + "秒";
      this.setData({
        tipOnTop: tipTop
      })
    }
    PageChange(this, checkTime(this.data.minutes), checkTime(this.data.seconds));
    this.ClickOnStart();
    this.ClickOnOVO();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    setInterval(this.sharingFunctionsWithBestWishes, 100);
  },

  sharingFunctionsWithBestWishes: function() {

  },

  ClickOnZys :function() {
    // console.log("you are right!");
  },

  musicStart: function (e) {
    if(!this.data.voiceOrNot){
      let that = this;
      that.setData({ playStatus : 1}) ;
      that.changePicture(that);
      var musicUrl = that.data.musicUrl; //音频url
      innerAudioContext.src = musicUrl; 
      innerAudioContext.play(); 
      innerAudioContext.onEnded(() => {
        innerAudioContext.play();
      })
    }
  },

  changePicture: function(that) {
    switch (that.data.playStatus) {
      case 0: that.setData({pictureSrc: './play.png'});
        break;
      case 1: that.setData({pictureSrc: './pause.png'});
        break;
      case 2: that.setData({pictureSrc: './play.png'});
        break;
      default: that.setData({pictureSrc: './play.png'});
        break;
    }
    if(that.data.voiceOrNot == true){
      that.setData({pictureSrc: './play.png'});
    }
  },

  canel_handover: function() {
    if(this.data.playStatus == 1){
      innerAudioContext.pause();
      this.setData({
        playStatus: 2
      })
      this.changePicture(this);
    }
  },

  setStopState: function (that) {
    if(that.data.playStatus){
      that.setData({
        curTimeVal: 0,
        formatedPlayTime: 0,
        playStatus: 0,
      })
      this.changePicture(this);
      innerAudioContext.stop(); //
    }
  },
  formatTime: (time) => {
    time = Math.floor(time);
    var m = Math.floor(time / 60).toString();
    m = m.length < 2 ? '0' + m : m;
    var s = (time - parseInt(m) * 60).toString();
    s = s.length < 2 ? '0' + s : s;
    return m + ':' + s;
  },

  searchMusic: function(e) {
    let url="https://music.163.com/api/search/get?s="+e.detail.value+"&type=1&limit=7";
    let that = this;
    wx.request({
      url: url,
      success: function(res){
        var resultSongs = res.data.result.songs;
        // console.log(resultSongs);
        for( var i = 0;i<resultSongs.length;i++){
          // searchIds.push(resultSongs[i].id);
        }
        that.setData({songsResult: resultSongs});
      }
    });
    this.setData({
      searchOrNot: true
    });
  },

  tryPlay: function(e){
    let newId = e.currentTarget.dataset.musicId;
    let that = this;
    if(!that.data.tryPlayId || that.data.tryPlayId != newId){
      that.setData({tryPlayId: newId});
      var musicUrl = 'https://music.163.com/song/media/outer/url?id='+newId+'.mp3'; 
      innerAudioContext.src = musicUrl; 
      innerAudioContext.play();
      innerAudioContext.onEnded(() => {
        that.tryPlayStop(that);
      })
    } else {
      that.tryPlayStop(that);
    }
    
  },

  chooseMusic:function(e){
    let that = this;
    var musicUrl = 'https://music.163.com/song/media/outer/url?id='
      + e.currentTarget.dataset.musicId + '.mp3'; 
    wx.showModal({
      title: "提示",
      content: "是否选择" + e.currentTarget.dataset.musicName + "作为bgm？",
      success: function(res){
        if(res.confirm){
          that.setData({musicUrl: musicUrl});
        }
      }
    })
  },

  tryPlayStop: function(e) {
    innerAudioContext.stop();
    this.setData({tryPlayId: ''});
  },

  confirmSearch: function() {
    innerAudioContext.stop();
    this.setData({searchOrNot: false});
  }
})