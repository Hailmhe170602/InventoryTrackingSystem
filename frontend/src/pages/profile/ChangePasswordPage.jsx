import React, { useState } from 'react'
import { Button, Card, Form, Input, Space, Typography, message } from 'antd'
import { changePasswordApi } from '../../api/auth'

export default function ChangePasswordPage() {
  const [saving, setSaving] = useState(false)
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    setSaving(true)
    try {
      await changePasswordApi({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
      message.success('Đổi mật khẩu thành công')
      form.resetFields()
    } catch (e) {
      message.error(e?.response?.data?.message ?? 'Đổi mật khẩu thất bại')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
      <Space direction="vertical" style={{ width: '100%' }} size={16}>
        <div>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Đổi mật khẩu
          </Typography.Title>
          <Typography.Text type="secondary">Cập nhật mật khẩu đăng nhập của bạn.</Typography.Text>
        </div>

        <Card>
          <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item
              label="Mật khẩu hiện tại"
              name="currentPassword"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
            >
              <Input.Password placeholder="Nhập mật khẩu hiện tại" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu mới"
              name="confirmNewPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) return Promise.resolve()
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp'))
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu mới" />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={saving}>
              Đổi mật khẩu
            </Button>
          </Form>
        </Card>
      </Space>
    </div>
  )
}
