import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { IUsers } from "./users.table";

interface IProps {
    access_token: string
    getData: any;
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void
    dataUpdate: null | IUsers;
    setDataUpdate: any
}

const UpdateUserModal = (props: IProps) => {
    const { access_token, getData,
        isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props
    console.log("check data update", dataUpdate)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [address, setAddress] = useState("")
    const [role, setRole] = useState("")

    useEffect(() => {
        if (dataUpdate) {
            setName(dataUpdate.name)
            setEmail(dataUpdate.email)
            setPassword(dataUpdate.password)
            setAge(dataUpdate.age)
            setAddress(dataUpdate.address)
            setGender(dataUpdate.gender)
            setRole(dataUpdate.role)
        }
    }, [dataUpdate])

    const handleCloseCreateModal = () => {
        setDataUpdate(null)
        setName("")
        setEmail("")
        setAge("")
        setAddress("")
        setGender("")
        setRole("")
        setIsUpdateModalOpen(false)

    }

    const handleOk = async () => {
        const data = {
            _id: dataUpdate?._id,
            name, email, age, gender, address, role
        }
        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)

        })
        const d = await res.json()
        if (d.data) {
            //success
            getData()
            notification.success({
                message: "Update user thành công",
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
        <Modal
            title="Update a User"
            open={isUpdateModalOpen}
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
                    disabled={true}
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
    )
}

export default UpdateUserModal