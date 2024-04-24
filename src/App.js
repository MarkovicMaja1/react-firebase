import { useEffect, useState } from 'react';
import './App.css';
import { db } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {
  const [userList, setUserList] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [gmailInput, setGmailInput] = useState("");

  const usersCollectionRef = collection(db, "users");

  const fetchUserList = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(filteredData);
    } catch (error) {
      console.error(error);
    }     
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleSubmitUser = async () => {
    try {
      await addDoc(usersCollectionRef, {
        name: nameInput,
        gmail: gmailInput,
      });
      fetchUserList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
    fetchUserList();
  };

  return (
    <div className="container">
      <div className="input-group">
        <input 
          placeholder='Name'
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <input 
          placeholder='Gmail'
          value={gmailInput}
          onChange={(e) => setGmailInput(e.target.value)}
        />
        <button onClick={handleSubmitUser}>Submit user</button>
      </div>
      <div>
        {userList.map((user) => (
          <div key={user.id} className="user-card">
            <p>Name: {user.name}</p>
            <p>Gmail: {user.gmail}</p>
            <button className='btn' onClick={() => handleDeleteUser(user.id)}> Delete User </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
