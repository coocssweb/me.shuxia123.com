import React, { Component } from 'react';
import className from 'classnames';
import { CSSTransition } from 'react-transition-group';
import withPage from '../../hoc/withPage';
import Skeletion from './skeleton';
import { formatDate } from '../../utils';
import lazyLoadImage from '../../utils/lazyLoadImage';
import Gitalk from 'gitalk';

let __prismAdded = false;
let __prismLoaded = false;

class Index extends Component {
    constructor (props) {
        super(props);
        this.handleSkeletonExited = this.handleSkeletonExited.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        const { id } = this.props.match.params;
        this.state = {
            decorated: false,
            loaded: props.server,
            loadOver: props.server,
            article: props.article
        };
    }

    static getDerivedStateFromProps (props, state) {
        return {
            article: props.article
        };
    }

    componentDidMount () {
        const { id } = this.props.match.params;
        if (!this.state.loaded) {
            this.props.fetchDetail(id, () => {
                this.setState({
                    loaded: true
                });
            });
        }

        if (this.props.server) {
            // 重置服务端渲染状态
            // 确保服务端渲染内容，只在首次起作用
            this.props.resetServer();
        }

        this.domGlobalHeader = document.querySelector('.globalHeader');
        this.domMask = document.querySelector('.detail-mask');
        document.addEventListener('scroll', this.handleScroll);
        this.addPrismJsScript();
        this.loadImage();
        this.setArticle();
        this.renderTalks();
    }

    componentDidUpdate () {
        this.decorateCode();
        this.loadImage();
        this.setArticle();
    }

    componentWillUnmount () {
        document.removeEventListener('scroll', this.handleScroll);
        this.domGlobalHeader.style.backgroundColor = null;
    }

    handleScroll (e) {
        let scrollHeight = (window.scrollY / 500);
        scrollHeight = scrollHeight > 1 ? 1 : scrollHeight;
        const opacityGlobalHeader = scrollHeight * 1;
        const opacityMask = scrollHeight * 0.35 + 0.45;
        this.domGlobalHeader.style.backgroundColor = `rgba(0, 0, 0, ${opacityGlobalHeader})`;
        this.domMask.style.opacity = opacityMask;
        lazyLoadImage();
    }

    renderTalks () {
        const { id } = this.props.match.params;
        var gitalk = new Gitalk({
            clientID: 'a97899e98b179995b328',
            clientSecret: 'ff401cbd5bafb21800550f9044d00544c3f043ea',
            repo: 'me.shuxia123.com',
            owner: 'coocssweb',
            admin: ['coocssweb'],
            id,
            distractionFreeMode: false
        });
  
        gitalk.render('gitalk-container');
    }

    handleSkeletonExited () {
        this.setState({
            loadOver: true
        });
    }

    loadImage () {
        if (this.state.loaded && !this.state.firstLoadedImage) {
            this.state.firstLoadedImage = true;
            lazyLoadImage();
        }
    }

    setArticle () {
        if (this.state.loaded && !this.state.haveSetTitle) {
            this.state.haveSetTitle = true;
            document.title = `${this.state.article.title} - 王佳欣的小站`;
        }
    }

    decorateCode () {
        // dom加载完
        if (__prismLoaded && this.state.loaded && !this.state.decorated) {
            this.state.decorated = true;
            [...document.querySelectorAll('pre code')].map((el) => {
                el.parentNode.innerHTML = `<code class="language-javascript">${el.innerHTML}</code>`;
            });
            Prism.highlightAll();
        }
    }

    addPrismJsScript() {
        if (__prismAdded) {
            return;
        }

        const childJs = this.disqus = document.createElement('script');
        const childCss = this.disqus = document.createElement('link');
        const parent = document.getElementsByTagName('head')[0];

        childJs.onload = () => {
            __prismLoaded = true;
            this.decorateCode();
        };

        childJs.type = 'text/javascript';
        childJs.src = '//www.shuxia123.com/js/prism.js';
        childCss.rel = 'stylesheet';
        childCss.href = '//www.shuxia123.com/css/prism.css';
        parent.appendChild(childJs);
        parent.appendChild(childCss);
        __prismAdded = true;
    }

    render () {
        const { article, loaded, loadOver } = this.state;
        const titles = loaded ? article.title.split(/\s|,|，|-/) : [];
        const bgStyle = loaded ? { backgroundImage: `url(${article.posters[0]})` } : {};

        return (
            <div className={className('detail page')}>
                <div className={className('detail-bg')} style={bgStyle}></div>
                <div className={className('detail-mask')}></div>
                {
                    loaded ? (
                        <div className={className('detail-container')}>
                            <h1 className={className('page-title')}>{article.title}</h1>
                            <div className={className('detail-title')}>{titles[0]}<br />{titles[1]}</div>
                            <div className={className('detail-info')}>
                                <img src="//www.shuxia123.com/images/personal.jpg" className={className('detail-avatar')} />
                                <div className={className('detail-user')}>
                                    <p className={className('detail-author')}>作者: {article.author || '王佳欣' }</p>
                                    <p className={className('detail-date')}>日期: {formatDate(article.createAt, 'yyyy.MM.dd')}</p>
                                </div>
                            </div>
                            <div className={className('detail-photolist')}>
                                {
                                    article.posters.map((item, index) => (<span key={index} className={className('detail-imgWrapper')}><img className={className('detail-photo')} src={item} /></span>))
                                }
                            </div>
                            <div className={className('detail-content')} dangerouslySetInnerHTML={{__html: article.content}}></div>
                            <div className={className('detail-discuss')} id="gitalk-container">
                            </div>
                        </div>
                    ) : null
                }
                {
                    !loadOver ? (
                        <CSSTransition
                            in={!loaded}
                            timeout={500}
                            classNames='fadeOut'
                            onExited={this.handleSkeletonExited}>
                            <Skeletion />
                        </CSSTransition>
                    ) : null
                }
            </div>
        );
    }
}

export default withPage(Index);
