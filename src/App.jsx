import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
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
      }
    }

    fetchUsers();
  }, []);

  console.log('users: ', users);

  return (
    <div>
      <h1>Henlopen Outfitters Customer List</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
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
    </div>
  )
}

export default App
