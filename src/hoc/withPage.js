import React, { Component } from 'react';
export default (WrappedComponent) => {
    class Index extends Component {
        componentDidMount () {
            window.scrollTo(0, 0);
        }
        render () {
            return (<WrappedComponent {...this.props} />);
        }
    }
    return Index;
};
