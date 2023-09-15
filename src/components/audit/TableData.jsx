function TableData({ data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" className="company-name">
            Name
          </th>
          <th scope="col">Site</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((company, index) => {
          return (
            <tr key={company.site}>
              <th scope="row">{index + 1}</th>
              <td className="company-name">{company.name}</td>
              <td>{company.site}</td>
              <td style={{ textAlign: 'center' }}>{company.score}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableData;
