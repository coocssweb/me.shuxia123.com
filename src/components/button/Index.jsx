import React, { Component} from 'react'
import classNames from 'classnames';
import { Link } from 'react-router-dom';

class Index extends Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e){
        if(this.props.onClick){
            this.props.onClick(e);
        }
    }

    render() {
        const props = this.props;
        let btnClassName = classNames({
            'button': true,
            'button--black': props.color === 'black'
        });

        return (
            <Link to={props.link} className={btnClassName}>
                {this.props.children}
                <div className={classNames('button-dotList')}>
                    <div className={classNames('button-dot button-dot--long')}></div>
                    <div className={classNames('button-dot button-dot--middle')}></div>
                    <div className={classNames('button-dot button-dot--short')}></div>
                </div>
                <div className={classNames('button-borderList')}>
                    <svg width="100%" height="100%">
                        <rect className={classNames('button-border--stroke')} width="100%" height="100%"></rect>
                        <rect className={classNames('button-border--meteor')} width="100%" height="100%"></rect>
                    </svg>
                </div>
            </Link>
        )
    }
}

export default Index
