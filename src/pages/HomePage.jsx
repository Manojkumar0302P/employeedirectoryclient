import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');

  const fetchEmployees = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:5000/api/employees?name=${search}`, {
      headers: { Authorization: token },
    });
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  return (
    <div className="container mt-4">
      <h2>Employee Directory</h2>
      <input className="form-control mb-3" placeholder="Search by name" onChange={e => setSearch(e.target.value)} />
      <ul className="list-group">
        {employees.map(emp => (
          <li key={emp._id} className="list-group-item">
            <Link to={`/employee/${emp._id}`}>{emp.name} - {emp.department}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
