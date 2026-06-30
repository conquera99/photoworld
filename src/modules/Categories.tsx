'use client';

import { useEffect, useState } from 'react';
import {
    Drawer,
    List,
    Button,
    Skeleton,
    Form,
    Input,
    Switch,
    Row,
    Col,
    notification,
    Tag,
} from 'antd';
import { listCategories, saveCategories, removeCategories } from 'services/CategoriesAPI';
import type { Category } from 'types';

export default function Categories() {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [show] = useState(8);
    const [categories, setCategories] = useState<Category[]>([]);
    const [id, setId] = useState<string | null>(null);

    const loadCategories = () => {
        listCategories('', page, show).then((response) => {
            setCategories(response.result);
            setLoading(false);
            setTotal(response.total);
            setVisible(false);
        });
    };

    useEffect(() => {
        loadCategories();
    }, [page]);

    const showDrawer = () => {
        form.setFieldsValue({ category_name: '', category_status: false });
        setVisible(true);
    };

    const edit = (data: Category) => {
        setId(data.category_name);
        setVisible(true);
        const statusBool =
            data.category_status === true || parseInt(String(data.category_status)) === 1;
        setTimeout(() => {
            form.setFieldsValue({ ...data, category_status: statusBool });
        }, 100);
    };

    const save = (values: Record<string, unknown>) => {
        values.id = id;
        saveCategories(values).then((response) => {
            notification.success({
                message: 'Success',
                description: response.message,
            });
            loadCategories();
        });
    };

    const remove = ({ category_name }: { category_name: string }) => {
        removeCategories(category_name).then((response) => {
            notification.success({
                message: 'Success',
                description: response.message,
            });
            loadCategories();
        });
    };

    return (
        <div>
            <Row>
                <Col span={12} style={{ marginBottom: 10 }}>
                    <h2>Categories</h2>
                </Col>
                <Col span={12}>
                    <Button type="primary" className="float-right" onClick={showDrawer}>
                        Add
                    </Button>
                </Col>
            </Row>
            <div>
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={categories}
                    pagination={{
                        onChange: (p) => setPage(p),
                        total: total,
                        pageSize: show,
                    }}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <a key="list-edit" onClick={() => edit(item)}>
                                    edit
                                </a>,
                                <a
                                    key="list-more"
                                    className="remove-btn"
                                    onClick={() => remove(item)}
                                >
                                    remove
                                </a>,
                            ]}
                        >
                            <Skeleton title={false} loading={loading} active>
                                <div>
                                    {(parseInt(String(item.category_status)) === 0 ||
                                        item.category_status === false) && (
                                        <Tag color="error">Nonactive</Tag>
                                    )}
                                    {(parseInt(String(item.category_status)) === 1 ||
                                        item.category_status === true) && (
                                        <Tag color="success">Active</Tag>
                                    )}
                                    &nbsp;
                                    {item.category_name}
                                </div>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>

            <Drawer
                title="Categories"
                placement="right"
                onClose={() => setVisible(false)}
                open={visible}
                size="40%"
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="categories"
                    onFinish={save}
                    initialValues={{ category_name: '', category_status: false }}
                >
                    <Form.Item
                        label="Name"
                        name="category_name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input size="large" placeholder="Name" />
                    </Form.Item>

                    <Form.Item label="Status" name="category_status" valuePropName="checked">
                        <Switch checkedChildren="1" unCheckedChildren="0" defaultChecked />
                    </Form.Item>

                    <Form.Item>
                        <Button block size="large" type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
}
