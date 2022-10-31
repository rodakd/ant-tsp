import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type Props = {
  icon: JSX.Element;
  title: string;
  disabled?: boolean;
  text?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const PanelButton = ({ icon, disabled, text, ...buttonProps }: Props) => {
  return (
    <button className={cn('panel-button', { 'panel-button--disabled': disabled })} {...buttonProps}>
      {icon} {text}
    </button>
  );
};
