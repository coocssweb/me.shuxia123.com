import React, { Component } from 'react';
export default (WrappedComponent) => {
    class Index extends Component {
        componentDidMount () {
            window.scrollTo(0, 0);
            document.querySelector('body').classList.add(this.getUrl());
        }

        getUrl () {
            let { url = '' } = this.props.match;
            url = url === '/' ? 'home' : url.replace('/', '');
            url = url.indexOf('detail') === 0 ? 'detail' : url;
            if (url !== 'home' && url !== 'detail') {
                return 'body-column';
            }
            return `body-${url}`;
        }

        componentWillUnmount () {
            document.querySelector('body').classList.remove(this.getUrl());
        }

        render () {
            return (<WrappedComponent {...this.props} />);
        }
    }
    return Index;
};
