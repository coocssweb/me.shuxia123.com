import React, { Component } from 'react';
import className from 'classnames';
import { Route, Switch, Link } from 'react-router-dom';
import Home from '../containers/home';
import Detail from '../containers/detail';
import Ideas from '../containers/ideas';
import Projects from '../containers/projects';
import { windowScroll } from '../components/utils/domHelper'

class Index extends Component {
    constructor (props) {
        super(props);
        this.handleOpenNav = this.handleOpenNav.bind(this);
        this.state = {
            haveOpened: false
        };
    }

    handleOpenNav () {

        windowScroll(this.state.haveOpened);
        this.setState({
            haveOpened: !this.state.haveOpened
        });
    }

    render () {
        const state = this.state;
        return (
            <React.Fragment>
                <div className={className({'globalHeader': true, 'globalHeader--opened': state.haveOpened })}>
                    <div className={className('globalHeader-content')}>
                        <Link to="/" href="javascript:;" className={className('globalHeader-logo')}>
                            <span className={className('globalHeader-logo--l')}>佳</span>
                            <span className={className('globalHeader-logo--r')}></span>
                            <span className={className('globalHeader-logo--b')}></span>
                            <span className={className('globalHeader-logo--n')}>欣</span>
                        </Link>
                        <nav className={className('globalHeader-nav')}>
                            <Link
                                to="/"
                                className={className('globalHeader-menu')}
                                onClick={this.handleOpenNav}>首页</Link>
                            <Link
                                to={`/ideas/${this.props.classify || ''}`}
                                className={className('globalHeader-menu')}
                                onClick={this.handleOpenNav}>我的想法</Link>
                            <Link
                                to="/projects"
                                className={className('globalHeader-menu')}
                                onClick={this.handleOpenNav}>开源项目</Link>
                            <Link
                                to="/demos"
                                className={className('globalHeader-menu')}
                                onClick={this.handleOpenNav}>实验室</Link>
                        </nav>
                        <a
                            href="javascript:;"
                            className={className({'globalHeader-btn': true, 'globalHeader-btn--close': state.haveOpened})}
                            onClick={this.handleOpenNav}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                    </div>
                    <div className={className('globalHeader-mask')}></div>
                </div>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/detail/:id" component={Detail} exact />
                    <Route path="/ideas" component={Ideas} exact />
                    <Route path="/ideas/:classify" component={Ideas} exact />
                    <Route path="/projects" component={Projects} exact />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Index;
