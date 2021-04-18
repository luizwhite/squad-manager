import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  textColor?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  className,
  style,
  color,
  textColor = 'white',
}) => (
  <Container {...{ className, style, tooltipColor: color, textColor }}>
    <span>{title}</span>
    {children}
  </Container>
);

export default Tooltip;
