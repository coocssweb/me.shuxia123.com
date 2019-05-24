import React from 'react';
import className from 'classnames';
import { Link } from 'react-router-dom';
import {formatDate} from '../../utils';
export default (props) => {
    const article = props.article;
    return (
        <Link to={`/detail/${article.id}`} className={className('articleItem')}>
            <div className={className('articleItem-photo')} style={ {backgroundImage: `url(${ article.posters[0] })`} }>
            </div>
            <p className={className('articleItem-time')}>日期: {formatDate(article.createAt, 'yyyy.MM.dd')}</p>
            <h2 className={className('articleItem-title')}>{ article.title}</h2>
            <p className={className('articleItem-description')}>{ article.description }</p>
        </Link>
    );
};

export const Skeleton = () => {
    return (
        <div className={className('articleItemSkeleton')}>
            <div className={className('articleItemSkeleton-photo')}>
            </div>
            <div className={className('articleItemSkeleton-time')}>
                <span></span>
            </div>
            <h2 className={className('articleItemSkeleton-title')}></h2>
            <div className={className('articleItemSkeleton-description')}>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};