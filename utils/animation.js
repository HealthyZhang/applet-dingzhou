const defaultConfig = {
    duration:800,
    timingFunction:'linear',
    delay:100,
    transformOrigin:'50% 50% 0'	
}
function createAnimation(config = {}){
    return wx.createAnimation({...defaultConfig,...config});
    
}
function height(height,config){
    const animation = createAnimation(config);
    animation.height(height).step();
    return animation;
}
function opacity(opacity,config){
    const animation = createAnimation(config);
    animation.opacity(opacity).step();
    return animation;
}
const obj = {
    createAnimation,
    height,
    opacity,
    
}
module.exports = obj;