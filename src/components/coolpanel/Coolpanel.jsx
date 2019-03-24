import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import className from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { windowScroll } from '../utils/domHelper';

class CoolPanel extends Component {
    constructor (props) {
        super(props);
        this.el = document.createElement('div');
        this.canvasRef = React.createRef();
        this.state = {
            open: false,                // 是否已打开
            buttonIn: false,            // button
            hidden: true,               // 是否隐藏
            canvasWidth: 0,             // 画布宽度
            canvasHeight: 0,            // 画布高度
            radius: 0,                  // 需要画圆的半径
            animating: false,           // 正在处理展开/关闭
        };
    }

    componentDidMount () {
        this.canvasContext = this.canvasRef.current.getContext('2d');
        document.body.appendChild(this.el);
    }

    componentWillUnmount () {
        document.body.removeChild(this.el);
    }

    /**
     * 获取半径
     * 遍历窗体4个坐标与事件触发点的坐标，最大值即半径
     */
    getRadius (width, height, pos) {
        // 坐标矩阵
        const matrix = [
            [0, 0],
            [0, width],
            [height, 0],
            [width, height]
        ];

        let radius = 0;
        matrix.map((item) => {
            const distance = Math.sqrt(Math.pow(pos[0] - item[0], 2) + Math.pow(pos[1] - item[1], 2));
            radius = distance > radius ? distance : radius;
        });

        return radius;
    }

    /**
     * 画圆
     */
    draw (pos, start, aim) {
        // toOpen true，则为打开；false，为关闭
        const toOpen = start < aim;
        const state = this.state;
        const props = this.props;
        let currentRadius = start;
        let currentOpacity = toOpen ? 0 : 1;
        let time = toOpen ? 0 : Math.log2(currentRadius) * 5 + 1;
        const canvasContext = this.canvasContext;
        let end = false;
        const posX = pos[2] + pos[0];
        const posY = pos[1];

        const drawCircle = () => {
            // 也可以用setTimeout来实现，
            // 但是考虑到最大限度的利用浏览器的性能，因此用requestAnimationFrame
            // Math.pow 实现easeIn、easeOut
            window.requestAnimationFrame(() => {
                // 时间叠加
                toOpen ? time++ : time--;
                canvasContext.clearRect(0, 0, state.canvasWidth, state.canvasHeight);
                canvasContext.beginPath();
                canvasContext.fillStyle = `rgba(${props.fillColor}, ${currentOpacity})`;
                canvasContext.arc(posX, posY, currentRadius, 0, 2 * Math.PI);
                canvasContext.fill();
                canvasContext.closePath();
                if (toOpen) {
                    // easeIn 算法
                    currentRadius = currentRadius >= aim ? aim : Math.pow(2, 0.2 * time);
                    currentOpacity = currentOpacity >= 1 ? 1 : 1 - Math.pow(2, -0.08 * time);
                } else {
                    // easeOut 算法
                    currentRadius = currentRadius <= 1 ? 0 : Math.pow(2, 0.2 * time);
                    currentOpacity = currentOpacity <= 0 ? 0 : 1 - Math.pow(2, -0.08 * time);
                }

                if (end) {
                    return false;
                }
                if (currentRadius === aim) {
                    currentOpacity = toOpen ? 1 : 0;
                    end = true;
                    drawCircle();
                    this.setHiddenState(!toOpen);
                    return false;
                }
                drawCircle();
            });
        };

        drawCircle();
    }

    // 设置内容隐藏
    setHiddenState (hidden) {
        const props = this.props;
        if (hidden) {
            this.setState({
                open: false
            });
            if ('onClose' in props) {
                props.onClose();
            }
        } else {
            this.setState({
                hidden: false,
                buttonIn: true,
            });
            if ('onOpen' in props) {
                props.onOpen();
            }
        }
        this.state.animating = false;
    }

    open (e) {
        if (this.state.animating) {
            return false;
        }
        windowScroll(false);
        this.state.animating = true;
        this.target = e.target;
        // 当前窗体宽度、高度
        const width = window.innerWidth;
        const height = window.innerHeight;

        const pos = [e.clientX - this.target.offsetLeft, e.clientY, this.target.offsetLeft];
        this.setState({
            canvasWidth: width,
            canvasHeight: height,
            open: true,
            pos
        });

        // 当前事件点击坐标
        const radius = this.getRadius(width, height, pos);
        this.draw(pos, 0, radius, 1);
    }

    close () {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.setState({
            canvasWidth: width,
            canvasHeight: height
        });
        const props = this.props;
        const done = () => {
            windowScroll(true);
            this.setState({
                buttonIn: false
            });
        };

        if ('beforeClose' in props) {
            props.beforeClose(done);
        } else {
            done();
        }
    }

    onExited () {
        if (this.state.animating) {
            return false;
        }
        this.state.animating = true;
        const pos = this.state.pos;
        // 重新计算pos,
        // 窗体resize时会导致，e.clientX的变化
        // 用e.target.offsetLeft + (e.clientX - (上一次e.target.offsetLeft))，可以保证pos点相对于e.target的位置不变
        pos[2] = this.target.offsetLeft;
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.setState({
            canvasWidth: width,
            canvasHeight: height,
            hidden: true
        });
        const radius = this.getRadius(width, height, pos);
        this.draw(pos, radius, 0, -1);
    }

    renderPanel () {
        const state = this.state;
        const props = this.props;
        this.haveOpened = this.haveOpened || state.open;
        const panelClassName = className({
            'cooCoolpanel': true,
            'cooCoolpanel--open': state.open
        });
        const contentClassName = className({
            'cooCoolpanel-content': true,
            'cooCoolpanel-content--hidden': state.hidden,
        });

        let panelStyle;
        if (!state.hidden) {
            panelStyle = {
                backgroundColor: `rgba(${props.fillColor}, 1)`
            };
        }

        return ReactDOM.createPortal(
            (
                <div className={panelClassName} style={panelStyle}>
                    <canvas className={className('cooCoolpanel-canvas')}
                            width={state.canvasWidth}
                            height={state.canvasHeight}
                            ref={this.canvasRef}>
                    </canvas>
                    {
                        this.haveOpened ? (
                            <div className={contentClassName}>
                                <CSSTransition
                                    in={state.buttonIn}
                                    timeout={300}
                                    classNames='cooCoolPanelUp'
                                    onExited={this.onExited.bind(this)}>
                                    <span className={className('cooCoolpanel-close')}>
                                        <svg viewBox='0 0 260.1 260'
                                             onClick={this.close.bind(this)}>
                                            <line className={className('cooCoolpanel-line')} x1='23.5' y1='23.5' x2='236' y2='236' data-svg-origin='23.5 23.5'></line>
                                            <line className={className('cooCoolpanel-line')} x1='23.5' y1='236' x2='236' y2='23.5' data-svg-origin='23.5 23.5' ></line>
                                        </svg>
                                    </span>
                                </CSSTransition>
                                {
                                    props.children[1].props.children
                                }
                            </div>
                        ) : null
                    }

                </div>
            ),
            this.el
        );
    }

    render () {
        return (
            <React.Fragment>
                <div className={className('cooCoolpanel-menu')}
                     onClick={this.open.bind(this)}>
                    { this.props.children[0].props.children }
                </div>
                {
                    this.renderPanel()
                }
            </React.Fragment>
        );
    }
}

CoolPanel.defaultProps = {
    fillColor: '255, 255, 255'
};

CoolPanel.propTypes = {
    beforeClose: propTypes.func,
    onClose: propTypes.func,
    onOpen: propTypes.func,
    fillColor: propTypes.string,
};

export default CoolPanel;
