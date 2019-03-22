import React from 'react';
import className from 'classnames';
export default (props) => {
    return (
        <a href="javascript:;" className={className('projectItem')}>
            <img className={className('projectItem-photo')} src="https://z1.muscache.cn/pictures/62a108b0-8ce8-44e2-902b-61c2cf165e06.jpg" />
            <h2 className={className('projectItem-title')}>React组件库</h2>
            <p className={className('projectItem-description')}>爱彼迎没有最低或强制出租天数限制，因此您可以屏蔽不可订的日期。</p>
        </a>
    );
};
