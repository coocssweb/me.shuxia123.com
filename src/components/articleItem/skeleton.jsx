import React from 'react';
import className from 'classnames';
export default () => {
    return (
        <div className={className('articleItemSkeleton')}>
            <div className={className('articleItemSkeleton-photowrapper')}>
            </div>
            <h2 className={className('articleItemSkeleton-title')}></h2>
            <p className={className('articleItemSkeleton-description')}></p>
        </div>
    );
};
