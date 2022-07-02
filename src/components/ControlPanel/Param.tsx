import { Input, InputProps } from 'antd';

type Props = {
  title: string;
  type: 'number';
} & InputProps;

export const Param = ({ title, type, ...inputProps }: Props) => {
  const renderInputForType = () => {
    switch (type) {
      case 'number':
        return (
          <Input className='param__input param__input--number' type='number' {...inputProps} />
        );
    }
  };

  return (
    <div className='param'>
      <span className='param__title'>{title}</span>
      {renderInputForType()}
    </div>
  );
};
