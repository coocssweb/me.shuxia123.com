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
                        <a className={className('globalHeader-menu')} href="javascript:;">摄影</a>
                        <a className={className('globalHeader-menu')} href="javascript:;">音乐</a>
                    </nav>
                    <button className={className('btn btn-transparent btn--small btn--white globalHeader-1984')}>1984</button>
                </div>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/detail" component={Detail} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Index;
