import React from 'react';

const Table = ({users}) => {
    return (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user)=>{
              return <tr key={user.name}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.phone}</td>
            </tr>})}
          </tbody>
        </table>
      );
    }
    
    const styles = {
      table: {
        borderCollapse: 'collapse',
        width: '100%',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      },
      th: {
        backgroundColor: '#007bff',
        color: '#fff',
        fontWeight: 'bold',
        padding: '10px',
        textAlign: 'left',
        textTransform: 'uppercase',
        borderBottom: '2px solid #ddd',
      },
      td: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
      },
    };
    

export default Table;