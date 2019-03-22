import React, { Component } from 'react';
import className from 'classnames';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/home';
import Detail from '../pages/detail';

class Index extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <React.Fragment>
                <div className={className('globalHeader')}>
                    <a href="javascript:;" className={className('globalHeader-logo')}>
                        <span className={className('globalHeader-logo--l')}>佳</span>
                        <span className={className('globalHeader-logo--r')}></span>
                        <span className={className('globalHeader-logo--b')}></span>
                        <span className={className('globalHeader-logo--n')}>欣</span>
                    </a>
                    <nav className="globalHeader-nav">
                        <a className={className('globalHeader-menu')} href="javascript:;">想法</a>
                        <a className={className('globalHeader-menu')} href="javascript:;">照片</a>
                        <a className={className('globalHeader-menu')} href="javascript:;">音乐</a>
                    </nav>
                    <button className={className('btn btn-transparent btn--small globalHeader-1984')}>新世界</button>
                </div>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/detail" component={Detail} />
                </Switch>
                <div className={className('globalFooter')}>
                    <span className={className('globalFooter-logo')}></span>
                    <p><a href="javascript:;">Say Hello To He</a></p>
                    <p><span className={className('globalFooter-copy')}>©</span> 2019 Shuxia123.com</p>
                </div>
            </React.Fragment>
        );
    }
}

export default Index;
