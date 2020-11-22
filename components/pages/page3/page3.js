
Component({
    properties:{

    },
    data:{
        
    },
    attached(){
        
    },
    methods:{
        createAnimate(width,height){
            
        },
        destoryAnimation(){
            
        },
        getHeight(){
            const _this = this;
            wx.getSystemInfo({
                success (res) {
                    const height = _this.data.height = res.windowHeight;
                    const width = _this.data.width = res.windowWidth;
                }
            })
        },
        randomNum(min,max){
            return parseInt(Math.random()*(max-min)+min,10)
        },
        open(){
            
        }
    }
})