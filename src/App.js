import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import logo from './assets/logo.svg';
import './App.scss';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Address',
        dataIndex: ['address', 'city'],
    },
    {
        title: 'Lat',
        dataIndex: ['address', 'geo', 'lat'],
    },
    {
        title: 'Email',
        dataIndex: 'email',
        render: (value) => (
            <input
                defaultValue={value}
                onChange={(e) => console.log(e.target.value)}
            />
        ),
    },
];

const limit = 3;

function App({ url = '' }) {
    console.log('url::: ', url);
    const [start, setStart] = useState(0);
    const [users, setUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [start]);

    const fetchUsers = async () => {
        const res = await axios.get(`${url}?_start=${start}&_limit=${limit}`);
        setUsers(res.data);
    };

    console.log('users: ', users);

    const handleChange = (pagination, filters, sorter, extra) => {
        const { action, currentDataSource } = extra;
        const { current } = pagination;
        console.log('pagination: ', pagination);
        console.log('filters: ', filters);
        console.log('sorter: ', sorter);
        console.log('action: ', action);
        if (action === 'paginate') {
            setStart((current - 1) * limit);
        }
    };

    const onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div className="App">
            <img className="App-logo" src={logo} />
            <Table
                rowSelection={rowSelection}
                rowKey="id"
                columns={columns}
                dataSource={users}
                onChange={handleChange}
                pagination={{
                    defaultPageSize: 3,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                    total: 10,
                }}
            />
        </div>
    );
}

export default App;
