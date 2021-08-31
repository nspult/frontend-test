import React from 'react';
import PropTypes from 'prop-types';


export const size = {
    values: ['bs', 'lg', 'full'],
    default: 'bs',
};

export default class Modal extends React.Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        onClose: PropTypes.func,
        closeLink: PropTypes.bool,
        size: PropTypes.oneOf(size.values),
        className: PropTypes.string,
    };

    static defaultProps = {
        value: 0,
        isOpen: false,
        closeLink: true,
        size: size.default,
        className: ''
    };

    constructor() {
        super();
    }

    componentWillMount() {
        if (this.props.isOpen) {
            document.documentElement.classList.add('rmodal-open')
        }
    }

    componentDidUpdate() {
        if (this.props.isOpen) {
            document.documentElement.classList.add('rmodal-open')
        } else {
            document.documentElement.classList.remove('rmodal-open')
        }
    }

    componentWillUnmount() {
        document.documentElement.classList.remove('rmodal-open')
    }

    render() {
        const {props} = this;

        if (!props.isOpen) {
            return '';
        }

        return (
            <div className={"rmodal rmodal-" + props.size + (props.isOpen ? " open" : "") + " " + props.className}>
                <div className="rmodal-overlay"
                     onClick={() => {
                         if (this.props.onClose) {
                             this.props.onClose()
                         }
                     }}/>
                <div className="rmodal-dialog">
                    {props.children}
                    {props.closeLink ?
                        <span className="close"
                              onClick={(e) => {
                                  if (this.props.onClose) {
                                      this.props.onClose()
                                  }
                              }}>
                            <span className="icon icon-cross"/>
                        </span> : ''
                    }
                    {props.load ?
                        'loader' : ''
                    }
                </div>
            </div>
        );
    }
}
