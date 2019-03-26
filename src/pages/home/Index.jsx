import React, { Component } from 'react';
import className from 'classnames';
import ArticleItem, { Skeleton as ArticleItemSkeleton } from '@components/articleItem';
import ProjectItem, { Skeleton as ProjectItemSkeleton } from '@components/projectItem';
import { Link } from 'react-router-dom';
import withPage from '../../hoc/withPage';

class Index extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ideasLoaded: props.server || props.ideas.length > 0,
            projectsLoaded: props.server || props.projects.length > 0,
            ideas: props.server ? props.ideas : Array(3).fill(''),
            projects: props.server ? props.projects : Array(4).fill('')
        };
    }

    static getDerivedStateFromProps (props, state) {
        return {
            ideas: props.ideas.length ? props.ideas : Array(3).fill(''),
            projects: props.projects.length ? props.projects : Array(4).fill('')
        };
    }

    componentDidMount () {
        const props = this.props;
        // 非服务端
        if (!this.state.loaded) {
            props.fetchRecommendIdeas((result) => {
                this.setState({
                    ideasLoaded: true
                });
            });
            props.fetchRecommendProjects((result) => {
                this.setState({
                    projectsLoaded: true
                });
            });
        }
    }

    render () {
        const { state } = this;
        // slogans
        // 去「勇敢的」承担
        // We can do
        return (
            <div className={className('home page')}>
                <div className={className('homeSlogan')}>
                    <p className={className('homeSlogan-title')}>写「漂亮的」代码</p>
                    <p className={className('homeSlogan-subtitle')}>It is a <mark>beautiful</mark> day, <mark>Don't</mark> let it get away.</p>
                </div>
                <div className={className('homeRecommend')}>
                    <div className={className('homeRecommend-content')}>
                        <h2 className={className('homeRecommend-title')}>精彩想法</h2>
                        <h3 className={className('homeRecommend-subtitle')}>记录某些时刻的想法，更多有趣有价值的分享</h3>
                        <div className={className('homeRecommend-articles articleList clearfix')}>
                            {
                                state.ideasLoaded ? (
                                    state.ideas.map(item => <ArticleItem article={item} key={item.id} />)
                                ) : (
                                    state.ideas.map((item, index) => <ArticleItemSkeleton key={index} />)
                                )
                            }
                        </div>
                        <div className={className('homeRecommend-more')}>
                            <Link to="/ideas" className={className('btn btn-transparent btn--black btn--small')}>更多想法</Link>
                        </div>
                    </div>
                </div>
                <div className={className('homeRecommend homeRecommend-project')}>
                    <div className={className('homeRecommend-content')}>
                        <h2 className={className('homeRecommend-title')}>开源项目</h2>
                        <h3 className={className('homeRecommend-subtitle')}>写代码，和从以往开发中发现一些有价值的沉淀</h3>
                        <div className={className('homeRecommend-projectList projectList clearfix')}>
                            {
                                state.ideasLoaded ? (
                                    state.projects.map(item => <ProjectItem project={item} key={item.id} />)
                                ) : (
                                    state.projects.map((item, index) => <ProjectItemSkeleton key={index} />)
                                )
                            }
                        </div>
                        <div className={className('homeRecommend-more')}>
                            <Link to="/projects" className={className('btn btn-transparent btn--black btn--small')}>更多开源</Link>
                        </div>
                    </div>
                </div>
                <div className={className('homeRecommend homeRecommend-demo')}>
                    <div className={className('homeRecommend-content')}>
                        <h2 className={className('homeRecommend-title')}>小实验室</h2>
                        <h3 className={className('homeRecommend-subtitle')}>去探索，即使从零开始，开始了就成功了90%</h3>
                        <div className={className('homeRecommend-items')}>
                            <a href="javascript:;" className={className('homeRecommend-item')}>绚丽的按钮</a>
                            <a href="javascript:;" className={className('homeRecommend-item')}>有趣的Loading</a>
                            <a href="javascript:;" className={className('homeRecommend-item')}>场景切换</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withPage(Index);
