import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Paper } from '@mui/material';
import DepartmentList from './DepartmentList';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const columns = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 400 },
  ];

  return (
    <Container>
      <Paper style={{ padding: '16px', marginTop: '16px', border: '1px solid #ccc' }}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={data} columns={columns} />
        </div>
      </Paper>
      <Paper style={{ padding: '16px', marginTop: '16px', border: '1px solid #ccc' }}>
        <DepartmentList />
      </Paper>
    </Container>
  );
};

export default SecondPage;
