import React, { Component } from 'react';
import className from 'classnames';
import withPage from '../../hoc/withPage';
import Skeletion from './skeleton';
import {formatDate} from '../../utils'

class Index extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: !props.server,
            data: props.data
        };
    }

    componentDidMount () {

    }

    render () {
        let state = this.state;
        const article = state.data;
        const titles = state.loading ? [] : article.title.split(' ');
        const bgStyle = state.loading ? {} : {backgroundImage: `url(${article.posters[0]})`};

        return (
            <div className={className('detail page')}>
                <div className={className('detail-bg')} style={bgStyle}></div>
                <div className={className('detail-mask')}></div>
                {
                    state.loading ? (
                        <Skeletion />
                    ) : (
                        <div className={className('detail-container')}>
                            <div className={className('detail-title')}>{titles[0]}<br />{titles[1]}</div>
                            <div className={className('detail-info')}>
                                <img src="https://coocssweb.github.io/photos/personal.jpeg" className={className('detail-avatar')} />
                                <div className={className('detail-user')}>
                                    <p className={className('detail-author')}>作者: {article.author}</p>
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
                    )
                }
            </div>
        );
    }
}

export default withPage(Index);
