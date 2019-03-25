import React from 'react';
import className from 'classnames';

export default () => {
    return (
        <div className={className('detailSkeleton-wrapper')}>
            <div className={className('detailSkeleton')}>
                <div className={className('detailSkeleton-title')}>
                    <p></p>
                    <p></p>
                </div>
                <div className={className('detailSkeleton-info')}>
                    <div className={className('detailSkeleton-avatar')}></div>
                    <div className={className('detailSkeleton-user')}>
                        <p className={className('detailSkeleton-author')}></p>
                        <p className={className('detailSkeleton-date')}></p>
                    </div>
                </div>
                <div className={className('detailSkeleton-photolist')}>
                </div>
                <div className={className('detailSkeleton-content')}>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
        </div>
    );
};
