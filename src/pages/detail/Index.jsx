import React, { Component } from 'react';
import className from 'classnames';

class Index extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
    }

    static getDerivedStateFromProps (props, state) {
        return {
            
        };
    }

    shouldComponentUpdate (nextProps, prevState ) {
        
    }

    componentDidMount () {
        
    }

    render () {
        let state = this.state;
        return (
            <div className={className('detail')}>
                <div className={className('detail-photolist')}>
                    <img className={className('detail-photo')} src="https://z1.muscache.cn/im/pictures/1a9ae245-a955-4f64-9b10-146c8e284276.jpg" />
                    <img className={className('detail-photo')} src="https://z1.muscache.cn/im/pictures/1a9ae245-a955-4f64-9b10-146c8e284276.jpg" />
                    <img className={className('detail-photo')} src="https://z1.muscache.cn/im/pictures/1a9ae245-a955-4f64-9b10-146c8e284276.jpg" />
                    <img className={className('detail-photo')} src="https://z1.muscache.cn/im/pictures/1a9ae245-a955-4f64-9b10-146c8e284276.jpg" />
                    <img className={className('detail-photo')} src="https://z1.muscache.cn/im/pictures/1a9ae245-a955-4f64-9b10-146c8e284276.jpg" />
                </div>
                <div className={className('detail-info')}>
                    <img src="https://coocssweb.github.io/photos/personal.jpeg" className={className('detail-avatar')} />
                    <div className={className('detail-user')}>
                        <p className={className('detail-author')}>作者: 王佳欣</p>
                        <p className={className('detail-date')}>日期: 2019.03.22</p>
                    </div>
                </div>
                <div className={className('detail-title')}>三星米其林的怀石料理，食材到服务的精益求精</div>
                <div className={className('detail-content')}>
                    <p>大阪有三家米其林河豚店，其中二星的多古安算是口碑最佳的老铺，创业近百年，在tabelog上的评分曾冲到大阪第一。</p>
                    <p>普通店一年四季都提供河豚套餐，毕竟养殖货谈不上“时令”，但多古安却不这么干，他家人脉广，能拿到个头很大的野生虎河豚，没有好货索性不做，因此一年只有7个月能吃到河豚。</p>
                    <p>开胃菜凉拌鱼皮自开业以来就是餐厅招牌，先将河豚皮放置一年，再用自家制的橙醋腌渍，上桌时打一个生鹌鹑蛋，真是绝妙的下酒菜。</p>
                    <p>河豚和别的鱼不同，不存在“美味的零界重量值”，体形越大味道越好。当日刺身和火锅用的是7KG的河豚，据说最多可达9KG。被认为最难以欣赏的河豚刺身，需要一定功力才能体会。女招待手把手指导，“夹一片刺身，裹几根小葱，蘸一点橙醋和辣味萝卜泥再吃”。我觉得还有个要点，务必大脑放空，才能够抓住最清澈甘甜的味道。</p>
                    <p>另点了套餐外的炸河豚，端上来的一瞬间，像块金灿灿的璞玉，2KG左右的小河豚对切后再炸，香气满溢。</p>
                    <p>世道不景气的当下，河豚料理的地位却好像没有变化。依旧高价难得，还不容易吃懂，它是只属于成年人的味道。100年的老铺，也一定会在大阪城的某个角落静静开下去。</p>
                    <p>多古安</p>
                    <p>地址：大阪府大阪市港区夕凪1-15-5</p>
                    <p>人均：30000日元</p>
                </div>
                <div className={className('detail-toolbar')}>
                    <p className={className('detail-likecount')}>你看已经有 <mark>103</mark> 人点赞了</p>
                    <button className={className('btn btn-fill detail-like')}>点赞之交</button>
                </div>
            </div>
        );
    }
}

export default Index;
