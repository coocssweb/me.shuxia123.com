import React, { Component } from 'react';
import className from 'classnames';
import DemoItem, { Skeleton as DemoItemSkeleton } from '@components/demoItem';
import withPage from '../../hoc/withPage';

class Index extends Component {
    constructor (props) {
        super(props);
        this.skeletonArray = Array(2).fill(null);
        this.state = {
            loaded: props.server || props.list.length > 0,
            demos: props.list
        };
    }

    static getDerivedStateFromProps (props, state) {
        return {
            demos: props.list
        }
    }

    componentDidMount () {
        document.title = '实验室_分享小实验demo - 王佳欣的小站';
        const props = this.props;
        // 正在加载中
        if (!this.state.loaded) {
            props.fetchDemos((result) => {
                this.setState({
                    loaded: true
                });
            });
        }
    }

    render () {
        const { state } = this;
        return (
            <div className={className('demos page')}>
                <h1 className={className('page-title')}>实验室</h1>
                <div className={className('pageSlogan')}>
                    <div className={className('pageSlogan-content')}>
                        <p className={className('pageSlogan-title')}>小实验室</p>
                        <p className={className('pageSlogan-subtitle')}>分享我的一些实验demo，去探索，即使从零开始，开始了就成功了90%</p>
                    </div>
                </div>
                <div className={className('demosList-wrapper')}>
                    <div className={className('demosList clearfix')}>
                        {
                            state.loaded ? (
                                state.demos.map(item => <DemoItem demo={item} key={item.id} />)
                            ) : (
                                this.skeletonArray.map((item, index) => <DemoItemSkeleton key={index} />)
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withPage(Index);
