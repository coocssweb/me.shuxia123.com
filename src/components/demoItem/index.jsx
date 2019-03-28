import React from 'react';
import className from 'classnames';
import { NavLink } from 'react-router-dom';

export default (props) => {
    const { name,  description, path} = props.demo;
    return (
        <a
            href={ path }
            target="_blank"
            className={className({'demoItem': true})}>
            <span className={className('demoItem-name')}>{ name }</span>
            <span className={className('demoItem-total')}>{ description }</span>
        </a>
    );
};

export const Skeleton = () => {
    return (
        <span className={className('demoItemSkeleton')}></span>
    );
};
