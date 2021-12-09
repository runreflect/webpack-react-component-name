import { forwardRef } from 'react';

const Dialog2 = forwardRef((props, ref) => {
  const {
    isOpen = false,
    hideCloseButton = false,
    onClose,
    position = 'center',
    children,
    onExited,
    duration,
    backdropProps,
    className,
    paperProps = {},
    ...rest
  } = props;
  const handleBackdropClick = React.useCallback(
    (ev) => {
      if (ev.target !== ev.currentTarget) {
        return;
      }

      if (onClose) {
        onClose(ev, 'backdropClick');
      }
    },
    [onClose]
  );

  const handleKeyDown = React.useCallback((ev) => {
    if (ev.key === 'Escape') {
      ev.stopPropagation();
    }
  }, []);

  return (
    <div
      role="document"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      // onMouseDown={handleMouseDown}
      tabIndex={0}
      style={{
        display: 'flex',
        alignItems: position === 'top' ? 'start' : 'center',
        justifyContent: 'center',
        height: '100%',
        outline: 'none',
      }}
    ></div>
  );
});

export default Dialog2;
