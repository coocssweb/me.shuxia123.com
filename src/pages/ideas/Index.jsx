import React, { Component } from 'react';
import className from 'classnames';
import ArticleItem from '@components/articleItem';
import ProjectItem from '@components/projectItem';
import Idea from './ideaItem';
import withPage from '../../hoc/withPage';

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
            <div className={className('idea page')}>
                <div className={className('ideaSlogan')}>
                    <p className={className('ideaSlogan-title')}>我「的」想法</p>
                    <p className={className('ideaSlogan-subtitle')}>某个时刻的<mark>想法</mark>，看过的<mark>好文章</mark></p>
                </div>
                
               <ul className={className('idea-list')}>
                    <Idea />
                    <Idea />
                    <Idea />
                    <Idea />
                    <Idea />
               </ul>
            </div>
        );
    }
}

export default withPage(Index);
