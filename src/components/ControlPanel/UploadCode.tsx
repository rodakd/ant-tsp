import { Button } from 'antd';
import { uploadFile } from '~/helpers';

type Props = {
  code: string;
  onChange: (code: string) => void;
};

export const UploadCode = ({ code, onChange }: Props) => {
  const uploadCode = async () => {
    const str = await uploadFile('.js');
    if (!str) {
      return;
    }
    onChange(str);
  };

  if (code) {
    return (
      <Button onClick={() => onChange('')} className='upload-code'>
        Remove Code
      </Button>
    );
  }

  return (
    <Button onClick={uploadCode} className='upload-code'>
      Upload Code
    </Button>
  );
};
