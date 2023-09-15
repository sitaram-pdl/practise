import { useState } from 'react';
import { useEffect } from 'react';

import { getWebsiteStoredData } from '@/services/Category/categoryScore.api';
import ModalCategory from '../modal/ModalCategory';
import SelectCategory from './SelectCategory';

import { validateURL } from '@/utils/validate.utils.js';
import { getWebsiteRecords } from '@/services/AuditRequest/auditRequest.api';
import WebsiteRecords from './WebsiteRecords';

function URLForm({
  checkWebsite,
  handleChange,
  hasWebsite,
  data,
  setActiveRecords,
  activeRecords,
}) {
  const [showCategory, setShowCategory] = useState(false); // Category of website
  const [company, setCompany] = useState(''); // category of input

  const [website, setWebsite] = useState(null); // website value

  const [websiteStoredData, setWebsiteStoreData] = useState(null);
  const [websiteRecord, setWebsiteRecord] = useState(null);

  const manualHandleChange = (name, value) => {
    handleChange({
      target: { name, value },
    });
  };

  function resetInputValue() {
    setActiveRecords(false);
    setWebsiteRecord(null);
    setWebsiteStoreData({ hasValue: false, company: '', category: '' });
    setCompany('');
  }

  useEffect(() => {
    resetInputValue();

    if (!website) return;
    const timer = setTimeout(async () => {
      const isValid = validateURL(website);
      if (!isValid) return;

      const { data } = await getWebsiteStoredData(website);
      const prevRecords = await getWebsiteRecords(website);

      setActiveRecords(Boolean(prevRecords.data));
      setCompany(data.company);
      setWebsiteRecord(prevRecords.data);
      setWebsiteStoreData(data);

      // Manual Added fetched data
      manualHandleChange('websiteCategory', data.category);
      manualHandleChange('company', data.company);
    }, 500);
    return () => clearTimeout(timer);
  }, [website]);

  const urlHandleChange = async (event) => {
    handleChange(event);
    setWebsite(event.target.value);
  };

  const handleCompanyChange = (event) => {
    const value = event.target.value;
    setCompany(value);
    handleChange(event);
  };

  return (
    <>
      {showCategory && (
        <ModalCategory showCategory={setShowCategory} data={data.data} />
      )}
      <div className="mb-3">
        <label htmlFor="website" className="form-label">
          Website URL
        </label>
        <input
          type="url"
          className="form-control audit-form"
          id="website"
          name="website"
          required
          aria-describedby="urlHelp"
          onChange={urlHandleChange}
        />
        <div id="urlHelp" className="form-text">
          URL should start with http:// or https://
        </div>
      </div>

      {websiteRecord && (
        <div className="d-flex gap-2 mb-2">
          <button
            type="button"
            className={`btn btn-sm ${
              activeRecords ? 'btn-primary' : 'btn-outline-primary '
            }`}
            onClick={() => setActiveRecords(true)}
          >
            Previous Records
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              !activeRecords ? 'btn-dark' : 'btn-outline-dark '
            }`}
            onClick={() => setActiveRecords(false)}
          >
            Generate New Records
          </button>
        </div>
      )}

      {activeRecords && websiteRecord && (
        <div className="mb-3">
          <WebsiteRecords data={websiteRecord} />
        </div>
      )}
      {!activeRecords && (
        <div className="mb-3 row">
          {websiteStoredData?.hasValue && (
            <label
              className="text-primary"
              style={{ fontStyle: 'italic', fontSize: '1rem' }}
            >
              Both field for name of the company and category are autopopulated
              since they are already stored in the database. You can also change
              the data as per your need.
            </label>
          )}
          <div className="col-md-6 mt-3">
            <label htmlFor="company" className="form-label">
              Company
            </label>
            <input
              type="text"
              className="form-control audit-form"
              id="company"
              name="company"
              value={company}
              required
              aria-describedby="urlHelp"
              onChange={handleCompanyChange}
            />
            <div id="urlHelp" className="form-text">
              Provide the name of the company for the given website.
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <label htmlFor="w-category" className="form-label">
              Website's Category
            </label>
            <div className="d-flex gap-3" style={{ height: 38 }}>
              <SelectCategory
                id="w-category"
                name={'websiteCategory'}
                categories={data}
                defaultValue={
                  websiteStoredData ? websiteStoredData.category : ''
                }
                onChange={handleChange}
              />
              <button
                type="button"
                className={`btn btn-dark`}
                onClick={() => setShowCategory(true)}
              >
                Manage Category
              </button>
            </div>
            <div className="form-text">
              Select which category, given website belongs to.
            </div>
          </div>
        </div>
      )}
      {!hasWebsite && (
        <div
          className="d-flex justify-content-end"
          style={{ margin: '33px 0' }}
        >
          {!activeRecords && (
            <button
              type="button"
              className={`btn btn-sm btn-outline-secondary button-content button__generate`}
              onClick={checkWebsite}
            >
              Next
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default URLForm;
