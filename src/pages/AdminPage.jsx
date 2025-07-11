import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', department: '', email: '', phone: '' });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchEmployees = async () => {
    const res = await axios.get('http://localhost:5000/api/employees', {
      headers: { Authorization: token },
    });
    setEmployees(res.data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`http://localhost:5000/api/employees/${editId}`, form, {
        headers: { Authorization: token },
      });
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/api/employees', form, {
        headers: { Authorization: token },
      });
    }
    setForm({ name: '', department: '', email: '', phone: '' });
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/employees/${id}`, {
      headers: { Authorization: token },
    });
    fetchEmployees();
  };

  const handleEdit = (emp) => {
    setEditId(emp._id);
    setForm(emp);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Admin Panel</h2>
      <input placeholder="Name" className="form-control my-1" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Department" className="form-control my-1" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
      <input placeholder="Email" className="form-control my-1" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Phone" className="form-control my-1" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      <button className="btn btn-success my-2" onClick={handleSubmit}>{editId ? 'Update' : 'Add'} Employee</button>

      <ul className="list-group mt-3">
        {employees.map(emp => (
          <li key={emp._id} className="list-group-item d-flex justify-content-between align-items-center">
            {emp.name} ({emp.department})
            <span>
              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(emp)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp._id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
