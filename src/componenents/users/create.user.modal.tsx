import { Form, Input, InputNumber, Modal, notification, Select } from "antd";

interface IProps {
    access_token: string
    getData: any;
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void
}

const { Option } = Select;

const CreateUserModal = (props: IProps) => {
    const [form] = Form.useForm();

    const { access_token, getData,
        isCreateModalOpen, setIsCreateModalOpen } = props

    const handleCloseCreateModal = () => {
        form.resetFields()
    }


    const onFinish = async (values: any) => {
        const { name, email, password, age, gender, address, role } = values
        const data = { name, email, password, age, gender, address, role }
        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: "POST",
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
        <Modal
            title="Add New User"
            open={isCreateModalOpen}
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
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
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

export default CreateUserModal