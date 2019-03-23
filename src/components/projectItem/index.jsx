import React from 'react';
import className from 'classnames';
export default (props) => {
    return (
        <div className={className('projectItem')}>
            <div className={className('projectItem-content')}>
                <h2 className={className('projectItem-title')}>REACT组件库</h2>
                <p className={className('projectItem-description')}>您可以要求任何一位房客在预订您的房源前将身份证件提交到爱彼迎。您还有机会提前审查预订或是添加额外条件来控制可进行预订的人。</p>
                <a href="javascript:;" className={className('projectItem-more')}>了解更多</a>
            </div>
        </div>
    );
};
