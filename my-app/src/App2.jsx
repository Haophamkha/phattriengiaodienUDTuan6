import { useState, useReducer, useRef, useEffect, useCallback, useMemo, memo } from "react";

function App() {
  const [dataApi, setDataApi] = useState([]);
  const [editId, setEditId] = useState(null);
  const [ten, setTen] = useState("");
  const [email, setEmail] = useState("");
  const [tuoi, setTuoi] = useState("");
  const valueInput = useRef();
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  useEffect(() => {
    fetch("https://67da372235c87309f52b72d9.mockapi.io/testapi/v1/newResource")
      .then((res) => res.json())
      .then((data) => setDataApi(data))
      .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
  }, []);

  function reducer(state, action) {
    switch (action.type) {
      case "INCREMENT":
        return { count: state.count + 1 };
      case "DECREMENT":
        return { count: state.count - 1 };
      default:
        return state;
    }
  }

  const handleAddInfo = useCallback(() => {
    const url = "https://67da372235c87309f52b72d9.mockapi.io/testapi/v1/newResource";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: ten, email, age: tuoi }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDataApi((prev) => [...prev, data]);
        setTen("");
        setEmail("");
        setTuoi("");
      })
      .catch((error) => console.error("Lỗi:", error));
  }, [ten, email, tuoi]);

  const handleEdit = useCallback(() => {
    if (!editId) return;
    const url = `https://67da372235c87309f52b72d9.mockapi.io/testapi/v1/newResource/${editId}`;

    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: ten, email, age: tuoi }),
    })
      .then((res) => res.json())
      .then((updatedData) => {
        setDataApi((prev) => prev.map((item) => (item.id === editId ? updatedData : item)));
        setEditId(null);
        setTen("");
        setEmail("");
        setTuoi("");
      })
      .catch((error) => console.error("Lỗi:", error));
  }, [editId, ten, email, tuoi]);

  const handleEditClick = useCallback((item) => {
    setTen(item.name);
    setEmail(item.email);
    setTuoi(item.age);
    setEditId(item.id);
  }, []);

  const handleDelete = useCallback((item) => {
    fetch(`https://67da372235c87309f52b72d9.mockapi.io/testapi/v1/newResource/${item.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setDataApi((prev) => prev.filter((data) => data.id !== item.id));
      })
      .catch((error) => console.error("Lỗi:", error));
  }, []);

  const memoizedData = useMemo(() => dataApi, [dataApi]);

  function handleClick() {
    alert(`Giá trị nhập: ${valueInput.current.value}`);
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Quản lý Người Dùng</h1>

      <div className="flex flex-col space-y-2">
        <input
          type="text"
          value={ten}
          onChange={(e) => setTen(e.target.value)}
          placeholder="Họ và Tên"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          value={tuoi}
          onChange={(e) => setTuoi(e.target.value)}
          placeholder="Tuổi"
          className="p-2 border rounded-lg"
        />
        <button
          onClick={editId ? handleEdit : handleAddInfo}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          {editId ? "Cập nhật" : "Thêm"}
        </button>
      </div>

      <DataTable data={memoizedData} onEdit={handleEditClick} onDelete={handleDelete} />

      <div className="mt-4 space-x-2">
        <button onClick={() => dispatch({ type: "INCREMENT" })} className="bg-red-500 text-white p-2 rounded-lg">
          Tăng
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT" })} className="bg-blue-500 text-white p-2 rounded-lg">
          Giảm
        </button>
      </div>
      <span className="block text-lg font-bold mt-2">{state.count}</span>

      <div className="mt-4">
        <input ref={valueInput} type="text" placeholder="Nhập tên" className="p-2 border rounded-lg" />
        <button onClick={handleClick} className="bg-green-500 text-white p-2 rounded-lg ml-2">
          In
        </button>
      </div>
    </div>
  );
}

const DataTable = memo(({ data, onEdit, onDelete }) => {
  return data.length > 0 ? (
    <table className="w-full border mt-4">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Age</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b">
            <td className="p-2">{item.name}</td>
            <td className="p-2">{item.email}</td>
            <td className="p-2">{item.age}</td>
            <td className="p-2 space-x-2">
              <button onClick={() => onEdit(item)} className="bg-yellow-500 p-1 rounded-lg">
                Edit
              </button>
              <button onClick={() => onDelete(item)} className="bg-red-500 text-white p-1 rounded-lg">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-center mt-4">Không có dữ liệu</p>
  );
});

export default App;

