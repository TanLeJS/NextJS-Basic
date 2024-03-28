import { Button } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from "react";
// import "../../style/user.css";
import { PlusOutlined } from '@ant-design/icons';
import CreateUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';


export interface IUsers {
    _id: string
    email: string
    name: string
    role: string
    address: string
    gender: string
    age: string
    password: string
}

const UserTable = () => {
    const [listUsers, setListUsers] = useState([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null);
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjVmY2UwNzg3OTNmYmVlZWZlZGJmYjliIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MTExMzg5NTksImV4cCI6MTc5NzUzODk1OX0.KADSxuVMuHr66jYjDd5-UjULo9sGJCAjBRGHbqvhiAc"

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {

        const res = await fetch("http://localhost:8000/api/v1/users/all", {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json",
            }
        })
        const d = await res.json()
        setListUsers(d.data.result)
    }

    // console.log("check render", listUsers) // mounting

    const columns: ColumnsType<IUsers> = [
        {
            title: 'Email',
            dataIndex: 'email',
            render: (value, record) => {
                console.log()
                return (
                    <div>{record.email}</div>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Actions',
            render: (value, record) => {
                return (
                    <div>
                        <Button onClick={() => {
                            setDataUpdate(record)
                            setIsUpdateModalOpen(true)
                        }}> Edit </Button>
                    </div>
                )
            }
        }
    ]

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 className='hoidanit'>Table Users</h2>
                <div>
                    <Button
                        icon={<PlusOutlined />}
                        type='primary'
                        onClick={() => setIsCreateModalOpen(true)}
                    >Add new</Button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={listUsers}
                rowKey={"_id"}
            />
            <CreateUserModal
                access_token={access_token}
                getData={getData}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />

            <UpdateUserModal
                access_token={access_token}
                getData={getData}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </div >
    )
}
export default UserTable