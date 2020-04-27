import { Component } from "react";
import {
    Drawer,
    List,
    Button,
    Skeleton,
    Form,
    Input,
    Switch,
    Modal,
    Row,
    Col,
    Select,
    Upload,
    notification,
    Tag,
} from "antd";
import { activeCategories } from "../services/CategoriesAPI";
import { UploadOutlined } from "@ant-design/icons";
import { listPictures, savePictures, removePictures } from "../services/PicturesAPI";
import Image from '../components/Image';

const { Option } = Select;

export default class Pictures extends Component {
    constructor(props) {
        super(props);

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.onClose = this.onClose.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.changePage = this.changePage.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.loadPictures = this.loadPictures.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.loadCategories = this.loadCategories.bind(this);

        this.state = {
            id: "",
            visible: false,
            loading: true,
            loadingSave: false,
            keywords: "",
            page: 1,
            total: 1,
            show: 8,
            pictures: [
                {
                    pic_title: "1",
                },
                {
                    pic_title: "2",
                },
                {
                    pic_title: "2",
                },
            ],
            categories: [],
            fileList: [],
            previewVisible: false,
            previewImage: "",
            previewTitle: "",
            formValues: {
                pic_title: "",
                pic_status: false,
                pic_category_name: undefined,
                pic_desc: "",
                pic_image: undefined,
            },
            oldImage: null,
            oldImageExt: null,
        };
    }

    componentDidMount() {
        this.loadCategories();
        this.loadPictures();
    }

    showDrawer() {
        if (this.form) {
            this.form.setFieldsValue({
                pic_title: "",
                pic_status: false,
                pic_category_name: undefined,
                pic_desc: "",
                pic_image: undefined,
            });
        }

        this.setState({
            visible: true,
            id: null,
            fileList: [],
            oldImage: null,
            oldImageExt: null,
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
                id: data.pic_id,
                fileList: [],
                oldImage: data.pic_image,
                oldImageExt: data.pic_ext,
            },
            () => {

                const newData = Object.assign({}, data);

                newData.pic_image = undefined;
                newData.pic_status = newData.pic_status === true || parseInt(newData.pic_status) === 1;

                if (this.form) {
                    this.form.setFieldsValue(newData);
                } else {
                    setTimeout(() => {
                        this.form.setFieldsValue(newData);
                    }, 500);
                }
            }
        );
    }

    save(values) {
        const { id } = this.state;

        values.id = id;
        if (values.pic_image[0]) {
            values.pic_image = values.pic_image[0].originFileObj;
        }

        this.setState(
            {
                loadingSave: true,
            },
            () => {
                savePictures(values)
                    .then((response) => {
                        notification.success({
                            message: "Success",
                            description: response.error_message,
                        });
                        this.loadPictures();
                        this.onClose();
                    })
                    .finally(() => {
                        this.setState({
                            loadingSave: false,
                        });
                    });
            }
        );
    }

    remove({ pic_id }) {
        removePictures(pic_id).then((response) => {
            notification.success({
                message: "Success",
                description: response.error_message,
            });
            this.loadPictures();
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

    loadPictures() {
        const { keywords, page, show } = this.state;

        listPictures(keywords, page, show).then((response) => {
            this.setState({
                pictures: response.result,
                loading: false,
            });
        });
    }

    loadCategories() {
        activeCategories().then((response) => {
            this.setState({
                categories: response.data,
            });
        });
    }

    uploadFile(e) {
        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    }

    handleUpload({ fileList }) {
        this.setState({ fileList });
    }

    async handlePreview(file) {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
        });
    }

    closeModal() {
        this.setState({
            previewVisible: false,
        });
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    render() {
        const {
            visible,
            loading,
            categories,
            pictures,
            formValues,
            show,
            total,
            previewVisible,
            previewImage,
            previewTitle,
            loadingSave,
            oldImage,
            oldImageExt,
            fileList,
        } = this.state;

        return (
            <div>
                <Row>
                    <Col span={12} style={{ marginBottom: 10 }}>
                        <h2>Pictures</h2>
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
                        dataSource={pictures}
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
                                        {(parseInt(item.pic_status) === 0 ||
                                            item.pic_status === false) && (
                                            <Tag color="error">Nonactive</Tag>
                                        )}
                                        {(parseInt(item.pic_status) === 1 ||
                                            item.pic_status === true) && (
                                            <Tag color="success">Active</Tag>
                                        )}
                                        <h3 style={{ marginTop: 10 }}>{item.pic_title}</h3>
                                        <h6>{item.pic_desc}</h6>
                                    </div>
                                    <div>
                                        <Image
                                            height={100}
                                            alt={item.pic_title}
                                            src={item.pic_image}
                                            ext={item.pic_ext}
                                            isThumb
                                        />
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
                        ref={(ref) => (this.form = ref)}
                        layout="vertical"
                        name="auth"
                        onFinish={this.save}
                        initialValues={formValues}
                    >
                        <Form.Item
                            label="Title"
                            name="pic_title"
                            rules={[{ required: true, message: "Please input title!" }]}
                        >
                            <Input size="large" placeholder="Title" />
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            name="pic_category_name"
                            rules={[{ required: true, message: "Please select category!" }]}
                        >
                            <Select size="large" style={{ width: "100%" }}>
                                {categories.map((item) => {
                                    const name = item.category_name;
                                    return (
                                        <Option key={name} value={name}>
                                            {name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Description" name="pic_desc">
                            <Input.TextArea
                                size="large"
                                placeholder="Picture Description"
                                style={{ minHeight: 200 }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="pic_image"
                            valuePropName="fileList"
                            getValueFromEvent={this.uploadFile}
                        >
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleUpload}
                            >
                                {fileList.length >= 1 ? null : (
                                    <div>
                                        <UploadOutlined style={{ fontSize: 24 }} />
                                        <div className="ant-upload-text">Upload</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>

                        <Form.Item label="Status" name="pic_status" valuePropName="checked">
                            <Switch checkedChildren="1" unCheckedChildren="0" defaultChecked />
                        </Form.Item>

                        {oldImage && (
                            <div>
                                <h4>Preview</h4>
                                <Image
                                    alt="image-preview"
                                    src={oldImage}
                                    ext={oldImageExt}
                                    height={100}
                                />
                            </div>
                        )}

                        <Form.Item>
                            <Button
                                block
                                size="large"
                                type="primary"
                                htmlType="submit"
                                loading={loadingSave}
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                    <Modal
                        visible={previewVisible}
                        bodyStyle={{ padding: 0 }}
                        footer={null}
                        onCancel={this.closeModal}
                    >
                        <h3 style={{ position: "absolute", padding: 12 }}>{previewTitle}</h3>
                        <img alt="example" style={{ width: "100%" }} src={previewImage} />
                    </Modal>
                </Drawer>
            </div>
        );
    }
}
