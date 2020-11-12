const defaultConfig = {
    duration:800,
    timingFunction:'linear',
    delay:100,
    transformOrigin:'50% 50% 0'	
}
function createAnimation(config = {}){
    return wx.createAnimation({...defaultConfig,...config});
    
}
export default createAnimation;