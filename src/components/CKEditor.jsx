import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Modal } from 'antd';

const CKEditorComponent = () => {
  const [editorData, setEditorData] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data=""
        onReady={editor => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          console.log({ event, editor, data });
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
        width={1200} // Set a fixed width for the modal
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }} // Allow scrolling if content is too tall
      >
        <div style={{ width: '100%', maxWidth: '280mm', margin: '0 auto' }}>
          <div dangerouslySetInnerHTML={{ __html: editorData }} style={{ wordWrap: 'break-word' }} />
        </div>
      </Modal>
    </div>
  );
};

export default CKEditorComponent;
