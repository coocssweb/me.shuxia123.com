import React from 'react';
import className from 'classnames';
export default (props) => {
    return (
        <a href="javascript:;" className={className('articleItem')}>
            <div className={className('articleItem-photowrapper')}>
                <img className={className('articleItem-photo')} src="https://z1.muscache.cn/pictures/62a108b0-8ce8-44e2-902b-61c2cf165e06.jpg" />
            </div>
            <h2 className={className('articleItem-title')}>改善经济条件</h2>
            <p className={className('articleItem-description')}>如何在爱彼迎上赚取收入</p>
        </a>
    );
};
