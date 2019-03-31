import React from 'react';
import className from 'classnames';
import { Link } from 'react-router-dom';
export default (props) => {
    const article = props.article;
    return (
        <Link to={`/detail/${article.id}`} className={className('articleItem')}>
            <div className={className('articleItem-photo')} style={ {backgroundImage: `url(${ article.posters[0] })`} }>
            </div>
            <h2 className={className('articleItem-title')}>{ article.title}</h2>
            <p className={className('articleItem-description')}>{ article.description }。</p>
        </Link>
    );
};

export const Skeleton = () => {
    return (
        <div className={className('articleItemSkeleton')}>
            <div className={className('articleItemSkeleton-photo')}>
            </div>
            <h2 className={className('articleItemSkeleton-title')}></h2>
            <div className={className('articleItemSkeleton-description')}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};