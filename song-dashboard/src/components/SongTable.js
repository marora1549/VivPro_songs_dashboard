import React, { useState } from 'react';
import { Table, Rate, Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { updateSongRating } from '../services/api';

function SongTable({ songs, columns, onSongUpdate }) {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  if (songs.length === 0) {
    return <p>No songs found.</p>;
  }

  const handleRatingChange = async (songId, newRating) => {
    try {
      await updateSongRating(songId, newRating);
      onSongUpdate(songId, newRating);
      message.success(`Song rating updated to ${newRating} stars!`, 2);
    } catch (error) {
      console.error('Failed to update song rating:', error);
      message.error('Failed to update song rating. Please try again.', 2);
    }
  };

  const enhancedColumns = [
    {
      title: 'Index',
      key: 'index',
      fixed: 'left',
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      width: 200,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    ...columns
      .filter(column => column !== 'id' && column !== 'title')
      .map(column => ({
        title: column.charAt(0).toUpperCase() + column.slice(1),
        dataIndex: column,
        key: column,
        sorter: (a, b) => {
          if (typeof a[column] === 'string') {
            return a[column].localeCompare(b[column]);
          }
          return a[column] - b[column];
        },
      })),
      {
      title: 'Rating',
      key: 'rating',
      fixed: 'right',
      width: 200,
      render: (text, record) => (
        <Rate
          value={record.star_rating}
          onChange={(newRating) => handleRatingChange(record.id, newRating)}
        />
      ),
    }
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  return (
    <>
    <Button
        icon={<DownloadOutlined />}
        onClick={() => Table.exportToCSV({
          data: songs,
          columns: enhancedColumns,
          fileName: 'songs_data.csv',
        })}
        style={{ marginBottom: 15 }}
      >
        Export CSV
      </Button>
      <Table
        dataSource={songs}
        columns={enhancedColumns}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
        exportable={{
          fileName: 'songs_data',
          showableColumns: enhancedColumns.map(col => col.key),
        }}
      />

    </>
  );
}

export default SongTable;