import { useEffect, useState } from 'react';
import Pagination from './components/Pagination.jsx';
import './App.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortDirection, setSortDirection] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(8);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');

        if (!response.ok) {
          throw new Error('Unable to fetch users, please try again later.');
        }

        const resData = await response.json();
        setUsers(resData.users);
      } catch(error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    let results = users;

    if (searchTerm) {
      results = results.filter(user => 
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleChangeSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortByLastName = (e) => {
    console.log('foo');
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  if (error) return <p>Error loading customers.  Please try again later.</p>;

  return (
    <div>
      <h1>Users</h1>
      <input
        type="text"
        placeholder="Search on last name"
        value={searchTerm}
        onChange={handleChangeSearchInput}
      />
      {loading && <p>Loading customers ...</p>}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th onClick={handleSortByLastName}>Last Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {!loading && currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  )
}
