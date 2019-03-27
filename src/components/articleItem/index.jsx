import React from 'react';
import className from 'classnames';
import { Link } from 'react-router-dom';
export default (props) => {
    const article = props.article;
    const titles = (article.title || ' ') .split(' ');
    return (
        <Link to={`/detail/${article.id}`} className={className('articleItem')}>
            <div className={className('articleItem-photo')} style={ {backgroundImage: `url(${ article.posters[0] })`} }>
            </div>
            <h2 className={className('articleItem-title')}>{ titles[0] }</h2>
            <p className={className('articleItem-description')}>{ titles[1] }</p>
        </Link>
    );
};

export const Skeleton = () => {
    return (
        <div className={className('articleItemSkeleton')}>
            <div className={className('articleItemSkeleton-photo')}>
            </div>
            <h2 className={className('articleItemSkeleton-title')}></h2>
            <p className={className('articleItemSkeleton-description')}></p>
        </div>
    );
};