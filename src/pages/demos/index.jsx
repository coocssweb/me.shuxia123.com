import React, { Component } from 'react';
import className from 'classnames';
import ProjectItem, { Skeleton as ProjectItemSkeleton } from '@components/projectItem';
import withPage from '../../hoc/withPage';

class Index extends Component {
    constructor (props) {
        super(props);
        this.skeletonArray = Array(4).fill(null);
        this.state = {
            loaded: props.server || props.list.length > 0,
            projects: props.list
        };
    }

    static getDerivedStateFromProps (props, state) {
        return {
            projects: props.list
        }
    }

    componentDidMount () {
        const props = this.props;
        // 正在加载中
        if (!this.state.loaded) {
            props.fetchProjects(1, (result) => {
                this.setState({
                    loaded: true
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
            <div className={className('projects page')}>
                <div className={className('pageSlogan')}>
                    <div className={className('pageSlogan-content')}>
                        <p className={className('pageSlogan-title')}>小实验室</p>
                        <p className={className('pageSlogan-subtitle')}>分享我的一些实验demo，去探索，即使从零开始，开始了就成功了90%</p>
                    </div>
                </div>
                <div className={className('projectList-wrapper')}>
                    <div className={className('projectList clearfix')}>
                        {
                            state.loaded ? (
                                state.projects.map(item => <ProjectItem project={item} key = {item.id} />)
                            ) : (
                                this.skeletonArray.map((item, index) => <ProjectItemSkeleton key={index} />)
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withPage(Index);
