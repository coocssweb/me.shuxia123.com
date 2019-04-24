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
    }

    for (let transition in transitions) {
        if (el.style[transition] !== undefined) {
            return transitions[transition];
        }
    }
}
