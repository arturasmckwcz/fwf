import React from 'react';
import './List.css';

const List = ({ handleClick, list }) => {
  return (
    <table
      style={{
        marginTop: '20px',
        display: 'inline-block',
        overflow: 'auto',
        maxHeight: '400px',
      }}
      className="tbl"
    >
      <thead>
        <tr>
          {Object.keys(list[0]).map((value, index) => (
            <th key={index} className="tbl">
              <div
                style={{
                  marginTop: '-20px',
                  position: 'absolute',
                  minWidth: '30px',
                }}
              >
                {value}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list.map((item, idx) => (
          <tr className="rw" onClick={() => handleClick(item.id)} key={idx}>
            {Object.values(item).map((value, index) => (
              <td key={index} className="tbl" style={{ minWidth: '30px' }}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
