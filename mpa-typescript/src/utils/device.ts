/**
 * @file utils/device.ts 终端相关
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */

export const getTransitionEvent = () => {
    let el = document.createElement('fake_a_element');
    
    let transitions = {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
    };

    for (let transition in transitions) {
        if (el.style[transition] !== undefined) {
            return transitions[transition];
        }
    }
};

export const getTransition = () => {
    let el = document.createElement('fake_a_element');
    
    let transitions = {
        'transition':'transition',
        'OTransition':'oTransition',
        'MozTransition':'transition',
        'WebkitTransition':'webkitTransition'
    };

    for (let transition in transitions) {
        if (el.style[transition] !== undefined) {
            return transitions[transition];
        }
    }
};

export const getTranform = () => {
    let el = document.createElement('fake_a_element');
    
    let transforms = {
        'transform':'transform',
        'OTransform':'OTransform',
        'MozTransform':'MozTransform',
        'WebkitTransform':'webkitTransform'
    };

    for (let transform in transforms) {
        if (el.style[transform] !== undefined) {
            return transforms[transform];
        }
    }
};

export const getAnimationEvent = () => {
    let el = document.createElement('fake_a_element');
    
    let animations = {
        'animation':'animationend',
        'OAnimation':'oAnimationEnd',
        'MozAnimation':'animationend',
        'WebkitAnimation':'webkitAnimationEnd'
    };

    for (let animation in animations) {
        if (el.style[animation] !== undefined) {
            return animations[animation];
        }
    }
};

export const getRPX = () => {
    return 20 * (window.innerWidth / 375);
}