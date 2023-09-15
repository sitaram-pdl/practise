import GreenWebLogo from '@/assets/images/greenWeb-badge.svg';
import LoadingModel from '@/components/LoadingModel';
import AuditFormSelector from '@/components/audit/AuditFormSelector';
import URLForm from '@/components/audit/URLForm';
import AppShared from '@/components/landing/AppShared';
import classes from '@/scss/GenerateBadge.module.scss';
import { postAuditData } from '@/services/AuditRequest/auditRequest.api';
import { getAllCategories } from '@/services/Category/category.api';
import { getToken } from '@/utils/storage.utils';
import { validateURL } from '@/utils/validate.utils';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AuditRecords() {
  const [hasWebsite, setHasWebsite] = useState(false);
  const [activeRecords, setActiveRecords] = useState(false);
  const [fetching, setIsFetching] = useState(false);

  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login');
  }, []);

  const formTypes = {
    bandwidth: 0.75,
    traffic: 0.35,
    response: 0.65,
    type: 0.55,
    mozRank: 0.7,
  };

  const initialState = Object.freeze({
    website: '',
    websiteCategory: '',
    company: '',
    ...formTypes,
    avoidFlash: true,
    category: null,
  });

  const [formData, setFormData] = useState(initialState);

  const {
    isLoading,
    isError,
    data: categories,
  } = useQuery('categories', getAllCategories);

  const loading = isLoading || isError;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'avoidFlash') {
      setFormData((prev) => ({
        ...prev,
        avoidFlash: e.target.checked,
      }));
      return;
    }

    if (name === 'website') {
      setHasWebsite(false);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: ['website', 'category', 'websiteCategory', 'company'].includes(
        name,
      )
        ? value
        : parseInt(value) / 100,
    }));
  };

  function checkWebsite() {
    setHasWebsite(false);
    toast.dismiss();

    const { company, websiteCategory, website } = formData;

    const hasHttp =
      website.startsWith('http://') || website.startsWith('https://');

    if (!hasHttp) {
      return toast.error('URL should start with http:// or https://');
    }

    const isValid = validateURL(website);

    if (!isValid) {
      return toast.error('URL must be valid!');
    }

    setFormData((prev) => ({ ...prev, website: new URL(website).origin }));

    if (!company || !websiteCategory) {
      return toast.error('Company and Website Category are needed!');
    }

    setHasWebsite(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    const pdfResponse = await postAuditData(formData);

    if (pdfResponse) {
      window.location.href = pdfResponse.pdf;
      setHasWebsite(false);
      setFormData(initialState);
    }

    setIsFetching(false);
  };

  return (
    <>
      {fetching && <LoadingModel />}

      <div className={classes['download-title']}>
        Get Audit <br /> Records
      </div>
      <div className="d-flex justify-content-center">
        <div
          className={`card ${classes['form-card']} ${classes['card']} audit-card`}
          style={{ marginTop: 147 }}
        >
          <img src={GreenWebLogo} height="199" style={{ marginTop: -100 }} />
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column justify-content-center">
              {!loading && (
                <URLForm
                  checkWebsite={checkWebsite}
                  handleChange={handleChange}
                  hasWebsite={hasWebsite}
                  data={categories}
                  activeRecords={activeRecords}
                  setActiveRecords={setActiveRecords}
                />
              )}

              {!loading && hasWebsite && !activeRecords && (
                <AuditFormSelector
                  formTypes={formTypes}
                  onChange={handleChange}
                  data={categories}
                />
              )}
            </div>
          </form>
        </div>
      </div>

      <AppShared />
    </>
  );
}

export default AuditRecords;
