import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useFilters, useSortBy, useTable } from 'react-table';


const SERVER_URL = 'http://localhost:5000/api/recap';

function Recap() {
  const [recap, setRecap] = useState([]);
  const [recapDate, setRecapDate] = useState('');

  useEffect(() => {
    const fetchRecap = async () => {
      try {
        const response = await axios.get(SERVER_URL);
        console.log('Response data:', response.data);

        if (response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
          setRecap(response.data.data);
          setRecapDate(response.data.recapDate);
        } else {
          console.error('No recap data found.');
        }
      } catch (error) {
        alert('Error fetching recap: ' + error.message);
      }
    };

    fetchRecap();
  }, []);

  const data = useMemo(() => recap, [recap]);

  const columns = useMemo(() => [
    { Header: 'Nama Karyawan', accessor: 'Nama Karyawan' },
    { Header: 'Masuk', accessor: 'Masuk' },
    { Header: 'Lembur', accessor: 'Lembur' },
    { Header: 'Status', accessor: 'Status' },
  ], []);

  const tableInstance = useTable({ columns, data }, useFilters, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="recap-container">
      <h2>Rekap Mingguan ({recapDate})</h2>
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

export default Recap;
