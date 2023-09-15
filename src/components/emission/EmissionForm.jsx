import { useEffect, useState } from 'react';
import Input from '../audit/Input';
import SelectCategory from '../audit/SelectCategory';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllCategories } from '@/services/Category/category.api';
import { toast } from 'react-toastify';
import { getWebsiteStoredData } from '@/services/Category/categoryScore.api';
import { validateURL } from '@/utils/validate.utils';
import ModalCategory from '../modal/ModalCategory';
import {
  addEmissionRecords,
  getEmissionRecords,
} from '@/services/EmissionData/emissionData.api';

function EmissionForm({ setShowEdit }) {
  const [websiteStoredCategory, setWebsiteStoredCategory] = useState(null);
  const [storedEmission, setStoredEmission] = useState(null);
  const [showCategory, setShowCategory] = useState(false);

  const queryClient = useQueryClient();

  function resetInputValue() {
    setWebsiteStoredCategory({
      hasValue: false,
      company: '',
      category: '',
    });
    setFormData((prev) => ({
      ...prev,
      category: '',
      company: '',
      stockCode: '',
    }));
  }

  const [formData, setFormData] = useState({
    url: '',
    stockCode: '',
    company: '',
    category: '',
    companyInfo: '',
  });

  useEffect(() => {
    async function checkWebsite() {
      resetInputValue();
      if (!formData.url) return;
      const url = formData.url;
      const hasHttp = url.startsWith('http://') || url.startsWith('https://');

      const isValid = validateURL(url);

      if (!hasHttp || !isValid) {
        return;
      }

      const { data: storedRecord } = await getEmissionRecords(url);

      if (!storedRecord) {
        const { data } = await getWebsiteStoredData(url);
        setFormData((prev) => ({
          ...prev,
          category: data.category,
          company: data.company,
        }));

        setWebsiteStoredCategory(data);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        company: storedRecord.company,
        category: storedRecord.category._id,
        stockCode: storedRecord.stockCode,
      }));
      setStoredEmission(storedRecord);
    }

    const timer = setTimeout(() => checkWebsite(), 1500);
    return () => clearTimeout(timer);
  }, [formData.url]);

  const { data: categories } = useQuery('categories', getAllCategories);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function createProperty(object, property) {
    if (!object[property]) {
      object[property] = {};
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const website = formData.url;

    const hasHttp =
      website.startsWith('http://') || website.startsWith('https://');

    if (!hasHttp) {
      return toast.error('URL should start with http:// or https://');
    }

    const isValid = validateURL(website);

    if (!isValid) {
      return toast.error('URL must be valid!');
    }

    const postData = {
      url: formData.url,
      stockCode: formData.stockCode,
      company: formData.company,
      category: formData.category,
    };

    if (formData.fulltime) {
      createProperty(postData, 'companyInfo');
      postData.companyInfo.fulltime = {
        reportedDirect: formData.fullTimeReport === 'on' ? true : false,
        value: formData.fulltime,
      };
    }

    if (formData.grossFloor) {
      createProperty(postData, 'companyInfo');
      postData.companyInfo.grossFloor = {
        reportedDirect: formData.grossFloorReport === 'on' ? true : false,
        value: formData.grossFloor,
      };
    }

    if (formData.revenue) {
      createProperty(postData, 'companyInfo');
      postData.companyInfo.revenue = {
        reportedDirect: formData.revenueReport === 'on' ? true : false,
        value: formData.revenue,
      };
    }

    const promise = addEmissionRecords(postData);

    const status = await toast.promise(promise, {
      pending: 'Getting Ecograder Score',
    });

    if (status) {
      setShowEdit(false);
      queryClient.invalidateQueries('emissionRecords');
    }
  };

  return (
    <>
      {showCategory && (
        <ModalCategory showCategory={setShowCategory} data={categories.data} />
      )}
      <form onSubmit={handleSubmit}>
        <div className="row mt-4">
          <div className="col-md-6">
            <Input
              type="text"
              aria="urlHelper"
              id="url"
              name="url"
              onChange={handleChange}
              subLabel="Website must begin with http:// or https://"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="company" className="form-label">
              Stock Code
            </label>
            <input
              type="text"
              className="form-control audit-form"
              id="stockCode"
              name="stockCode"
              value={formData.stockCode}
              required
              aria-describedby="stockCodeHelp"
              onChange={handleChange}
            />
            <div id="urlHelp" className="form-text">
              Enter stockcode of the company
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="company" className="form-label">
              Company
            </label>
            <input
              type="text"
              className="form-control audit-form"
              id="company"
              name="company"
              value={formData.company}
              required
              aria-describedby="companyHelp"
              onChange={handleChange}
            />
            <div id="urlHelp" className="form-text">
              Provide the name of the company.
            </div>
          </div>

          <div className="col-md-6">
            <label
              htmlFor="category"
              className="form-label"
              style={{ textTransform: 'capitalize' }}
            >
              Category
            </label>
            <div className="d-flex gap-3" style={{ height: 38 }}>
              <SelectCategory
                onChange={handleChange}
                categories={categories}
                name="category"
                defaultValue={formData.category ? formData.category : ''}
                id="category"
              />
              <button
                type="button"
                className={`btn btn-dark`}
                onClick={() => setShowCategory(true)}
              >
                Manage Category
              </button>
            </div>

            <div id="categoryHelper" className="form-text">
              Select which category, a company belongs to.
            </div>
          </div>

          {/* <div className="col-md-6 d-flex gap-3 mt-3">
            <Input
              style={{ width: "100%" }}
              aria="fullTimeHelper"
              required={false}
              id="fulltime"
              name="fulltime"
              onChange={handleChange}
              subLabel="Enter Full-time- equivalent Employee. (Optional)"
            />
            {formData.fulltime && (
              <div className="d-flex align-items-center  form-control-custom gap-1">
                <input
                  onChange={handleChange}
                  type="checkbox"
                  className="form-check-input "
                  name="fullTimeReport"
                  id="fullTimeReport"
                />
                <label
                  className="form-check-label"
                  htmlFor="fullTimeReport"
                  style={{ width: 100 }}>
                  Global Data
                </label>
              </div>
            )}
          </div>

          <div className="col-md-6 d-flex gap-3 mt-3">
            <Input
              style={{ width: "100%" }}
              aria="grossFloorHelper"
              id="grossFloor"
              required={false}
              name="grossFloor"
              onChange={handleChange}
              subLabel="Enter Gross Floor Area (m2) of the company (Optional)"
            />

            {formData.grossFloor && (
              <div className="d-flex align-items-center  form-control-custom gap-1">
                <input
                  onChange={handleChange}
                  type="checkbox"
                  className="form-check-input "
                  name="grossFloorReport"
                  id="grossFloorReport"
                />
                <label
                  className="form-check-label"
                  htmlFor="grossFloorReport"
                  style={{ width: 100 }}>
                  Global Data
                </label>
              </div>
            )}
          </div>

          <div className="col-md-6 d-flex gap-3">
            <Input
              style={{ width: "100%" }}
              aria="revenueHelper"
              id="revenue"
              name="revenue"
              required={false}
              onChange={handleChange}
              subLabel="Enter Revenue (HK$ million) of the company (Optional)"
            />
            {formData.revenue && (
              <div className="d-flex align-items-center  form-control-custom gap-1 ">
                <input
                  onChange={handleChange}
                  type="checkbox"
                  className="form-check-input "
                  name="revenueReport"
                  id="revenueReport"
                />
                <label
                  className="form-check-label"
                  htmlFor="revenueReport"
                  style={{ width: 100 }}>
                  Global Data
                </label>
              </div>
            )}
          </div> */}
        </div>

        <div className="d-flex gap-2 mt-3">
          <button type="submit" className={`btn btn-dark`}>
            Submit
          </button>
          <button
            type="button"
            className={`btn btn-danger`}
            onClick={() => setShowEdit(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default EmissionForm;
