import { useState, useReducer, useRef, useEffect } from "react";

import "./App.css";

function App() {
  const [dataApi, setDataApi] = useState([]);

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const url =
      "https://67da372235c87309f52b72d9.mockapi.io/testapi/v1/newResource";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDataApi(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [name, setName] = useState("");

  const valueInput = useRef();

  function handleClick() {
    setName(valueInput.current.value);
  }

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function reducer(state, action) {
    switch (action.type) {
      case "+":
        return { count: state.count + 1 };
      case "-":
        return { count: state.count - 1 };
      default:
        return state;
    }
  }

  function handleAdd() {
    dispatch({ type: "+" });
  }

  function handleSub() {
    dispatch({ type: "-" });
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

  function handleAddInfo() {
    const url = "https://67da372235c87309f52b72d9.mockapi.io/testapi/v1/newResource";
  
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: ten, email: email, age: tuoi }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDataApi([...dataApi, data]);
  
        // Reset input sau khi thêm mới
        setTen("");
        setEmail("");
        setTuoi("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  

  function handleEdit() {
    if (!editId) return; 

    const url = `https://67da372235c87309f52b72d9.mockapi.io/testapi/v1/newResource/${editId}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: ten,
        email: email,
        age: tuoi,
      }),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        setDataApi(
          dataApi.map((item) => (item.id === editId ? updatedData : item))
        );
        setEditId(null); // Reset sau khi cập nhật
        setTen("");
        setEmail("");
        setTuoi("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleEditClick(item) {
    setTen(item.name);
    setEmail(item.email);
    setTuoi(item.age);
    setEditId(item.id); // Lưu ID để biết cần sửa item nào
  }

  function handleDelete(item) {
    const url = `https://67da372235c87309f52b72d9.mockapi.io/testapi/v1/newResource/${item.id}`;

    fetch(url, {
      method: "DELETE",
    })
      .then(() => {
        const newData = dataApi.filter((data) => data.id !== item.id);
        setDataApi(newData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <tr>
        <td>
          <input type="text" value={ten} onChange={handleTen} placeholder="Họ và Tên" />
        </td>
      </tr>
      <tr>
        <td>
          <input type="text" value={email} onChange={handleEmail} placeholder="Email" />
        </td>
      </tr>
      <tr>
        <td>
          <input type="text" value={tuoi} onChange={handleTuoi} placeholder="Tuổi  " />
        </td>
      </tr>
      <br />

      
      <br />
      <button onClick={editId ? handleEdit : handleAddInfo}>
        {editId ? "Cập nhật" : "Thêm"}
      </button>

      {dataApi.length > 0 ? (
        <table style={{ border: 1 }}>
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
                  <button onClick={() => handleEditClick(item)}>Edit</button>
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

      <button onClick={handleAdd} style={{ backgroundColor: "red" }}>
        Tăng
      </button>
      <button onClick={handleSub} style={{ backgroundColor: "blue" }}>
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
