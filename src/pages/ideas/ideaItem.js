import React from 'react';
import className from 'classnames';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <li className={className('idea-item')}>
            <Link to="/detail" className={className('idea-title')}>NodeSchool 章节</Link>
            <div className={className('idea-info')}>日期: 2019.19.15, 阅读: 85，喜欢: 52</div>
            <p className={className('idea-description')}>找不到你所在的地区的 NodeSchool 么？也许你周围还有同样的想要筹建一个的。到 讨论区 新开一个 issue 来寻找你周边的小伙伴吧。然后，你就可以按照 举办活动说明所述来举办一个活动了。</p>
            <Link to="/detail" className={className('idea-more')} href="javascript:;">阅读更多</Link>
        </li>
    );
};
