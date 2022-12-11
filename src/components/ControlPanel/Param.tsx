import { Input } from 'antd';
import { UploadCode } from './UploadCode';

type Props = {
  title: string;
  type: 'number' | 'code';
  value: any;
} & any;

export const Param = ({ title, type, onChange, ...props }: Props) => {
  const renderInputForType = () => {
    switch (type) {
      case 'number':
        return (
          <Input
            type='number'
            onChange={(e) => onChange(Number(e.currentTarget.value))}
            {...props}
          />
        );
      case 'code':
        return <UploadCode code={props['value']} onChange={(code) => onChange(code)} />;
    }
  };

  return (
    <div className={`param param--${type}`}>
      <span className='param__title'>{title}</span>
      {renderInputForType()}
    </div>
  );
};
