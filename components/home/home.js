import createAnimation from '../../utils/animation';
Component({
    properties:{

    },
    data:{
        transparentAnimate:'',
        stop:false,
        animas:new Array(11),
        animas2:[],
        // 不用于数据通信；
        timer:null,
        timer2:null,
        height:'',
        width:''
    },
    attached(){
        // setInterval(() => {
            this.getHeight();
        // }, 1000);
        
    },
    methods:{
        createAnimate(width,height){
            const animas = new Array(11);
            for(let i=0;i<animas.length;i++){
                animas[i] = createAnimation({
                    // duration:1000
                });
                let randX = this.randomNum(0,width);
                let randY = this.randomNum(0,height);

                const delay = this.randomNum(100,5000);
                animas[i].left(randX).top(randY).step({ duration:1000});
                animas[i].opacity(.4).step({ duration:1000,delay});
                animas[i].left(randX).top(randY).step({ duration:1000});
            }
            this.data.timer2 = setTimeout(()=>{
                this.setData({
                    animas
                })
            },1000)
            
        },
        getHeight(){
            const _this = this;
            wx.getSystemInfo({
                success (res) {
                    const height = _this.data.height = res.windowHeight;
                    const width = _this.data.width = res.windowWidth;
                    _this.createAnimate(width,height);
                    _this.data.timer = setInterval(() => {
                        clearTimeout(_this.data.timer2);
                        _this.createAnimate(width,height);
                    }, 3000);
                }
            })
        },
        randomNum(min,max){
            return parseInt(Math.random()*(max-min)+min,10)
        },
        open(){
            clearInterval(this.data.timer);
            clearTimeout(this.data.timer2);
            setTimeout(()=>{
                this.data.animas.forEach((el,ind) => {
                    el.actions=[]
                    ind<4?
                    el.opacity(0).left(-100).top(this.randomNum(0,this.data.height)).step({duration:2500,delay:this.randomNum(300,1300)}):
                    el.opacity(0).right('900rpx').top(this.randomNum(0,this.data.height)).step();
                });
                const transparentAnimate = createAnimation({duration:3500});
                transparentAnimate.opacity(0).step({delay:1350})
                this.setData({
                    animas:this.data.animas,
                    animas2:this.data.animas,
                    transparentAnimate,
                    stop:true
                })
                this.triggerEvent("h5Start")
            },1500);
        }
    }
})