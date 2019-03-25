import React, { Component } from 'react';
import className from 'classnames';
import { Route, Switch, Link } from 'react-router-dom';
import Home from '../containers/home';
import Detail from '../containers/detail';
import Ideas from '../containers/ideas';
// import CoolPanel from '@components/coolpanel';
/* todo coolpanel
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
*/

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
        return (
            <React.Fragment>
                <div className={className('globalHeader')}>
                    <div className={className('globalHeader-content')}>
                        <Link to="/" href="javascript:;" className={className('globalHeader-logo')}>
                            <span className={className('globalHeader-logo--l')}></span>
                            <span className={className('globalHeader-logo--r')}></span>
                            <span className={className('globalHeader-logo--b')}></span>
                            <span className={className('globalHeader-logo--n')}></span>
                        </Link>
                        <nav className="globalHeader-nav">
                            <Link to="/ideas" className={className('globalHeader-menu')} href="javascript:;">我的想法</Link>
                        </nav>
                    </div>
                </div>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/detail/:id" component={Detail} exact />
                    <Route path="/ideas" component={Ideas} exact />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Index;
