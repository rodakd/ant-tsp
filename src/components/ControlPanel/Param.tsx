import { Input, InputProps } from 'antd';

type Props = InputProps & {
  title: string;
} & { type: 'number'; onChange: (value: number) => void };

export const Param = ({ title, type, onChange, ...inputProps }: Props) => {
  const renderInputForType = () => {
    switch (type) {
      case 'number':
        return (
          <Input
            className='param__input param__input--number'
            type='number'
            onChange={(e) => onChange(Number(e.currentTarget.value))}
            {...inputProps}
          />
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
