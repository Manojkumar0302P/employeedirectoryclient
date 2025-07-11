import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EmployeeProfile() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/employees/${id}`, {
        headers: { Authorization: token },
      });
      setEmployee(res.data);
    };
    fetch();
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{employee.name}</h2>
      <p><b>Department:</b> {employee.department}</p>
      <p><b>Email:</b> {employee.email}</p>
      <p><b>Phone:</b> {employee.phone}</p>
    </div>
  );
}

export default EmployeeProfile;
