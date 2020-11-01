const app = getApp()
Page({
    data:{
        anim1:'',
        anim2:'',
        anim3:'',
        anim4:'',
        anim5:'',
        anim6:'',
        anim7:'',
        anim8:'',
        touchSPoint:0,
        top2:0,
        animationUp:'',
        myAudio:'',
        musicList:[
            {
                name:'天份',
                author:'薛之谦',
                link:'http://sp.9sky.com/convert/song/music/2732/20181221131129501.mp3'
            },
            {
                name:'没离开过',
                author:'林志炫',
                link:'http://sp.9sky.com/convert/song/music/2732/20181221131129501.mp3'
            },
        ],
        isPlay:false,
    },
    onShow: function(){
        this.createAnimation();
        const myAudio = wx.getBackgroundAudioManager();
        myAudio.src = 'https://audio04.dmhmusic.com/71_53_T10049727020_128_4_1_0_sdk-cpm/cn/0208/M00/79/9A/ChR47F0LYWCALR21AE15pMvzoeU842.mp3?xcode=333cceec28c2d341736bc74a3cb11efc77fbcf4';
        myAudio.title = '旧日足迹';
        // myAudio.epname = '旧日足迹'
        // myAudio.singer = 'beyond'
        this.setData({
            myAudio,
            isPlay:true
        });
        myAudio.play();
        console.log(myAudio)
    },
    createAnimation(){
        const anim1 = wx.createAnimation({
            duration:800,
            timingFunction:'ease-out'
        });
        anim1.opacity(1).rotate(0).step();
        const anim2 = wx.createAnimation({
            duration:800,
            delay:400,
            timingFunction:'ease-out'
        });
        anim2.opacity(1).rotate(0).step();
        const anim3 = wx.createAnimation({
            duration:800,
            delay:900,
            timingFunction:'ease-out'
        });
        anim3.opacity(1).rotate(0).step();
        const anim4 = wx.createAnimation({
            duration:800,
            delay:1400,
            timingFunction:'ease-out'
        });
        anim4.opacity(1).rotate(0).step();
        const anim5 = wx.createAnimation({
            duration:800,
            delay:1900,
            timingFunction:'ease-out'
        });
        anim5.opacity(1).rotate(0).step();
        const anim6 = wx.createAnimation({
            duration:800,
            delay:1900,
            timingFunction:'ease-out'
        });
        anim6.opacity(1).rotate(0).step();
        const anim7 = wx.createAnimation({
            duration:800,
            delay:2100,
            timingFunction:'ease-out'
        });
        anim7.opacity(1).rotate(0).step();
        const anim8 = wx.createAnimation({
            duration:800,
            delay:2900,
            timingFunction:'ease-out'
        });
        anim8.opacity(1).height('290rpx').step();
        this.setData({
            anim1:anim1.export(),
            anim2:anim2.export(),
            anim3:anim3.export(),
            anim4:anim4.export(),
            anim5:anim5.export(),
            anim6:anim6.export(),
            anim7:anim7.export(),
            anim8:anim8.export()
        })
    },
    tStart(e){
        console.log(e)
        this.setData({
            touchSPoint:e.touches[0].pageY
        })
    },
    tMove(e){
        let top = e.changedTouches[0].pageY-this.data.touchSPoint;
        this.setData({
            top2:top+'px'
        })
    },
    tEnd(e){
        let end = this.data.touchSPoint - e.changedTouches[0].pageY;
        end>100?
            this.animationUp()
        :null;
    },
    animationUp(){
        const animation = wx.createAnimation({
            duration:1500,
        })
        animation.top(0).step()
        this.setData({
            animationUp:animation.export()
        })
    },
    musicAction(){
        this.data.isPlay?
            this.data.myAudio.pause():
            this.data.myAudio.play();
        this.setData({
            isPlay:!this.data.isPlay
        })
    }

})
