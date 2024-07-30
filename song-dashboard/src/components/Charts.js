import React from 'react';
import { Typography, Row, Col } from 'antd';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Histogram } from '@ant-design/charts';

const { Title } = Typography;

function SongCharts({ songs }) {
  const scatterData = songs.map((song, index) => ({
    x: index + 1,  // Song index
    y: song.danceability,
    name: song.title
  }));

  const durationData = songs.map(song => ({
    duration: song.duration_ms / 1000  // Convert to seconds
  }));

  const acousticsData = songs.map(song => ({
    name: song.title,
    acousticness: song.acousticness
  }));

  const tempoData = songs.map(song => ({
    name: song.title,
    tempo: song.tempo
  }));

  return (
    <>
      <Title level={3}>Song Analytics</Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Title level={4}>Danceability Scatter Plot</Title>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Song Index" />
              <YAxis type="number" dataKey="y" name="Danceability" domain={[0, 1]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Danceability" data={scatterData} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </Col>
        <Col span={12}>
          <Title level={4}>Song Duration Histogram</Title>
          <Histogram
            data={durationData}
            binField="duration"
            binNumber={20}
            height={300}
            xAxis={{
              title: { text: 'Duration (seconds)' }
            }}
            yAxis={{
              title: { text: 'Count' }
            }}
          />
        </Col>
        <Col span={12}>
          <Title level={4}>Acousticness Bar Chart</Title>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={acousticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="acousticness" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
        <Col span={12}>
          <Title level={4}>Tempo Bar Chart</Title>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tempoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tempo" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </>
  );
}

export default SongCharts;