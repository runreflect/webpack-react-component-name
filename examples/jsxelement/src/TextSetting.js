// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

export default class TextSetting extends React.PureComponent {
    static validTypes = ['input', 'textarea', 'number', 'email', 'tel', 'url', 'password'];

    static defaultProps = {
        labelClassName: '',
        inputClassName: '',
        type: 'input',
        maxLength: -1, // A negative number allows for values of any length
        resizable: true,
    };

    handleChange = (e) => {
        if (this.props.type === 'number') {
            this.props.onChange(this.props.id, parseInt(e.target.value, 10));
        } else {
            this.props.onChange(this.props.id, e.target.value);
        }
    }

    render() {
        const {resizable} = this.props;
        let {type} = this.props;
        let input = null;

        if (type === 'textarea') {
            let style = {};
            if (!resizable) {
                style = Object.assign({}, {resize: 'none'});
            }

            input = (
                <textarea
                    autoFocus={this.props.autoFocus}
                    data-testid={this.props.id + 'input'}
                    id={this.props.id}
                    style={style}
                    className='form-control'
                    rows={5}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    maxLength={this.props.maxLength}
                    onChange={this.handleChange}
                    disabled={this.props.disabled}
                />
            );
        } else {
            type = ['input', 'email', 'tel', 'number', 'url', 'password'].includes(type) ? type : 'input';

            input = (
                <input
                    autoFocus={this.props.autoFocus}
                    data-testid={this.props.id + type}
                    id={this.props.id}
                    className='form-control'
                    type={type}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    maxLength={this.props.maxLength}
                    onChange={this.handleChange}
                    disabled={this.props.disabled}
                />
            );
        }

        return (
            <div
                label={this.props.label}
                labelClassName={this.props.labelClassName}
                inputClassName={this.props.inputClassName}
                helpText={this.props.helpText}
                inputId={this.props.id}
                footer={this.props.footer}
            >
                {input}
            </div>
        );
    }
}
