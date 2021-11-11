import React, { useState, useEffect } from 'react';
import fetchData from './api';
import Counter from './components/Counter';
import User from './components/User'
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [nextPageNumber, setNextPageNumber] = useState(1)
  const [userInfos, setUserInfos] = useState([]);
  // const [randomUserDataJSON, setRandomUserDataJSON] = useState();

  const fetchNextUser = () => {
    fetchData(nextPageNumber).then(response => {
      // setRandomUserDataJSON(JSON.stringify(response));
      if (response.data === undefined) return;
      const newUserInfos = [
        ...userInfos,
        ...response.data.results
      ]
      setUserInfos(newUserInfos);
      setNextPageNumber(response.data.info.page + 1);
    });
  }

  useEffect(() => {
    fetchNextUser()
  }, []);

  const userData = userInfos.map((user, index) => {
    return <User key={index} userFirstName={user.name.first} userLastName={user.name.last} userPicture={user.picture.thumbnail} />
  })

  return (
    <div className="App">
      <main>
        <h1>Beginner React.js Coding Interview</h1>
        <h2>Start editing to see some magic happen!</h2>
        <Counter count={count} setCount={setCount} />
        <br />
        <h2>Fetching an API data</h2>
        <button onClick={() => { fetchData() }}>Fetch Data</button>
        {userData}
        {/* <pre style={{ textAlign: "left" }}>
          {randomUserDataJSON}
        </pre> */}
        <br />
        <button onClick={() => { fetchNextUser() }}>Fetch Next User</button>
      </main>
    </div>
  );
}

export default App;