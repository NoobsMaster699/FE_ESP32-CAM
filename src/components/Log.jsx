import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useFilters, useSortBy, useTable } from 'react-table';

const SERVER_URL = 'http://localhost:5000/api/log';

function Log() {
  const [log, setLog] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await axios.get(SERVER_URL);
        console.log('Response data:', response.data);

        if (!response.data || !Array.isArray(response.data)) {
          console.error('Unexpected data format:', response.data);
          alert('Unexpected data format received from API. Please check the server logs.');
          return;
        }

        setLog(response.data);
        setError(null); 
      } catch (error) {
        console.error('Error fetching log:', error);
        setError(`Error fetching log: ${error.message}`);
      }
    };

    fetchLog();
  }, []);

  const data = useMemo(() => log, [log]);

  const columns = useMemo(() => [
    { Header: 'Nama Karyawan', accessor: 'Nama Karyawan' },
    { Header: 'Tanggal Masuk', accessor: 'Tanggal' },
    { Header: 'Jam Masuk', accessor: 'Jam Masuk' },
    { Header: 'Jam Pulang', accessor: 'Jam Pulang' },
    { Header: 'Durasi Kerja', accessor: 'Durasi Kerja' },
    { Header: 'Status', accessor: 'Status' },
    { Header: 'Kategory', accessor: 'Category' },
  ], []);

  const tableInstance = useTable({ columns, data }, useFilters, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mb-4">
      <h2>Log Harian Karyawan</h2>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Log;
