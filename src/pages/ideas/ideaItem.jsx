import React from 'react';
import className from 'classnames';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';

export default (props) => {
    const article = props.idea;
    return (
        <li className={className('ideaItem')}>
            <Link to={`/detail/${article.id}`} className={className('ideaItem-title')}>{article.title}</Link>
            <div className={className('ideaItem-info')}>日期: {formatDate(article.createAt, 'yyyy.MM.dd')}, 阅读: {article.readCount}，喜欢: {article.likeCount}</div>
            <p className={className('ideaItem-description')}>{article.description}</p>
            <Link to={`/detail/${article.id}`} className={className('ideaItem-more')} href="javascript:;">阅读更多</Link>
        </li>
    );
};

export const Skeleton = () => {
    return (
        <li className={className('ideaItemSkeleton')}>
            <div className={className('ideaItemSkeleton-title')}></div>
            <div className={className('ideaItemSkeleton-info')}></div>
            <div className={className('ideaItemSkeleton-description')}>
                <p></p>
                <p></p>
            </div>
            <div className={className('ideaItemSkeleton-more')}></div>
        </li>
    );
};
