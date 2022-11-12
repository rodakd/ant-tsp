import { Button, Modal } from 'antd';
import { useState } from 'react';
import { IoDownloadOutline } from 'react-icons/io5';
import { useStore } from '~/store';

export const Export = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const bestToursHistory = useStore((state) => state.bestToursHistory);

  const exportToCSV = () => {
    const dataArr = [['Iteration', 'Cost']];
    bestToursHistory.forEach((entry) =>
      dataArr.push([entry.iteration.toString(), entry.cost.toString()])
    );
    const data = dataArr.map((row) => row.join(',')).join('\r\n');
    downloadFile({ data, filename: 'export.csv', type: 'text/csv;charset=utf-8;' });
  };

  const exportToJSON = () => {
    downloadFile({
      data: JSON.stringify(bestToursHistory, null, '\t'),
      filename: 'export.json',
      type: 'text/json',
    });
  };

  const downloadFile = (opts: { data: string; filename: string; type: string }) => {
    const blob = new Blob([opts.data], { type: opts.type });
    const url = URL.createObjectURL(blob);
    const pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', opts.filename);
    pom.click();
  };

  return (
    <>
      <Button
        onClick={() => setModalOpened(true)}
        className='export-btn'
        icon={<IoDownloadOutline size={18} />}
      >
        Export Data
      </Button>
      <Modal
        title='Export Data'
        open={modalOpened}
        onCancel={() => setModalOpened(false)}
        footer={
          <>
            <Button onClick={() => setModalOpened(false)}>Cancel</Button>
            <Button
              type='primary'
              onClick={() => {
                exportToCSV();
                setModalOpened(false);
              }}
            >
              Export to CSV
            </Button>
            <Button
              type='primary'
              onClick={() => {
                exportToJSON();
                setModalOpened(false);
              }}
            >
              Export to JSON
            </Button>
          </>
        }
      >
        <p>You can export gathered data to CSV or JSON format.</p>
        <p> Please select the desired format:</p>
      </Modal>
    </>
  );
};
