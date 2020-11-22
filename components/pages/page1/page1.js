const { height,opacity } = require("../../../utils/animation");

Component({
    properties:{

    },
    data:{
        heightAnimaiton:'',
        opacityAnimation:''
    },
    attached(){
        // this.createAnimate();
    },
    methods:{
        createAnimate(){
            
            this.setData({
                heightAnimaiton:height("200rpx",{ delay:500 }).export(),
                opacityAnimation:opacity(1,{delay:1300}).export()
            })
        },
        destoryAnimation(){
            this.setData({
                heightAnimaiton:height("0").export(),
                opacityAnimation:opacity(0).export()
            })
        },
    }
})