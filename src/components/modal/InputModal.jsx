import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
  deleteCategoryAPI,
  updateCategory,
} from '@/services/Category/category.api';

function InputModal({ category }) {
  const [formData, setFormData] = useState(
    Object.freeze({
      _id: category._id,
      name: category.name,
      description: category.description,
    }),
  );

  const ref = useRef();
  const queryClient = useQueryClient();

  const showEditHandler = () => {
    if (ref.current.classList.contains('show')) {
      ref.current.classList.remove('show');
      return;
    }

    document
      .querySelectorAll('.category-container .edit')
      .forEach((el) => el.classList.remove('show'));
    ref.current.classList.add('show');
  };

  const handleEditCategory = async () => {
    await updateCategory(formData);
    showEditHandler();
    queryClient.refetchQueries('categories');
  };

  const deleteCategory = async () => {
    await deleteCategoryAPI(category._id);
    queryClient.refetchQueries('categories');
  };

  const categoryInputhange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="category-container">
      <div className="viewer">
        <span className="category-name">{category.name}</span>
        <div className="d-flex gap-2">
          <button className="btn btn-dark" onClick={showEditHandler}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={deleteCategory}>
            Delete
          </button>
        </div>
      </div>

      <div className="edit" ref={ref}>
        <div className="form-group">
          <label htmlFor={`${category._id}-name`}>Category Name</label>
          <input
            type="text"
            defaultValue={category.name}
            className="form-control"
            id={`${category._id}-name`}
            onChange={categoryInputhange}
            name="name"
            aria-describedby={`${category._id}-helper`}
          />
          <small id={`${category._id}-helper`} className="form-text text-muted">
            Provide the name for the category{' '}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor={`${category._id}-desc`}>Category Description</label>
          <textarea
            style={{ resize: 'none' }}
            className="form-control mt-2"
            htmlFor={`${category._id}-desc`}
            defaultValue={category.description}
            name="description"
            onChange={categoryInputhange}
            aria-describedby={`${category._id}-deschelper`}
          />
          <small
            id={`${category._id}-deschelper`}
            className="form-text text-muted"
          >
            Provide the description of the category
          </small>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleEditCategory}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default InputModal;
