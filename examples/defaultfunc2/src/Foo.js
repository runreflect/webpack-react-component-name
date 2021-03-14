import React from 'react';
import PropTypes from 'prop-types';

import { StyledInput, StyledSelectedValue } from './styles';

Foo.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
};

Foo.defaultProps = {
  onChange: () => {},
  validator: () => true // check if the value should be added
};

export default function Foo (props) {
  const {
    onChange,
    placeholder,
    ...rest
  } = props;

  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef(null);
  const tags = ['foo', 'bar', 'baz'];

  return (
    <>
      {tags.map(tag => (
        <StyledSelectedValue
          key={tag}
        >
          {tag}
        </StyledSelectedValue>
      ))}
      <StyledInput
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        ref={inputRef}
        {...rest}
      />
    </>
  );
}
