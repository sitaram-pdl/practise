import { AiFillDelete } from 'react-icons/ai';
import EmissionPopOver from './EmissionPopover';
import { getToken } from '@/utils/storage.utils';
import { useQueryClient } from '@tanstack/react-query';
import { deleteEmissionRecords } from '@/services/EmissionData/emissionData.api';

function EmissionTable({ showFullVersion, emissionRecord }) {
  const queryClient = useQueryClient();

  const handleEmissionDel = async (id) => {
    await deleteEmissionRecords(id);
    queryClient.invalidateQueries('emissionRecords');
  };

  const token = getToken();

  return (
    <table className="rounded-corners">
      <thead>
        <tr className="header" style={{ textAlign: 'center' }}>
          <th>Stock Code</th>
          <th>Name of Listed Company</th>
          <th>Hang Seng Industry Classification</th>
          <th colSpan={3}>
            Reported GHG Emissions in total (Kg CO<sub>2</sub> -e)
          </th>
          {showFullVersion && (
            <>
              <th colSpan={3}>CPR Informtaion provided by the companies</th>
              <th>Summary of Carbon footprint</th>
              <th>CDP Response/ ESG_Report/ Others</th>
              <th>Remarks</th>
            </>
          )}
          {token && <th></th>}
        </tr>

        <tr className={`section ${showFullVersion ? 'full' : 'small'}`}>
          <th></th>
          <th></th>
          <th></th>
          <th className="subsection">GHG emissions on Monthly basis</th>
          <th className="subsection">GHG emissions per 1000 Visitors</th>
          <th className="subsection">Green Score</th>
          {showFullVersion && (
            <>
              <th className="subsection">Full-time- equivalent Employee</th>
              <th className="subsection">
                Gross Floor Area (m<sup>2</sup>)
              </th>
              <th className="subsection">Revenue (HK$ million)</th>
              <th></th>
              <th></th>
              <th></th>
            </>
          )}
          {token && <th></th>}
        </tr>
      </thead>

      <tbody>
        {emissionRecord &&
          emissionRecord.map((emitRecord, index) => {
            const { companyInfo } = emitRecord;
            return (
              <tr key={`index-00${index}`}>
                <td>{emitRecord.stockCode}</td>
                <td>{emitRecord.company}</td>
                <td>{emitRecord.category.name}</td>
                <td className="data">
                  <div>
                    {emitRecord.report ? (
                      <EmissionPopOver info={emitRecord.report} />
                    ) : (
                      <span
                        style={{
                          display: 'inline-block',
                          width: 18,
                          height: 18,
                        }}
                      ></span>
                    )}

                    <span>
                      {emitRecord.emissionReport['monthly'].toLocaleString(
                        'en-US',
                      )}
                    </span>
                  </div>
                </td>
                <td>
                  {emitRecord.emissionReport['perThousand'].toLocaleString(
                    'en-US',
                  )}
                </td>
                <td>{emitRecord.emissionReport['score']}</td>
                {showFullVersion && (
                  <>
                    <td
                      className={
                        companyInfo?.fulltime?.reportedDirect
                          ? 'normal'
                          : 'italic'
                      }
                    >
                      {companyInfo?.fulltime?.value.toLocaleString('en-US') ||
                        '―'}
                    </td>
                    <td
                      className={
                        companyInfo?.grossFloor?.reportedDirect
                          ? 'normal'
                          : 'italic'
                      }
                    >
                      {companyInfo?.grossFloor?.value.toLocaleString('en-US') ||
                        '―'}
                    </td>
                    <td
                      className={
                        companyInfo?.revenue?.reportedDirect
                          ? 'normal'
                          : 'italic'
                      }
                    >
                      {companyInfo?.revenue?.value.toLocaleString('en-US') ||
                        '―'}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {emitRecord?.carbonFootprint ? (
                        <a
                          href={emitRecord?.carbonFootprint}
                          className="emit-link"
                          target="_blank"
                        >
                          Link
                        </a>
                      ) : (
                        '―'
                      )}
                    </td>
                    <td>
                      {emitRecord?.response ? (
                        <a
                          href={emitRecord?.response}
                          className="emit-link"
                          target="_blank"
                        >
                          Link
                        </a>
                      ) : (
                        '―'
                      )}
                    </td>
                    <td>
                      {emitRecord?.remark ? (
                        <a
                          href={emitRecord?.remark}
                          className="emit-link"
                          target="_blank"
                        >
                          Link
                        </a>
                      ) : (
                        '―'
                      )}
                    </td>
                  </>
                )}
                {token && (
                  <td onClick={() => handleEmissionDel(emitRecord._id)}>
                    <AiFillDelete className="icon-del" />
                  </td>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default EmissionTable;
