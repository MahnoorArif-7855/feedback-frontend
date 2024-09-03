import { getServerURL } from '@/common/utils/func';
import { getDownloadURL, ref } from '@firebase/storage';
import { Button, Card, Col, Row, Table, Typography, Upload, notification } from 'antd';
import axios from 'axios';
import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';

import { firebaseAuth, firebaseStorage } from '../../../firebase';
import { UploadWrapper } from './UploadCSV.styles';

const { Text } = Typography;

const UploadCSV = () => {
  const [fileList, setFileList] = useState([]);

  const [user] = useAuthState(firebaseAuth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFileData, setPreviewFileData] = useState(null);
  const [tableRow, setTableRow] = useState([]);
  const [downloadLink, setDownloadLink] = useState('');
  const [uploadLoader, setUploadLoader] = useState(false);
  const { selectedOrganizationId } = useSelector((state) => state.auth);
  const { authDetails } = useSelector((state) => state.auth);
  const { organizationId } = authDetails || {
    organizationId: null,
  };

  const { uid } = user || { uid: null };

  useEffect(() => {
    const fileData = fileList[fileList.length - 1];
    if (fileData) {
      setPreviewFileData(null);
      setSelectedFile(fileData);
      Papa.parse(fileData, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const filteredData = results.data.filter(
            (row) => row['Submit Date'] && row['Category '] && row['Description ']
          );

          const data = filteredData.map((row) => ({
            SubmitDate: row['Submit Date'],
            Category: row['Category '],
            Feedback: row['Description '],
          }));

          console.log('data', data);

          if (data && data.length > 0) {
            setTableRow([
              {
                title: 'Submit Date',
                dataIndex: 'SubmitDate',
                key: 'SubmitDate',
              },
              {
                title: 'Tags',
                dataIndex: 'Category',
                key: 'Category',
              },
              {
                title: 'Feedback',
                dataIndex: 'Feedback',
                key: 'Feedback',
              },
            ]);
            setPreviewFileData(data);
          } else {
            setTableRow([
              {
                title: 'feedback',
                dataIndex: results?.meta?.fields[0],
                key: results?.meta?.fields[0],
              },
              // {
              //   title: 'date',
              //   dataIndex: results?.meta?.fields[1],
              //   key: results?.meta?.fields[1],
              // },
            ]);
            setPreviewFileData(results.data);
          }
        },
      });
    } else {
      setPreviewFileData(null);
      setTableRow([]);
    }
  }, [fileList]);

  const handleFileUpload = async () => {
    if (selectedFile) {
      setUploadLoader(true);

      const formData = new FormData();
      formData.append('file', selectedFile);
      user &&
        (await user
          .getIdToken(/* forceRefresh */ true)
          .then(async (token) => {
            // Include the token in the request header
            await axios
              .post(
                `${getServerURL()}/upload-file?organizationId=${selectedOrganizationId || organizationId}&userId=${uid}`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                  },
                }
              )
              .then((response) => {
                // Handle the response from the server
                notification.success({
                  message: response.data,
                  type: 'success',
                });
                setUploadLoader(false);
                setPreviewFileData(null);
                setTableRow([]);
              })
              .catch((error) => {
                // Handle any errors
                setUploadLoader(false);
                setPreviewFileData(null);
                setTableRow([]);
              });
          })
          .catch((error) => {
            console.log('error', error);
          }));
    }
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  async function fetchFileURL() {
    try {
      const fileRef = ref(firebaseStorage, `/csv-folder/file_sample.csv`);
      const url = await getDownloadURL(fileRef);
      setDownloadLink(url);
    } catch (error) {
      console.error('Error fetching file URL:', error);
    }
  }

  useEffect(() => {
    fetchFileURL();
  }, []);

  return (
    <>
      <Col lg={24}>
        <Card
          key='upload-csv'
          title='Upload CSV file'
          extra={
            <Button
              target='_blank'
              onClick={() => {
                window.location.assign(downloadLink);
              }}
              type='primary'
            >
              Sample File
            </Button>
          }
          // title={
          //   <div className='upload-header'>
          //     <Text>Upload CSV file</Text>
          //     <Button
          //       target='_blank'
          //       onClick={() => {
          //         window.location.assign(downloadLink);
          //       }}
          //       type='primary'
          //     >
          //       Sample File
          //     </Button>
          //   </div>
          // }
          style={{
            marginBottom: '2em',
          }}
        >
          <UploadWrapper>
            <div className='upload-section'>
              <Text>Browse file to upload csv</Text>
              <Upload {...props}>
                <Button> Browse CSV file</Button>
              </Upload>
            </div>

            {previewFileData && previewFileData.length > 0 && (
              <div className='upload-section'>
                <Text strong>After privew the data, click on the upload button</Text>
                <Button loading={uploadLoader} onClick={handleFileUpload} type='primary'>
                  Upload CSV
                </Button>
              </div>
            )}
          </UploadWrapper>
        </Card>
      </Col>

      <Row gutter={[16, 16]}>
        {previewFileData && previewFileData.length > 0 && (
          <Col xs={24}>
            <Card title={'Preview'}>
              <Table
                dataSource={previewFileData}
                columns={previewFileData.length > 0 && tableRow}
                scroll={{
                  x: 600,
                }}
              />
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};
export default UploadCSV;
