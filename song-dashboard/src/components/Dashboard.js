import React, { useState, useEffect } from 'react';
import { Layout, Typography, Space } from 'antd';
import SongTable from './SongTable';
import SongSearch from './SongSearch';
import SongCharts from './Charts';
import { fetchSongs } from '../services/api';

const { Content } = Layout;
const { Title } = Typography;

function Dashboard() {
  const [songs, setSongs] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      setLoading(true);
      const response = await fetchSongs();
      if (response.success) {
        setSongs(response.data);
        setColumns(response.columns);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch songs');
    } finally {
      setLoading(false);
    }
  };

  const handleSongUpdate = (songId, newRating) => {
    setSongs(prevSongs =>
      prevSongs.map(song =>
        song.id === songId ? { ...song, star_rating: newRating } : song
      )
    );
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography.Text type="danger">{error}</Typography.Text>;

  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          <Title level={2}>Song Dashboard</Title>
          <SongSearch columns={columns} onSearch={setSongs} />
          <SongTable songs={songs} columns={columns} onSongUpdate={handleSongUpdate} />
          <SongCharts songs={songs} />
        </Space>
      </Content>
    </Layout>
  );
}

export default Dashboard;