import { useState, useReducer, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [dataApi, setDataApi] = useState([]);

  useEffect(() => {
    const url = 'https://67da372235c87309f52b72d9.mockapi.io/testapi/v1/newResource';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDataApi(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const [name, setName] = useState('');

  const valueInput = useRef();

  function handleClick() {
    setName(valueInput.current.value);
  }

  
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function reducer(state, action) {
    switch (action.type) {
      case '+':
        return { count: state.count + 1 };
      case '-':
        return { count: state.count - 1 };
      default:
        return state;
    }
  }

  function handleAdd() {
    dispatch({ type: '+' });
  }

  function handleSub() {
    dispatch({ type: '-' });
  }

  const [ten, setTen] = useState(0);
  const [email, setEmail] = useState(0);
  const [tuoi, setTuoi] = useState(0);

  function handleTen(e) {
    setTen(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleTuoi(e) {
    setTuoi(e.target.value);
  }

  function handleAdd() {
    const url = 'https://67da372235c87309f52b72d9.mockapi.io/testapi/v1/newResource';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: ten,
        email: email,
        age: tuoi,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDataApi([...dataApi, data]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function handleEdit() {
    const url = 'https://67da372235c87309f52b72d9.mockapi.io/testapi/v1/newResource';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: ten,
        email: email,
        age: tuoi,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDataApi([...dataApi, data]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function handleDelete (item) {
    const url = `https://67da372235c87309f52b72d9.mockapi.io/testapi/v1/newResource/${item.id}`;

    fetch(url, {
      method: 'DELETE',
    })
      .then(() => {
        const newData = dataApi.filter((data) => data.id !== item.id);
        setDataApi(newData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
 
  
  return (
    <>
      <tr>
        <td><input type="text" onChange={handleTen} placeholder='Họ và Tên'/></td>
      </tr>
      <tr>
        <td><input type="text" onChange={handleEmail} placeholder='Email' /></td>
      </tr>
      <tr>
        <td><input type="text" onChange={handleTuoi} placeholder='Tuổi  '/></td>
      </tr>
      <br />

      <button onClick={handleAdd}>Add</button><br /><br />
      
      {dataApi.length > 0 ? (
        <table style={{border : 1}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataApi.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không có dữ liệu hoặc đã xảy ra lỗi khi lấy dữ liệu</p>
      )}
      <br />

      
      <button onClick={handleAdd} style={{ backgroundColor: 'red' }}>
        Tăng
      </button>
      <button onClick={handleSub} style={{ backgroundColor: 'blue' }}>
        Giảm
      </button>
      <br />
      <span>{state.count}</span>
      <br />

      
      <input ref={valueInput} type="text" placeholder="Nhập tên" />
      <br />
      <button onClick={handleClick}>In</button>
      <br />
      <span>{name}</span>
      <br />
    </>
  );
}

export default App;
