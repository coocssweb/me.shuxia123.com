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
                        <h3 className={className('homeRecommend-subtitle')}>记录某些时刻的想法，更多有趣有价值的分享</h3>
                        <div className={className('homeRecommend-list')}>
                            <ArticleItem />
                            <ArticleItem />
                            <ArticleItem />
                        </div>
                        <div className={className('homeRecommend-more')}>
                            <a href="javascript:;" className={className('btn btn-transparent btn--black btn--small')}>更多想法</a>
                        </div>
                    </div>
                </div>
                <div className={className('homeRecommend homeRecommend-project')}>
                    <div className={className('homeRecommend-content')}>
                        <h2 className={className('homeRecommend-title')}>开源项目</h2>
                        <h3 className={className('homeRecommend-subtitle')}>写代码，和从以往开发中发现一些有价值的沉淀</h3>
                        <div className={className('homeRecommend-list')} style={{marginBottom: '30px'}}>
                            <ProjectItem />
                            <ProjectItem />
                        </div>
                        <div className={className('homeRecommend-list')}>
                            <ProjectItem />
                            <ProjectItem />
                        </div>
                    </div>
                </div>
                <div className={className('homeRecommend homeRecommend-demo')}>
                    <div className={className('homeRecommend-content')}>
                        <h2 className={className('homeRecommend-title')}>小实验室</h2>
                        <h3 className={className('homeRecommend-subtitle')}>去探索，即使从零开始，开始了就成功了90%</h3>
                        <div className={className('homeRecommend-items')}>
                            <a href="javascript:;" className={className('homeRecommend-item')}>绚丽的按钮</a>
                            <a href="javascript:;" className={className('homeRecommend-item')}>绚丽的按钮</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
