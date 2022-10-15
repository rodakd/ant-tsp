import { Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

type Props = {
  title: string;
  type: 'number' | 'textarea';
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
      case 'textarea':
        return (
          <TextArea onChange={(e) => onChange(e.currentTarget.value)} autoSize={true} {...props} />
        );
    }
  };

  return (
    <div className={`param param--${type}`}>
      <span className='param__title'>{title}</span>
      {renderInputForType()}
    </div>
  );
};
