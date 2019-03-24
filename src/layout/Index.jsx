import React, { Component } from 'react';
import className from 'classnames';
import { Route, Switch, Link } from 'react-router-dom';
import Home from '../containers/home';
import Detail from '../pages/detail';
import Ideas from '../pages/ideas';
import CoolPanel from '@components/coolpanel';

class Index extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    handleOpen () {

    }

    handleBeforeClose (done) {
        this.setState({
            contentStatus: 'out'
        });

        setTimeout(() => {
            done();
        }, 400);
    }
    
    render () {
        const contentClassName = className({
            'cool-content': true,
            [`cool-content--${this.state.contentStatus}`]: true
        });
        return (
            <React.Fragment>
                <div className={className('globalHeader')}>
                    <Link to="/" href="javascript:;" className={className('globalHeader-logo')}>
                        <span className={className('globalHeader-logo--l')}>佳</span>
                        <span className={className('globalHeader-logo--r')}></span>
                        <span className={className('globalHeader-logo--b')}></span>
                        <span className={className('globalHeader-logo--n')}>欣</span>
                    </Link>
                    <nav className="globalHeader-nav">
                        <Link to="/ideas" className={className('globalHeader-menu')} href="javascript:;">想法</Link>
                    </nav>
                    <CoolPanel 
                        fillColor="255, 255, 255"
                        beforeClose={this.handleBeforeClose.bind(this)}
                        onOpen={this.handleOpen.bind(this)}>
                                <CoolPanel.Menu>
                                    <button className={className('btn btn-transparent btn--small btn--white globalHeader-1984')}>1984</button>
                                </CoolPanel.Menu>
                                <CoolPanel.Content>

                                </CoolPanel.Content>
                            </CoolPanel>
                </div>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/detail" component={Detail} exact />
                    <Route path="/ideas" component={Ideas} exact />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Index;
