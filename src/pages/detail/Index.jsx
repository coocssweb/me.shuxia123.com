import React, { Component } from 'react';
import className from 'classnames';
import { CSSTransition } from 'react-transition-group';
import withPage from '../../hoc/withPage';
import Skeletion from './skeleton';
import {formatDate} from '../../utils'

class Index extends Component {
    constructor (props) {
        super(props);
        this.handleSkeletonExited = this.handleSkeletonExited.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            loaded: props.server,
            loadOver: props.server,
            article: props.article
        };
    }

    static getDerivedStateFromProps (props, state) {
        return {
            article: props.article
        }
    }

    componentDidMount () {
        const { id } = this.props.match.params;
        this.props.fetchDetail(id, () => {
            this.setState({
                loaded: true
            });
        });
        this.domGlobalHeader = document.querySelector('.globalHeader');
        this.domMask = document.querySelector('.detail-mask');
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount () {
        document.removeEventListener('scroll', this.handleScroll);
        this.domGlobalHeader.style.backgroundColor = '';
    }

    handleScroll (e) {
        let scrollHeight = (window.scrollY / 500);
        scrollHeight = scrollHeight > 1 ? 1 : scrollHeight;
        const opacityGlobalHeader =  scrollHeight * .7 + 0.3;
        const opacityMask = scrollHeight * 0.35 + 0.45;
        this.domGlobalHeader.style.backgroundColor = `rgba(0, 0, 0, ${opacityGlobalHeader})`;
        this.domMask.style.opacity = opacityMask;
    }

    handleSkeletonExited () {
        this.setState({
            loadOver: true
        });
    }

    render () {
        const { article, loaded, loadOver } = this.state;
        const titles = loaded ? article.title.split(' ') : [];
        const bgStyle = loaded ?  { backgroundImage: `url(${article.posters[0]})` } : {};

        return (
            <div className={className('detail page')}>
                <div className={className('detail-bg')} style={bgStyle}></div>
                <div className={className('detail-mask')}></div>
                {
                    loaded ? (
                        <div className={className('detail-container')}>
                            <div className={className('detail-title')}>{titles[0]}<br />{titles[1]}</div>
                            <div className={className('detail-info')}>
                                <img src="https://coocssweb.github.io/photos/personal.jpeg" className={className('detail-avatar')} />
                                <div className={className('detail-user')}>
                                    <p className={className('detail-author')}>作者: {article.author}{article.id}</p>
                                    <p className={className('detail-date')}>日期: {formatDate(article.createAt, 'yyyy.MM.dd')}</p>
                                </div>
                            </div>
                            <div className={className('detail-photolist')}>
                                {
                                    article.posters.map((item, index) => (<img key={index} className={className('detail-photo')} src={item} />))
                                }
                            </div>
                            <div className={className('detail-content')} dangerouslySetInnerHTML={{__html: article.content}}></div>
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
