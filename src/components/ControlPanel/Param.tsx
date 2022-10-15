import { Input } from 'antd';
import { CodeEditor } from '../CodeEditor';

type Props = {
  title: string;
  type: 'number' | 'code';
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
        return <CodeEditor onChange={onChange} {...props} />;
    }
  };

  return (
    <div className={`param param--${type}`}>
      <span className='param__title'>{title}</span>
      {renderInputForType()}
    </div>
  );
};
