import { Tooltip } from 'antd';
import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type Props = {
  icon: JSX.Element;
  title: string;
  disabled?: boolean;
  text?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const PanelButton = ({ icon, title, disabled, text, ...buttonProps }: Props) => {
  return (
    <Tooltip placement='bottom' mouseEnterDelay={0} mouseLeaveDelay={0} title={title}>
      <button
        className={cn('panel-button', { 'panel-button--disabled': disabled })}
        {...buttonProps}
      >
        {icon} {text}
      </button>
    </Tooltip>
  );
};
