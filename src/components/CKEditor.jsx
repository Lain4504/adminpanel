import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Modal } from 'antd';
import parse from 'html-react-parser'; // Importing html-react-parser

const CKEditorComponent = ({ onChange, value }) => {
  const [editorData, setEditorData] = useState(value || '');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    setEditorData(value);
  }, [value]);
  useEffect(() => {
    if (!value) {
      setEditorData(''); // Xóa rỗng nếu không có dữ liệu
    }
  }, [value]);
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={editorData} // Bind the editorData state to CKEditor
        onReady={editor => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          console.log({ event, editor, data });
          onChange(data); // Call the onChange prop to propagate data
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />

      <Button type="primary" style={{ marginTop: '20px' }} onClick={showModal}>
        Preview
      </Button>

      <Modal
        title="Preview Content"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1200}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        <div style={{ width: '100%', maxWidth: '280mm', margin: '0 auto' }}>
          {parse(editorData)} {/* Render HTML safely using html-react-parser */}
        </div>
      </Modal>
    </div>
  );
};

export default CKEditorComponent;
