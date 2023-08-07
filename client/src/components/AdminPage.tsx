import React, { useRef } from 'react';
import axios from 'axios';
import './admin.css';
import { useToast } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";

function AdminPage() {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleFileUpload = async () => {
    const files = fileInputRef.current?.files;

    if (!files) {
      return; 
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`file`, files[
        i]);
    }

    const api = 'http://35.192.15.184/upload-file';

    try {

      const response = await axios.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);

      toast({
        title: 'Success',
        description: 'Data uploaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error:any) {
      if (error.response && error.response.data && error.response.data.detail) {
        const errorMessage = error.response.data.detail[0].msg;
        toast({
          title: 'Error',
          description: errorMessage,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while uploading data',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className="admin">
      <h1>{t('admin.p1')}</h1>
      <form>
        <input type="file" multiple ref={fileInputRef} />
        <button className="btn" type="button" onClick={handleFileUpload}>
          {t('admin.p2')}
        </button>
      </form>
    </div>
  );
}

export default AdminPage;
