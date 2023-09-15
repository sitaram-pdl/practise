import { useState, useEffect } from 'react';
import Input from './Input';
import TableData from './TableData';
import ModalCategory from '../modal/ModalCategory';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/services/Category/category.api';
import SelectCategory from './SelectCategory';

function AuditFormSelector({ formTypes, onChange, data }) {
  const [showOption, setShowOption] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // const category = await
    };

    if (showOption) {
      fetchData();
    }
  }, [showOption]);

  return (
    <>
      <div className="mb-3 border-top border-secondary border-2 pt-3">
        <div className="row">
          {Object.keys(formTypes).map((key) => {
            return (
              <div className="col-md-6" key={key}>
                <Input
                  aria={`${key}Helper`}
                  defaultValue={formTypes[key]}
                  id={key}
                  name={key}
                  onChange={onChange}
                />
              </div>
            );
          })}

          <div className="col-md-6">
            <div className="mb-3">
              <label
                className="form-label"
                style={{ textTransform: 'capitalize' }}
              >
                Mobile Optimization
              </label>

              <div className="d-flex align-items-center  form-control-custom gap-1">
                <input
                  onChange={onChange}
                  type="checkbox"
                  className="form-check-input "
                  name="avoidFlash"
                  defaultChecked={true}
                  id="avoidFlash"
                />
                <label className="form-check-label" htmlFor="avoidFlash">
                  Avoid Flash
                </label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="category"
              className="form-label"
              style={{ textTransform: 'capitalize' }}
            >
              Category
            </label>

            <SelectCategory
              categories={data}
              onChange={onChange}
              setShowOption={setShowOption}
              name="category"
              id="category"
            />

            <div id="categoryHelper" className="form-text">
              Choose one of the options to compare data score
            </div>
          </div>

          {categoryData && <TableData data={categoryData.company} />}
        </div>
      </div>
      <div
        className="d-flex justify-content-center gap-4"
        style={{ margin: 33 }}
      >
        <button
          className={`btn btn-sm btn-outline-secondary button-content button__generate`}
          type="submit"
        >
          Generate Records
        </button>
      </div>
    </>
  );
}

export default AuditFormSelector;
