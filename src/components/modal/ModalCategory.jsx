import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import Modal from '../Modal';
import InputModal from './InputModal';
import { addNewCategory } from '@/services/Category/category.api';
import { useQueryClient } from '@tanstack/react-query';

function ModalCategory({ showCategory, data }) {
  const [showExisting, setShowExisting] = useState(true);
  const [formData, setFormData] = useState(
    Object.freeze({ name: '', description: '' }),
  );

  const ref = useRef();
  const nameRef = useRef();
  const descRef = useRef();
  const queryClient = useQueryClient();

  const handleAddButton = () => {
    const hidden = !ref.current.classList.contains('show');
    setShowExisting(!hidden);
    ref.current.classList.toggle('show', hidden);
  };

  const handleAddCategory = async () => {
    if (!formData.name) {
      return toast.error('Category Name is Needed');
    }

    await addNewCategory(formData);
    queryClient.refetchQueries('categories');
    nameRef.current.value = '';
    descRef.current.value = '';

    handleAddButton();
  };

  const categoryInputhange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <Modal
      setShow={showCategory}
      title="Manage Categories"
      show={true}
      backgroundCloseAllow={false}
      contentStyle={{
        padding: 0,
        maxHeight: '40rem',
        overflowY: 'auto',
        display: 'block',
      }}
      style={{ width: '90%', maxWidth: '800px' }}
    >
      <div
        className="modal-body f-p "
        style={{
          padding: '20px',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <button className="btn btn-primary" onClick={handleAddButton}>
            Add New Category
          </button>
          <div className="edit" ref={ref}>
            <div className="form-group">
              <label htmlFor={`name`}>Category Name</label>
              <input
                ref={nameRef}
                type="text"
                className="form-control"
                id={`name`}
                name="name"
                aria-describedby={`helper`}
                onChange={categoryInputhange}
              />
              <small id={`helper`} className="form-text text-muted">
                Provide the name for the category{' '}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor={`desc`}>Category Description</label>
              <textarea
                ref={descRef}
                style={{ resize: 'none' }}
                className="form-control mt-2"
                htmlFor={`desc`}
                name="description"
                aria-describedby={`deschelper`}
                onChange={categoryInputhange}
              />
              <small id={`deschelper`} className="form-text text-muted">
                Provide the description of the category
              </small>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddCategory}
            >
              Submit
            </button>
          </div>
        </div>
        {data &&
          showExisting &&
          data.map((category) => {
            return <InputModal key={category._id} category={category} />;
          })}
      </div>
    </Modal>
  );
}

export default ModalCategory;
