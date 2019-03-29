import React, { Component } from 'react';
export default (WrappedComponent) => {
    class Index extends Component {
        componentDidMount () {
            window.scrollTo(0, 0);
            const url = this.getUrl();
            document.querySelector('body').classList.add(url);
            /*eslint-disable*/
            // 百度PV统计
            // const { id } = this.props.match.params;
            // let pageUrl = url.replace('body-', '');
            // if (id) {
            //     pageUrl = `${pageUrl}/${id}`;
            // }
            // _hmt.push(['_trackPageview', `https://www.shuxia123.com/${pageUrl}`]);
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
