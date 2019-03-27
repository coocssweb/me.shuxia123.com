import React from 'react';
import className from 'classnames';
import { NavLink } from 'react-router-dom';

export default (props) => {
    const { classify, url,  path} = props;
    return (
        <NavLink
            to={`${url}/${classify.path}`}
            className={className({'classifyItem': true, 'classifyItem--active': classify.path === path})}>
            <span className={className('classifyItem-name')}>{ classify.name }</span>
            <span className={className('classifyItem-total')}>{ classify.total }篇文章</span>
        </NavLink>
    );
};

export const Skeleton = () => {
    return (
        <span className={className('classifyItemSkeleton')}></span>
    );
};
