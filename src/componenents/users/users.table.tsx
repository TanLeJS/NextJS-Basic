import { Button, Input, Modal, notification } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from "react";
// import "../../style/user.css";
import { PlusOutlined } from '@ant-design/icons';


interface IUsers {
    _id: string
    email: string
    name: string
    role: string
}

const UserTable = () => {
    const [listUsers, setListUsers] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [address, setAddress] = useState("")
    const [role, setRole] = useState("")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
        }
    ]

    const handleCloseCreateModal = () => {
        setName("")
        setEmail("")
        setAge("")
        setAddress("")
        setGender("")
        setRole("")
        setIsCreateModalOpen(false)
    }

    const handleOk = async () => {
        const data = { name, email, password, age, gender, address, role }
        console.log(data)
        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data })

        })
        const d = await res.json()
        if (d.data) {
            //success
            getData()
            notification.success({
                message: "Tạo mới user thành công",
            })
            handleCloseCreateModal()
        }
        else {
            //fail
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(d.message),
            })

        }

    };


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
            <Modal
                title="Add New User"
                open={isCreateModalOpen}
                onOk={handleOk}
                onCancel={() => handleCloseCreateModal()}
                maskClosable={false}>
                <div>
                    <label>Name:</label>
                    <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <Input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <Input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <Input
                        value={age}
                        onChange={(event) => setAge(event.target.value)} />
                </div>
                <div>
                    <label>Gender:</label>
                    <Input
                        value={gender}
                        onChange={(event) => setGender(event.target.value)} />
                </div>
                <div>
                    <label>Address:</label>
                    <Input
                        value={address}
                        onChange={(event) => setAddress(event.target.value)} />
                </div>
                <div>
                    <label>Role:</label>
                    <Input
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                    />
                </div>

            </Modal>
        </div >
    )
}
export default UserTable