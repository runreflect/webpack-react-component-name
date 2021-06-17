import React, { PureComponent } from 'react';
import classNames from 'classnames';

export default class PureVariantOne extends PureComponent {
    render() {
        const {
            foo
        } = this.props;
        return (
            <p className={classNames(foo)}>
                foo
            </p>
        );
    }
}

PureVariantOne.defaultProps = {
    type: 'exampleType',
}
