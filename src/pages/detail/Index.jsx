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
                            <div className={className('detail-toolbar')}>
                                <p className={className('detail-likecount')}>已经有 <mark>{ article.likeCount }</mark> 人点赞了</p>
                                <button className={className('btn btn-fill detail-like')}>点赞之交</button>
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
