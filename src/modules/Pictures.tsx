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
    Modal,
    Row,
    Col,
    Select,
    Upload,
    notification,
    Tag,
} from 'antd';
import { UploadOutlined } from 'components/icons';
import Image from 'components/Image';
import { activeCategories } from 'services/CategoriesAPI';
import { listPictures, savePictures, removePictures } from 'services/PicturesAPI';
import type { Picture, Category } from 'types';

const { Option } = Select;

export default function Pictures() {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [show] = useState(5);
    const [pictures, setPictures] = useState<Picture[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [fileList, setFileList] = useState<unknown[]>([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [id, setId] = useState<string | null>(null);
    const [oldImage, setOldImage] = useState<string | null>(null);
    const [oldImageExt, setOldImageExt] = useState<string | null>(null);

    const loadPictures = () => {
        listPictures('', page, show).then((response) => {
            setPictures(response.result);
            setTotal(response.totalFiltered);
            setLoading(false);
        });
    };

    const loadCategories = () => {
        activeCategories().then((response) => {
            setCategories(response.data);
        });
    };

    useEffect(() => {
        loadCategories();
        loadPictures();
    }, [page]);

    const showDrawer = () => {
        form.setFieldsValue({
            pic_title: '',
            pic_status: false,
            pic_category_name: undefined,
            pic_desc: '',
            pic_image: undefined,
        });
        setVisible(true);
        setId(null);
        setFileList([]);
        setOldImage(null);
        setOldImageExt(null);
    };

    const edit = (data: Picture) => {
        setId(data.pic_id);
        setFileList([]);
        setOldImage(data.pic_image);
        setOldImageExt(data.pic_ext);
        setVisible(true);
        const statusBool = data.pic_status === true || parseInt(String(data.pic_status)) === 1;
        setTimeout(() => {
            form.setFieldsValue({ ...data, pic_image: undefined, pic_status: statusBool });
        }, 100);
    };

    const save = (values: Record<string, unknown>) => {
        values.id = id;
        const picImage = values.pic_image as { originFileObj?: File }[];
        if (picImage && picImage[0]) {
            values.pic_image = picImage[0].originFileObj;
        }
        setLoadingSave(true);
        savePictures(values)
            .then((response) => {
                notification.success({
                    message: 'Success',
                    description: response.message,
                });
                loadPictures();
                setVisible(false);
            })
            .finally(() => setLoadingSave(false));
    };

    const remove = ({ pic_id }: { pic_id: string }) => {
        removePictures(pic_id).then((response) => {
            notification.success({
                message: 'Success',
                description: response.message,
            });
            loadPictures();
        });
    };

    const uploadFile = (e: unknown) => {
        if (Array.isArray(e)) return e;
        return e && (e as { fileList: unknown[] }).fileList;
    };

    const getBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file: {
        url?: string;
        preview?: string;
        originFileObj?: File;
        name?: string;
    }) => {
        if (!file.url && !file.preview && file.originFileObj) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview || '');
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url?.substring(file.url.lastIndexOf('/') + 1) || '');
    };

    return (
        <div>
            <Row>
                <Col span={12} style={{ marginBottom: 10 }}>
                    <h2>Pictures</h2>
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
                    dataSource={pictures}
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
                                    {(parseInt(String(item.pic_status)) === 0 ||
                                        item.pic_status === false) && (
                                        <Tag color="error">Nonactive</Tag>
                                    )}
                                    {(parseInt(String(item.pic_status)) === 1 ||
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
                onClose={() => setVisible(false)}
                open={visible}
                size="40%"
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="pictures"
                    onFinish={save}
                    initialValues={{
                        pic_title: '',
                        pic_status: false,
                        pic_category_name: undefined,
                        pic_desc: '',
                        pic_image: undefined,
                    }}
                >
                    <Form.Item
                        label="Title"
                        name="pic_title"
                        rules={[{ required: true, message: 'Please input title!' }]}
                    >
                        <Input size="large" placeholder="Title" />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="pic_category_name"
                        rules={[{ required: true, message: 'Please select category!' }]}
                    >
                        <Select size="large" style={{ width: '100%' }}>
                            {categories.map((item) => (
                                <Option key={item.category_name} value={item.category_name}>
                                    {item.category_name}
                                </Option>
                            ))}
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
                        getValueFromEvent={uploadFile}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList as never[]}
                            onPreview={handlePreview}
                            onChange={({ fileList: fl }) => setFileList(fl)}
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
                                ext={oldImageExt || undefined}
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
                    open={previewVisible}
                    footer={null}
                    onCancel={() => setPreviewVisible(false)}
                >
                    <h3 style={{ position: 'absolute', padding: 12 }}>{previewTitle}</h3>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Drawer>
        </div>
    );
}
