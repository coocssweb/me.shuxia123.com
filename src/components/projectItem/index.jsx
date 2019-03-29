import React from 'react';
import className from 'classnames';
export default (props) => {
    const { project } = props;
    return (
        <div className={className('projectItem-wrapper')}>
            <div className={className('projectItem')}>
                <div className={className('projectItem-content')}>
                    <h2 className={className('projectItem-title')}>{ project.name }</h2>
                    <p className={className('projectItem-description')}>{ project.description }</p>
                    <a href={project.path} rel="nofollow" target="_blank" className={className('projectItem-more')}>了解更多</a>
                </div>
            </div>
        </div>
    );
};

// 骨架图
export const Skeleton = () => {
    return (
        <div className={className('projectItemSkeleton-wrapper')}>
            <div className={className('projectItemSkeleton')}>
                <div className={className('projectItemSkeleton-content')}>
                    <h2 className={className('projectItemSkeleton-title')}></h2>
                    <div className={className('projectItemSkeleton-description')}>
                        <p></p>
                        <p></p>
                    </div>
                    <a href="javascript:;" className={className('projectItemSkeleton-more')}></a>
                </div>
            </div>
        </div>
    );
};
