import React, { useState } from 'react';

interface Item {
  id: number;
  name: string;
}

const Home = () => {
  const [data, setData] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState<Item | null>(null);

  const handleAdd = () => {
    const newItemData: Item = {
      id: Date.now(),
      name: newItem,
    };
    setData([...data, newItemData]);
    setNewItem('');
  };

  const handleEdit = (id: number) => {
    const itemToEdit:any = data.find((item) => item.id === id);
    setEditItem(itemToEdit);
    setNewItem(itemToEdit?.name || '');
  };

  const handleUpdate = () => {
    const updatedData = data.map((item) =>
      item.id === editItem?.id ? { ...item, name: newItem } : item
    );
    setData(updatedData);
    setNewItem('');
    setEditItem(null);
  };

  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>Home</h2>

      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter a new item"
        style={{ marginBottom: '10px', padding: '5px', width: '20%' }}
      />
      {editItem ? (
        <button style={{ marginRight: '10px' }} onClick={handleUpdate}>
          Update
        </button>
      ) : (
        <button style={{ marginRight: '10px' }} onClick={handleAdd}>
          Add
        </button>
      )}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {data.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            {item.name}
            <button style={{ marginLeft: '15px' }} onClick={() => handleEdit(item.id)}>
              Edit
            </button>
            <button style={{ marginLeft: '15px' }} onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
