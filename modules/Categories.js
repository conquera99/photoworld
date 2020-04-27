import { Component } from "react";
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
} from "antd";
import { listCategories, saveCategories, removeCategories } from "../services/CategoriesAPI";

export default class Categories extends Component {
    constructor(props) {
        super(props);

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.onClose = this.onClose.bind(this);
        this.changePage = this.changePage.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.loadCategories = this.loadCategories.bind(this);

        this.state = {
            id: "",
            visible: false,
            loading: true,
            keywords: "",
            page: 1,
            total: 1,
            show: 8,
            categories: [
                {
                    category_name: "1",
                },
                {
                    category_name: "2",
                },
            ],
            formValues: {
                category_name: "",
                category_status: false,
            },
        };
    }

    componentDidMount() {
        this.loadCategories();

        console.log(this.form);
    }

    showDrawer() {
        if (this.form) {
            this.form.setFieldsValue({
                category_name: "",
                category_status: false,
            });
        }

        this.setState({
            visible: true,
        });
    }

    onClose() {
        this.setState({
            visible: false,
        });
    }

    edit(data) {
        this.setState(
            {
                visible: true,
                id: data.category_name,
            },
            () => {
                data.category_status = data.category_status === true || parseInt(data.category_status) === 1;
                console.log(data);
                if (this.form) {
                    this.form.setFieldsValue(data);
                } else {
                    setTimeout(() => {
                        this.form.setFieldsValue(data);
                    }, 500);
                }
            }
        );
    }

    save(values) {
        const { id } = this.state;

        values.id = id;

        console.log(values);

        saveCategories(values).then((response) => {
            notification.success({
                message: "Success",
                description: response.error_message,
            });
            this.loadCategories();
            this.onClose();
        });
    }

    remove({ category_name }) {
        removeCategories(category_name).then((response) => {
            notification.success({
                message: "Success",
                description: response.error_message,
            });
            this.loadCategories();
        });
    }

    changePage(page) {
        this.setState(
            {
                page: page,
            },
            () => this.loadCategories()
        );
    }

    loadCategories() {
        const { keywords, page, show } = this.state;

        listCategories(keywords, page, show).then((response) => {
            this.setState({
                categories: response.result,
                loading: false,
                total: response.total,
                visible: false,
            });
        });
    }

    render() {
        const { visible, loading, categories, formValues, show, total } = this.state;

        return (
            <div>
                <Row>
                    <Col span={12} style={{ marginBottom: 10 }}>
                        <h2>Categories</h2>
                    </Col>
                    <Col span={12}>
                        <Button type="primary" className="float-right" onClick={this.showDrawer}>
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
                            onChange: this.changePage,
                            total: total,
                            pageSize: show,
                        }}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <a key="list-edit" onClick={() => this.edit(item)}>
                                        edit
                                    </a>,
                                    <a
                                        key="list-more"
                                        className="remove-btn"
                                        onClick={() => this.remove(item)}
                                    >
                                        remove
                                    </a>,
                                ]}
                            >
                                <Skeleton title={false} loading={loading} active>
                                    <div>
                                        {(parseInt(item.category_status) === 0 || item.category_status === false) && <Tag color="error">Nonactive</Tag>}
                                        {(parseInt(item.category_status) === 1 || item.category_status === true) && <Tag color="success">Active</Tag>}
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
                    onClose={this.onClose}
                    visible={visible}
                    width="40%"
                >
                    <Form
                        ref={ref => this.form = ref}
                        layout="vertical"
                        name="auth"
                        onFinish={this.save}
                        initialValues={formValues}
                    >
                        <Form.Item
                            label="Name"
                            name="category_name"
                            rules={[{ required: true, message: "Please input name!" }]}
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
}
