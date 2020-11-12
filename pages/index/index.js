const app = getApp();
Page({
    data:{
        // 用于通信；
        nowPage:0,                              //当前页；
        pageTurningDirection:'none',            //当前翻页方向
        pageAnimation:'',                   //向下翻页动画；
        // pageUpAnimation:'',                     //向上翻页动画；
        pageUpDelayAnimation:'',                //向上延迟翻页动画；
        pageDownDelayAnimation:'',              //向下延迟翻页动画；
        
        top2:0,
        animationUp:'',
        myAudio:'',
        
        isPlay:false,
        isMusicIconShow:false,
        // 不用于通信；用于数据介质；
        musicList:[
            {
                name:'天份',
                author:'薛之谦',
                link:'http://sp.9sky.com/convert/song/music/2732/20181221131129501.mp3'
            },
            {
                name:'没离开过',
                author:'林志炫',
                link:'https://audio04.dmhmusic.com/71_53_T10049727020_128_4_1_0_sdk-cpm/cn/0208/M00/79/9A/ChR47F0LYWCALR21AE15pMvzoeU842.mp3?xcode=333cceec28c2d341736bc74a3cb11efc77fbcf4'
            },
            {
                name:'最后的莫西干人',
                author:'无名氏',
                link:'../../music/zuihoudemoxignren.mp3'
            },
        ],
        touchSPoint:0,                          //滑动开始定位点；      
    },
    onShow: function(){
        // this.createAnimation();
    },
    onHide(){
        // this.destoryAnimation();
        // this.musicAction();
    },
    // home图消失；开始h5宣传页；
    h5Start(e){
        console.log('h5Start',e);
        setTimeout(()=>{
            this.createAudio();
            this.pageForward();
            this.createAnimation('up');
            this.createDelayAnimation('up');
        },5000)
        
    },
    // 翻页/前进/下一页；
    pageForward(){
        this.nowPage(this.nowPage()/1 + 1);
    },
    // 翻页/后退/上一页；
    pageBackward(){
        this.nowPage(this.nowPage() - 1);
    },
    // 创建翻页动画；
    createAnimation(){
        const animation = wx.createAnimation();
        const defaultConfig = {
            transformOrigin:'50% 50% 0',
            duration:1000,
            delay:0,
            timingFunction:'linear'
        }
        animation.top(0).step(defaultConfig)
        this.setData({
            pageAnimation:animation
        })
    },
    // 创建延迟动画
    createDelayAnimation(direction="up"){
        const animation = wx.createAnimation();
        const defaultConfig = {
            transformOrigin:'50% 50% 0',
            duration:1000,
            delay:5000,
            timingFunction:'linear'
        }
        const pageUpDelayAnimation = animation.bottom(this.getScreenSize().height).step(defaultConfig);
        const pageDownDelayAnimation = animation.top(0).step(defaultConfig);
        this.setData({
            pageTurningDirection:direction,
            pageUpDelayAnimation,
            pageDownDelayAnimation
        })
    },
    destoryAnimation(){
        
    },
    // touch滑动事件
    touchStart(e){
        console.log('touchStart',e);
        this.data.touchSPoint = e.touches[0].pageY;
    },
    touchMove(e){
        // console.log('touchMove',e);
    },
    touchEnd(e){
        console.log('touchEnd',e);
        let end = this.data.touchSPoint - e.changedTouches[0].pageY;
        end > 100?
            this.pageForward()
        :end < -100?
            this.pageBackward()
        :null;
        console.log(this.data.nowPage)
    },
    touchCancel(e){
        console.log('touchCancel',e);
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
    /**
     * 音乐相关；
     */
    // 暂停与开始音乐播放；
    musicAction(){
        this.data.isPlay?
            this.data.myAudio.pause():
            this.data.myAudio.play();
        this.setData({
            isPlay:!this.data.isPlay
        })
    },
    createAudio(){
        const myAudio = wx.getBackgroundAudioManager();
        myAudio.src = this.data.musicList[0].link;
        myAudio.title = this.data.musicList[2].name;
        myAudio.epname = this.data.musicList[2].name;
        myAudio.singer = this.data.musicList[2].author;
        myAudio.play();
        console.log(myAudio,this.data.musicList[2].link,myAudio.src)
        this.setData({
            myAudio,
            isPlay:true,
            isMusicIconShow:true
        });
        
    },
    /**
     * 通用方法暂放；
     */
    // 滑动方向；
    direction(direction='up'){
        this.setData({
            pageTurningDirection:direction
        })
    },
    // 设置与获取当前页；
    nowPage(pageNum){
        if(pageNum){
            app.globalData.nowPage = pageNum;
            this.setData({
                nowPage:pageNum
            })
        }else{
            return app.globalData.nowPage
        }       
    },
    // 获取屏幕宽高
    getScreenSize(){
        const res = wx.getSystemInfoSync();
        const height = res.windowHeight;
        const width = res.windowWidth;
        return {height,width}
    },
})
