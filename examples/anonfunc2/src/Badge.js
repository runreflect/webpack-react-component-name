import React from "react";

export const Badge = ({ theme, size, children, onClick, className }) => {
  return (
    <Container
      size={size}
      theme={theme}
      onClick={onClick}
      className={className}
    >
      {children}
    </Container>
  );
};

