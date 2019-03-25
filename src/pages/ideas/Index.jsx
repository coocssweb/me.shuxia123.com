import React, { Component } from 'react';
import className from 'classnames';
import Idea, { Skeleton } from './ideaItem';
import withPage from '../../hoc/withPage';

class Index extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: !props.server,
            ideas: props.server ? props.list : Array(10).fill('')
        };
    }

    componentDidMount () {
        const props = this.props;
        // 正在加载中
        if (!props.server) {
            props.fetchIdeas(1);
        }
    }

    render () {
        const { state } = this;
        // slogans
        // 去「勇敢的」承担
        // We can do
        return (
            <div className={className('idea page')}>
                <div className={className('ideaSlogan')}>
                    <p className={className('ideaSlogan-title')}>我「的」想法</p>
                    <p className={className('ideaSlogan-subtitle')}>某个时刻的<mark>想法</mark>，看过的<mark>好文章</mark></p>
                </div>

                <ul className={className('ideaList')}>
                    {
                        state.loading ? (
                            state.ideas.map((item, index) => <Skeleton key={index} />)
                        ) : (
                            state.ideas.map(item => <Idea idea={item} key = {item.id} />)
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default withPage(Index);
