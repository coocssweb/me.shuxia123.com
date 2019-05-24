import React, { Component } from 'react';
import className from 'classnames';
import ArticleItem, { Skeleton as ArticleItemSkeleton } from '@components/articleItem';
import ProjectItem, { Skeleton as ProjectItemSkeleton } from '@components/projectItem';
import DemoItem, { Skeleton as DemoItemSkeleton } from '@components/demoItem';
import Button from '@components/button';
import withPage from '../../hoc/withPage';
import loadImage from '../../utils/loadImage';

class Index extends Component {
    constructor (props) {
        super(props);

        this.ideasSkeletonArray = Array(3).fill('');
        this.projectsSkeletonArray = Array(4).fill('');
        this.demosSkeletonArray = Array(5).fill('');
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            ideasLoaded: props.server || props.ideas.length > 0,
            projectsLoaded: props.server || props.projects.length > 0,
            demosLoaded: props.server || props.demos.length > 0,
            ideas: props.ideas,
            projects: props.projects,
            demos: props.demos
        };
    }

    static getDerivedStateFromProps (props, state) {
        return {
            ideas: props.ideas,
            projects: props.projects,
            demos: props.demos,
        };
    }

    componentDidMount () {
        const props = this.props;
        document.title = '王佳欣的小站';
        // 非服务端
        if (!this.state.ideasLoaded) {
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
            props.fetchRecommendDemos((result) => {
                this.setState({
                    demosLoaded: true
                });
            });
        }
        document.addEventListener('scroll', this.handleScroll);
        
        const maskUrl = `https://www.shuxia123.com/images/${window.document.documentElement.clientWidth > 768 ? 'bg' : 'bg-mobile'}.jpg`;
        loadImage([maskUrl]).then(() => {
            const maskDom = document.querySelector('.homeSlogan-mask');
            maskDom.style.backgroundImage = `url(${maskUrl})`;
        });
    }

    componentWillUnmount () {
        document.removeEventListener('scroll', this.handleScroll);
        this.sloganMaskDom.style.transform = 'translate3d(0, 0, 0)';
    }

    handleScroll (e) {
        let scrollHeight = window.scrollY;
        this.sloganMaskDom.style.transform = `translate3d(0, ${scrollHeight / 2}px, 0)`;
    }

    render () {
        const { state } = this;
        return (
            <div className={className('home page')}>
                <h1 className={className('page-title')}>王佳欣的小站</h1>
                <div className={className('homeSlogan')}>
                    <div className={className('homeSlogan-mask')} ref={(ref) => { this.sloganMaskDom = ref }}></div>
                    <div className={className({ 'homeSlogan-content': true })}>
                        <p className={className('homeSlogan-title')}>写漂亮的代码</p>
                        <p className={className('homeSlogan-subtitle')}>我们一直在路上，因为生活就如同一场现场音乐会。</p>
                        <p className={className('homeSlogan-author')}>-- Macan</p>
                    </div>
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
                                    this.ideasSkeletonArray.map((item, index) => <ArticleItemSkeleton key={index} />)
                                )
                            }
                        </div>
                        <div className={className('homeRecommend-more')}>
                            <Button link='/ideas'>更多想法</Button>
                        </div>
                    </div>
                </div>
                <div className={className('homeRecommend homeRecommend-project')}>
                    <div className={className('homeRecommend-content')}>
                        <h2 className={className('homeRecommend-title')}>开源项目</h2>
                        <h3 className={className('homeRecommend-subtitle')}>写代码，和从以往开发中发现一些有价值的沉淀</h3>
                        <div className={className('homeRecommend-projectList clearfix')}>
                            {
                                state.ideasLoaded ? (
                                    state.projects.map(item => <ProjectItem project={item} key={item.id} />)
                                ) : (
                                    this.projectsSkeletonArray.map((item, index) => <ProjectItemSkeleton key={index} />)
                                )
                            }
                        </div>
                        <div className={className('homeRecommend-more')}>
                            <Button link='/projects'>更多开源</Button>
                        </div>
                    </div>
                </div>
                <div className={className('homeRecommend homeRecommend-demo')}>
                    <div className={className('homeRecommend-content')}>
                        <h2 className={className('homeRecommend-title')}>小实验室</h2>
                        <h3 className={className('homeRecommend-subtitle')}>去探索，即使从零开始，开始了就成功了90%</h3>
                        <div className={className('homeRecommend-demoList')}>
                            {
                                state.demosLoaded ? (
                                    state.demos.map(item => <DemoItem demo={item} key={item.id} />)
                                ) : (
                                    this.demosSkeletonArray.map((item, index) => <DemoItemSkeleton key={index} />)
                                )
                            }
                        </div>
                        <div className={className('homeRecommend-more')}>
                            <Button link='/projects'>更多实验</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withPage(Index);
