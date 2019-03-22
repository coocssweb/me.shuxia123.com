import React, { Component } from 'react';
import className from 'classnames';
import ArticleItem from '@components/articleItem';
import ProjectItem from '@components/projectItem';

class Index extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount () {
        
    }

    render () {
        const { state } = this;
        // slogans
        // 去「勇敢的」承担
        // We can do
        return (
            <div className={className('home')}>
                <div className={className('homeSlogan')}>
                    <p className={className('homeSlogan-title')}>写「漂亮的」代码</p>
                    <p className={className('homeSlogan-subtitle')}>It is a <mark>beautiful</mark> day, <mark>Don't</mark> let it get away.</p>
                </div>
                <div className={className('homeRecommend')}>
                    <div className={className('homeRecommend-content')}>
                        <h2 className={className('homeRecommend-title')}>精彩想法</h2>
                        <div className={className('homeRecommend-list')}>
                            <ArticleItem />
                            <ArticleItem />
                            <ArticleItem />
                        </div>
                        <div className={className('homeRecommend-more')}>
                            <a href="javascript:;" className={className('btn btn-transparent btn--black btn--blod')}>更多想法</a>
                        </div>
                    </div>
                </div>
                <div className={className('homeRecommend')}>
                    <div className={className('homeRecommend-content')}>
                        <h2 className={className('homeRecommend-title')}>开源项目</h2>
                        <div className={className('homeRecommend-list')}>
                            <div className={className('homeRecommend-line clearfix')}>
                                <ProjectItem />
                                <ProjectItem />
                            </div>
                            <div className={className('homeRecommend-line clearfix')}>
                                <ProjectItem />
                                <ProjectItem />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
