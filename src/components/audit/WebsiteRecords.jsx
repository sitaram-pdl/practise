import Moment from 'react-moment';

function WebsiteRecords({ data }) {
  return (
    <>
      <p className="mb-3">
        Below are the list of reports that are generated before for&nbsp;
        <span style={{ fontStyle: 'italic', textDecoration: 'underline' }}>
          {data.website}
        </span>
      </p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">File Created Date</th>
            <th scope="col">Files</th>
          </tr>
        </thead>
        <tbody>
          {data.files.map((file, index) => {
            return (
              <tr key={file._id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <Moment format="YYYY/MM/DD">{file.date}</Moment> &#40;
                  <Moment fromNow>{file.date}</Moment>
                  &#41;
                </td>
                <td>
                  <a href={file.file} target="_blank" className="link-primary">
                    View Report
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default WebsiteRecords;
