import React from 'react';
import { ImageUploader } from 'antd-mobile';

export default function UploadBox(props) {

    const { value, onChange } = props;

    const onImageChange = (res) => {
        onChange(res ? res[0] : undefined)
    }
    const beforeUpload = (file) => {
        if (file.size > 1024 * 1024) {
            Toast.show('请选择小于 1M 的图片')
            return null
        }
        return file
    }
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64String = reader.result
                resolve(base64String);
            };

            reader.onerror = function () {
                reject(new Error("Failed to load file"));
            };
        });
    }

    const ImageValue = value ? [{ url: value }] : []

    return (
        <ImageUploader
            key={value}
            value={ImageValue}
            onChange={onImageChange}
            maxCount={1}
            preview
            upload={fileToBase64}
            showUpload={!value}
            beforeUpload={beforeUpload}
        />
    )
}