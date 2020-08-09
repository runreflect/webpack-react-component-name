/* eslint-disable react/button-has-type */

import React from 'react';
import pt from 'prop-types';

const noop = () => {};

const Button = props => {
    const {
        disabled, type, variant, children, onClick
    } = props;

    if (variant === 'text') {
        return <button
            type='button'a
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>;
    }

    return <button
        type={type}
        disabled={disabled}
        onClick={onClick}
    >
        <span>
            {children}
        </span>
    </button>;
};

Button.propTypes = {
    block: pt.bool,
    disabled: pt.bool,
    loading: pt.bool,
    type: pt.oneOf(['button', 'submit', 'reset']),
    color: pt.oneOf(['primary', 'secondary', 'red', 'blue', 'green', 'yellow', 'white']),
    variant: pt.oneOf(['default', 'contained', 'outlined', 'text']),
    icon: pt.string,
    iconPosition: pt.oneOf(['start', 'end']),
    size: pt.oneOf(['default', 'large', 'small']),
    onClick: pt.func
};

Button.defaultProps = {
    block: false,
    disabled: false,
    loading: false,
    type: 'button',
    color: 'primary',
    iconPosition: 'start',
    variant: 'default',
    size: 'default',
    onClick: noop
};

export default Button;
