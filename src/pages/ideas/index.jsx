import React, { Component } from 'react';
import className from 'classnames';
import ArticleItem, { Skeleton as ArticleItemSkeleton } from '@components/articleItem';
import ClassifyItem, { Skeleton as ClassifyItemSkeleton } from '@components/classifyItem';
import withPage from '../../hoc/withPage';

class Index extends Component {
    constructor (props) {
        super(props);
        this.skeletonArray = Array(5).fill(null);
        const { classify = '' } = this.props.match.params;
        this.state = {
            classifyPath: classify,
            ideasLoaded: props.server || props.list.length,
            classifiesLoaded: props.server || props.classifies.length,
            ideas: props.list,
            classifies: props.classifies
        };
    }

    static getDerivedStateFromProps (props, state) {
        const { classify = '' } = props.match.params;
        // 路由切换
        if (classify !== state.classifyPath) {
            return {
                ideasLoaded: false,
                ideas: []
            }
        }

        return {
            classifyPath: classify,
            ideas: props.list,
            classifies: props.classifies
        }
    }

    componentDidMount () {
        const props = this.props;

        if (!props.server && !this.state.classifies.length) {
            props.fetchClassifies((result) => {
                this.setState({
                    classifiesLoaded: true
                });
            });
            props.fetchIdeas({ classify: this.state.classifyPath, page: 1 }, (result) => {
                this.setState({
                    ideasLoaded: true
                });
            });
        }
    }

    componentDidUpdate () {
        const props = this.props;
        const { classifyPath } = this.state;
        const { classify = '' } = props.match.params;

        // 路由切换
        if (classify !== classifyPath) {
            this.setState({
                classifyPath: classify
            });
            props.fetchIdeas({ classify, page: 1 }, (result) => {
                this.setState({
                    ideasLoaded: true
                });
            });
        }
        // todo 分页修改
    }

    render () {
        const { state } = this;
        return (
            <div className={className('idea page')}>
                <div className={className('pageSlogan')}>
                    <div className={className('pageSlogan-content')}>
                        <p className={className('pageSlogan-title')}>我的想法</p>
                        <p className={className('pageSlogan-subtitle')}>记录我某个时刻的想法，看过的一些好文章，同大家一起分享.</p>
                    </div>
                </div>
                <div className={className('ideaClassify')}>
                    <div className={className('ideaClassify-content')}>
                    {
                        state.classifiesLoaded ? (
                            state.classifies.map(item => <ClassifyItem url='/ideas' path={state.classifyPath} classify={item} key={item.id} />)
                        ) : (
                            this.skeletonArray.map((item, index) => <ClassifyItemSkeleton key={index} />)
                        )
                    }
                    </div>
                </div>
                <div className={className('ideaList-wrapper')}>
                    <div className={className('ideaList articleList clearfix')}>
                        {
                            state.ideasLoaded ? (
                                state.ideas.map(item => <ArticleItem article={item} key={item.id} />)
                            ) : (
                                this.skeletonArray.map((item, index) => <ArticleItemSkeleton key={index} />)
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withPage(Index);
