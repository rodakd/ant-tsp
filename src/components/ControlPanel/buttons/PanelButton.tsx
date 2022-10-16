import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';
import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type Props = {
  icon: JSX.Element;
  title: string;
  disabled?: boolean;
  tooltipPlacement?: TooltipPlacement;
  text?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const PanelButton = ({
  icon,
  title,
  disabled,
  tooltipPlacement,
  text,
  ...buttonProps
}: Props) => {
  return (
    <Tooltip
      placement={tooltipPlacement || 'bottomLeft'}
      mouseEnterDelay={0}
      mouseLeaveDelay={0}
      title={title}
    >
      <button
        className={cn('panel-button', { 'panel-button--disabled': disabled })}
        {...buttonProps}
      >
        {icon} {text}
      </button>
    </Tooltip>
  );
};
