import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';
import { searchSongsByTitle } from '../services/api';

function SongSearch({ onSearch }) {
  const [title, setTitle] = useState('');

  const handleSearch = async () => {
    try {
      const response = await searchSongsByTitle(title);
      if (response.success) {
        onSearch(response.data);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error('Failed to search songs', error);
    }
  };

  return (
    <Space style={{ marginBottom: 16 }}>
      <Input
        placeholder="Enter song title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onPressEnter={handleSearch}
      />
      <Button type="primary" onClick={handleSearch}>
        Get Song
      </Button>
    </Space>
  );
}

export default SongSearch;