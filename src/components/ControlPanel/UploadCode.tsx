import { Button } from 'antd';
import { FiTrash2, FiUpload } from 'react-icons/fi';
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
        <FiTrash2 />
        Remove Code
      </Button>
    );
  }

  return (
    <Button onClick={uploadCode} className='upload-code'>
      <FiUpload />
      Upload Code
    </Button>
  );
};
