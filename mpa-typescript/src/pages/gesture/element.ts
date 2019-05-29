import { getTranform, getRPX } from '@utils/device';
import { DOMNode } from './interface';

export default class Element {
    private photo:string;
    private container: any;
    private $containerTarget: DOMNode;
    private $containerElement: HTMLElement;
    private $rotateElement: HTMLElement;
    private $scaleElement: HTMLElement;
    private $removeElement: HTMLElement;
    private $dragElement: HTMLElement;
    private $dragTarget: DOMNode;
    private leftVal: number = 0;
    private topVal: number = 0;
    private oLeftVal: number = 0;
    private oTopVal: number = 0;
    private rotateVal: number = 0;
    private dragStatus: number = 0;                             // 0 移动结束，1正在移动，2缩放，3旋转
    private canDrag: boolean = false;                           // false 首次触屏
    private elementWidth: number = 0;
    private elementHeight: number = 0;
    private angle: number = 0;                                  // 初始夹角
    private angleMouse: number = 0;                             // 触屏点与原点的夹角
    private targetPosX: number = 0;
    private targetPosY: number = 0;
    
    constructor ($container:DOMNode, photo: string) {
        this.photo = photo;
        const width = $container.width();
        const height = $container.height();

        this.handleSelect = this.handleSelect.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleScale = this.handleScale.bind(this);
        this.handleScaleEnd = this.handleScaleEnd.bind(this);
        this.handleRotate = this.handleRotate.bind(this);
        this.handleRotateEnd = this.handleRotateEnd.bind(this);

        this.leftVal = this.oLeftVal = Math.random() * (width - 50);
        this.topVal = this.oTopVal = Math.random() * (height -  50);
        this.rotateVal = 360 - Math.random() * 50;

        this.createElement();
        $container.append(this.$containerElement);

        this.elementWidth = this.$dragElement.clientWidth;
        this.elementHeight = this.$dragElement.clientHeight;

        this.bindEvents();
    }

    public setContainer (container) {
        this.container = container;
    }

    private createElement () {
        // container element
        window.$('.element.selected').removeClass('selected');
        this.$containerElement = document.createElement('div');
        this.$containerElement.classList.add('element');
        this.$containerElement.classList.add('selected');
        this.$containerElement.style.left = `${this.leftVal}px`;
        this.$containerElement.style.top = `${this.topVal}px`;
        this.$containerElement.style[getTranform()] = `translate(-50%, -50%) rotate(${this.rotateVal}deg)`;
        // zepto选择
        this.$containerTarget = window.$(this.$containerElement);

        // rotate button
        this.$rotateElement = document.createElement('button');
        this.$rotateElement.classList.add('elementBtn');
        this.$rotateElement.classList.add('elementBtn-rotate');
        // scale button
        this.$scaleElement = document.createElement('button');
        this.$scaleElement.classList.add('elementBtn');
        this.$scaleElement.classList.add('elementBtn-scale');
        // remove button
        this.$removeElement = document.createElement('button');
        this.$removeElement.classList.add('elementBtn');
        this.$removeElement.classList.add('elementBtn-remove');
        // drag element
        this.$dragElement = document.createElement('img');
        this.$dragElement.setAttribute('src', this.photo);
        this.$dragTarget = window.$(this.$dragElement);
        // append elements
        this.$containerElement.appendChild(this.$rotateElement);
        this.$containerElement.appendChild(this.$scaleElement);
        this.$containerElement.appendChild(this.$removeElement);
        this.$containerElement.appendChild(this.$dragElement);
    }

    private bindEvents () {
        this.$containerElement.addEventListener('click', this.handleSelect, false);
        this.$removeElement.addEventListener('click', this.handleRemove, false);
        window.touch.on(this.$dragElement, 'drag', this.handleDrag);
        window.touch.on(this.$dragElement, 'dragend', this.handleDragEnd);
        window.touch.on(this.$scaleElement, 'drag', this.handleScale);
        window.touch.on(this.$scaleElement, 'dragend', this.handleScaleEnd);
        window.touch.on(this.$rotateElement, 'drag', this.handleRotate);
        window.touch.on(this.$rotateElement, 'dragend', this.handleRotateEnd);
    }

    private destory () {
        // remove event
        this.$removeElement.removeEventListener('click', this.handleRemove, false);
        this.$containerElement.removeEventListener('click', this.handleSelect, false);
        window.touch.off(this.$dragElement, 'drag', this.handleDrag);
        window.touch.off(this.$dragElement, 'dragend', this.handleDragEnd);
        window.touch.off(this.$scaleElement, 'drag', this.handleScale);
        window.touch.off(this.$scaleElement, 'dragend', this.handleScaleEnd);
        window.touch.off(this.$rotateElement, 'drag', this.handleRotate);
        window.touch.off(this.$rotateElement, 'dragend', this.handleRotateEnd);
        // remove element
        this.$containerElement.parentNode.removeChild(this.$containerElement);
    }

