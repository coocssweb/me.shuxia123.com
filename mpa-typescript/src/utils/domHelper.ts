/**
 * @file utils/domHelper.ts dom相关操作
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
// find current target in parentNode
// return is found?
export const isNodeFound = (current: Node, parentNode: Node): boolean => {
    if (current === parentNode) {
        return true;
    }

    while (current.parentNode) {
        current = current.parentNode;
        if (current === parentNode) {
            return true;
        }
    }

    return false;
};

// get browser's scrollbar width
// this can help to improve user experience
export const getScrollbarWidth = () => {
    let scrollBarWidth: number;
    return (() => {
        if (window.innerHeight >= document.body.offsetHeight) {
            return 0;
        }
    
        if (scrollBarWidth !== undefined) {
            return scrollBarWidth;
        }
    
        const outer = document.createElement('div');
        outer.className = 'scrollbar__wrap';
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.position = 'absolute';
        outer.style.top = '-9999px';
        document.body.appendChild(outer);
    
        const widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';
    
        const inner = document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);
    
        const widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        scrollBarWidth = widthNoScroll - widthWithScroll;
        return scrollBarWidth;
    })();
};


// to allow window scroll or not
// no scroll，set body style padding-right = scrollbar
// scroll, setbody padding-right = 0
export const windowScroll = (canScroll: boolean) => {
    if (canScroll) {
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
        document.getElementsByTagName('html')[0].style.paddingRight = '0px';
    } else {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        document.getElementsByTagName('html')[0].style.paddingRight = `${getScrollbarWidth()}px`;
    }
};