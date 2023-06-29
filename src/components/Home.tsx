import React, { useState } from 'react';
import { Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

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
    const itemToEdit: Item | undefined = data.find((item) => item.id === id);
    setEditItem(itemToEdit || null);
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
      <Typography variant="h4" sx={{ marginBottom: '10px' }}>TO</Typography>

      <TextField
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter a new item"
        style={{ marginBottom: '10px', width: '20%' }}
      />
      {editItem ? (
        <Button variant="contained" style={{ marginRight: '10px' }} onClick={handleUpdate}>Update</Button>
      ) : (
        <Button variant="contained" style={{ marginRight: '10px' }} onClick={handleAdd}>Add</Button>
      )}
      <List style={{ padding: 0 }}>
        {data.map((item) => (
          <ListItem key={item.id} style={{ marginBottom: '10px' }}>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item.id)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Home;