    // 获取中心坐标
    // 两点间的距离，计算缩放比率
    private getOriginPos () {
        let ang = eval('this.get' + this.$containerTarget.css('transform'));
        ang = ang * 1 + 8;

        let sinAng = Math.sin(ang / 180 * Math.PI);
        let cosAng = Math.cos(ang / 180 * Math.PI);
        sinAng = sinAng >= 0 ? sinAng : -sinAng;
        cosAng = cosAng >= 0 ? cosAng : -cosAng;

        // 获取旋转后占位宽度
        let width = Math.abs(this.elementHeight * sinAng + this.elementWidth * cosAng);
        let height = Math.abs(this.elementHeight * cosAng + this.elementWidth * sinAng);
        let { left, top } = this.$containerTarget.offset();

        // 物件中心点
        let x = left * 1 + width / 2;
        let y = top * 1 + height / 2;
        return [x, y];
    }

    // 矩阵转换为角度，转换如下
    // matrix(cosθ, sinθ, -sinθ, cosθ, 0, 0)
    private getmatrix(a:number, b: number, c: number, d: number, e: number, f: number):number {
        let aa = Math.round(180 * Math.asin(a) / Math.PI);
        let bb = Math.round(180 * Math.acos(b) / Math.PI);
        let cc = Math.round(180 * Math.asin(c) / Math.PI);
        let dd = Math.round(180 * Math.acos(d) / Math.PI);
        let deg = 0;
        // 大于0度小于90度
        if (aa == bb || -aa == bb) {
            deg = dd;
        }
        // 小于0度
        else if (-aa + bb == 180) {
            deg = 180 + cc;
        }
        // 大于180度
        else if (aa + bb == 180) {
            deg = 360 - cc || 360 - dd;
        }
        return deg >= 360 ? 0 : deg;
    }

    // 获取旋转角度
    // 用于计算旋转的角度
    // 勾股定理
    private getDeg (posA, posB) {
        return Math.atan2(posB.x - posA.x, posA.y - posB.y) / Math.PI * 180;
    }

    private handleSelect () {
        window.$('.element.selected').removeClass('selected');
        this.$containerElement.classList.add('selected');
    }

    private handleDrag (evt: any) {
        if (this.dragStatus > 1) {
            return;
        }
        this.dragStatus = 1;
        evt.preventDefault();
        const { x, y } = evt;
        // 设置移动位置
        this.oLeftVal = this.leftVal + x;
        this.oTopVal = this.topVal + y;
        this.$containerElement.style.left = `${this.oLeftVal}px`;
        this.$containerElement.style.top = `${this.oTopVal}px`;
    }

    private handleDragEnd (evt: any) {
        if (this.dragStatus !== 1) {
            return;
        }
        this.dragStatus = 0;
        this.leftVal = this.oLeftVal;
        this.topVal = this.oTopVal;
    }

    private handleScale (evt:any) {
        if (this.dragStatus !==2 && this.dragStatus !== 0 ) {
            return ;
        }
        this.dragStatus = 2;
        if (!this.canDrag) {
            const [x, y] = this.getOriginPos();
            this.targetPosX = x;
            this.targetPosY = y;
            this.canDrag = true;
        }
        let touch = evt.originEvent.targetTouches[0];
        const { pageX, pageY } = touch;

        // 对角线的一半
        const halfDiagonal = Math.sqrt(Math.pow(this.elementWidth, 2) + Math.pow(this.elementHeight, 2)) / 2;
        // 触屏点到中心点的距离
        const distance = Math.sqrt(Math.pow((pageX - this.targetPosX), 2) + Math.pow((pageY - this.targetPosY), 2));

        const scaleRate= distance / halfDiagonal;

        if(this.elementWidth / getRPX() > 2 || scaleRate > 1){
            this.elementWidth = this.elementWidth * scaleRate;
            this.$dragTarget.width(this.elementWidth); 
        }
    }

    private handleScaleEnd () {
        if (this.dragStatus !==2 ) {
            return ;
        }
        this.dragStatus = 0;
        this.canDrag = false;
    }

    private handleRotate (evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
        if (this.dragStatus !==3 && this.dragStatus !== 0 ) {
            return ;
        }
        this.dragStatus = 3;
        
        // 触点坐标
        let touch = evt.originEvent.targetTouches[0];
        const { pageX, pageY } = touch;
        if(!this.canDrag){
            const [x, y] = this.getOriginPos();
            this.targetPosX = x;
            this.targetPosY = y;
            // 触屏点起始角度
            this.angleMouse = this.getDeg({x, y}, {x: pageX, y: pageY});
            // 物品起始角度
            this.angle = eval(`this.get${this.$containerTarget.css('transform')}`);
            this.canDrag = true;
            return;
        }
        const deg = this.getDeg({x: this.targetPosX, y: this.targetPosY}, {x: pageX, y: pageY});
        let rotateAngle = this.angle + deg - this.angleMouse;
        let transformStyle = `translate(-50%,-50%)  rotate(${rotateAngle}deg)`;
        this.$containerTarget.css('transform', transformStyle);
    }

    private handleRotateEnd () {
        if (this.dragStatus !==3 ) {
            return ;
        }
        this.dragStatus = 0;
        this.canDrag = false;
    }

    private handleRemove () {
        this.container.removeItem(this);
        this.destory();
    }

    public remove () {
        this.destory();
    }
};
