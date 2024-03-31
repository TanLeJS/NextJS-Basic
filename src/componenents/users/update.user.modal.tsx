import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect } from "react";
import { IUsers } from "./users.table";

const { Option } = Select;

interface IProps {
    access_token: string
    getData: any;
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void
    dataUpdate: null | IUsers;
    setDataUpdate: any
}

const UpdateUserModal = (props: IProps) => {

    const [form] = Form.useForm();
    const { access_token, getData,
        isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                email: dataUpdate.email,
                age: dataUpdate.age,
                address: dataUpdate.address,
                role: dataUpdate.role,
                gender: dataUpdate.gender
            })
        }
    }, [dataUpdate])

    const handleCloseCreateModal = () => {
        form.resetFields()
        setIsUpdateModalOpen(false)
        setDataUpdate(null)

    }
    const onFinish = async (values: any) => {
        const { name, email, age, gender, address, role } = values

        if (dataUpdate) {
            const data = {
                _id: dataUpdate._id,
                name, email, address, gender, role, age
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
        }
    };


    return (
        <Modal
            title="Update a User"
            open={isUpdateModalOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseCreateModal()}
            maskClosable={false}>

            <Form
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Password"
                    name="password"
                    rules={[{ required: dataUpdate ? false : true, message: 'Please input your password!' }]}
                >
                    <Input.Password disabled={dataUpdate ? true : false} />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Age"
                    name="age"
                    rules={[{ required: true, message: 'Please input your age!' }]}
                >
                    <InputNumber
                        style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="gender" label="Gender" style={{ marginBottom: 5 }} rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="MALE">Male</Option>
                        <Option value="FEMALE">Female</Option>
                        <Option value="OTHER">Other</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="role" label="Role" style={{ marginBottom: 5 }} rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onRoleChange}
                        allowClear
                    >
                        <Option value="USER">User</Option>
                        <Option value="ADMIN">Admin</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateUserModal