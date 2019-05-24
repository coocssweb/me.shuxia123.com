import React, {Component} from 'react';
import propTypes from 'prop-types';
import className from 'classnames';

const DISQUS_CONFIG = [
    'shortname', 'identifier', 'title', 'url', 'category_id', 'onNewComment'
];
let __disqusAdded = false;

function copyProps(context, props, prefix = '') {
    Object.keys(props).forEach((prop) => {
        context[prefix + prop] = props[prop];
    });

    if (typeof props.onNewComment === 'function') {
        context[prefix + 'config'] = function config() {
            this.callbacks.onNewComment = [
                function handleNewComment(comment) {
                    props.onNewComment(comment);
                }
            ];
        };
    }
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    loadDisqus() {
        const props = {};
        DISQUS_CONFIG.forEach((prop) => {
            if (!!this.props[prop]) {
                props[prop] = this.props[prop];
            }
        });

        if (!props.url || !props.url.length) {
            props.url = window.location.href;
        }

        if (typeof DISQUS !== 'undefined') {
            DISQUS.reset({
                reload: true,
                config: function config() {
                    copyProps(this.page, props);
                    this.page.url = this.page.url.replace(/#/, '') + '#!newthread';
                }
            });
        } else {
            copyProps(window, props, 'disqus_');
            this.addDisqusScript();
        }
    }

    addDisqusScript() {
        if (__disqusAdded) {
            return;
        }

        const child = this.disqus = document.createElement('script');
        const parent = document.getElementsByTagName('head')[0] ||
            document.getElementsByTagName('body')[0];

        child.async = true;
        child.type = 'text/javascript';
        child.src = '//www.shuxia123.com/js/embed.js';

        parent.appendChild(child);
        __disqusAdded = true;
    }

    componentDidMount() {
        this.loadDisqus();
    }

    componentDidUpdate() {
        this.loadDisqus();
    }

    render() {
        return (
            <div {...this.props}>
                <div id="disqus_thread"/>
                <noscript>
                  <span>
                    Javascript不可用，请启用Javascript
                    <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a>
                  </span>
                </noscript>
                <a href="http://disqus.com" className="dsq-brlink">
                    Blog comments powered by <span className="logo-disqus">Disqus</span>.
                </a>
            </div>
        );
    }
}

export default Index;
