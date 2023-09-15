import emissionSort from '@/assets/emissionSort.json';
import Columns from '@/assets/svg/Columns';
import EmissionForm from '@/components/emission/EmissionForm';
import EmissionInfoModal from '@/components/emission/EmissionInfoModal';
import EmissionTable from '@/components/emission/EmissionTable';
import { getEmissionRecords } from '@/services/EmissionData/emissionData.api';
import sortData from '@/utils/sortData.utils';
import { getToken } from '@/utils/storage.utils';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { AiFillHome, AiOutlinePlus } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { BsInfoLg } from 'react-icons/bs';

function EmissionData() {
  const [showInfo, setShowInfo] = useState(false);
  const [showFullVersion, setShowFullVersion] = useState(false);
  const [emissionRecord, setEmissionRecord] = useState([]);
  const [originalrecord, setOriginalRecord] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef();

  const { data } = useQuery('emissionRecords', () => getEmissionRecords(), {
    onSuccess: (response) => {
      const newData =
        response.data &&
        response.data.sort((a, b) => Number(a.stockCode) - Number(b.stockCode));
      setEmissionRecord(newData);
      setOriginalRecord(newData);
    },
    onError: (error) => console.log(error.message),
  });

  const handleFullVersion = () => setShowFullVersion((prev) => !prev);
  const handleOpen = () => setShowInfo(true);
  const handleEdit = () => setShowEdit((prev) => !prev);

  const token = getToken();

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  useEffect(() => {
    if (window.innerWidth < 992) {
      setShowFullVersion(false);
    }
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setEmissionRecord(originalrecord);
      selectRef.current.selectedIndex = 0;
      return;
    }

    const timer = setTimeout(() => {
      const regexPattern = new RegExp(searchTerm, 'i');

      const filteredArray = emissionRecord.filter((obj) => {
        for (const key in obj) {
          if (regexPattern.test(obj[key])) {
            return true;
          }
        }
        return false;
      });
      setEmissionRecord(filteredArray);
    }, 500);

    return () => clearInterval(timer);
  }, [searchTerm]);

  const handleSort = (event) => {
    const value = event.target.value;
    const tempData = [...emissionRecord];
    const newSort = tempData.sort((a, b) => sortData(a, b, value));

    setEmissionRecord(newSort);
  };

  return (
    <div className="custom-container margin-auto">
      {showInfo && <EmissionInfoModal setShow={setShowInfo} show={showInfo} />}
      <div className="breadcrumb-container">
        <div className="breadcrumbs">
          <AiFillHome />
          <span>Sitemap</span>
          <span>EN</span>
          <span>繁</span>
          <span>简</span>
          <span>Text Size</span>
        </div>

        <div className="searchbar">
          <BiSearch />
          <input
            onChange={handleSearchChange}
            type="text"
            name="search"
            className="custom-input"
            placeholder="Enter Search Keyword(s)"
          />
        </div>
      </div>

      <div className="emission-heading mb-4">
        <h1>GHG Emissions Data</h1>
        <span></span>
      </div>
      <div className="table-info">
        <div className="table-header">
          <div className="table-left">
            <span className="version" onClick={handleFullVersion}>
              View {showFullVersion ? 'Minimal' : 'Full'}{' '}
              <span className="version-label">Version</span>
            </span>
            {token && (
              <span className="icons bg-icons" onClick={handleEdit}>
                <AiOutlinePlus />
              </span>
            )}
            <span className="icons" onClick={handleOpen}>
              <BsInfoLg />
            </span>
          </div>

          <div className="table-right">
            <Columns />
            <span className="label">Sort by</span>
            <select onChange={handleSort} ref={selectRef}>
              {emissionSort.map((sort, index) => {
                return (
                  <option key={index} value={sort.value}>
                    {sort.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {showEdit && <EmissionForm setShowEdit={setShowEdit} />}

        <div>
          <EmissionTable
            showFullVersion={showFullVersion}
            emissionRecord={emissionRecord}
          />
        </div>
      </div>

      {/* <div className="d-flex gap-2 mt-4">
        <span className="d-flex gap-2">
          <img src={leftArrow} alt="left" />
          <img src={rightArrow} alt="right" />
        </span>

        <p className="info-hover">
          Mouse over to see the reported total GHG emissions in other years.
        </p>
      </div> */}
    </div>
  );
}

export default EmissionData;
