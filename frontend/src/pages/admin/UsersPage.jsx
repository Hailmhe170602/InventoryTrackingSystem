import React, { useEffect, useMemo, useState } from 'react'
import { Button, Drawer, Form, Input, Select, Space, Switch, Table, Tag, Typography, message } from 'antd'
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { createUserApi, listUsersApi, setUserEnabledApi, setUserRolesApi, updateUserApi } from '../../api/users'
import { listRolesApi } from '../../api/rbac'

export default function UsersPage() {
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState([])
  const [roles, setRoles] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [saving, setSaving] = useState(false)
  const [form] = Form.useForm()

  const roleOptions = useMemo(() => roles.map((r) => ({ value: r.code, label: r.code })), [roles])

  const load = async () => {
    setLoading(true)
    try {
      const [u, r] = await Promise.all([listUsersApi(), listRolesApi()])
      setRows(u)
      setRoles(r)
    } catch (e) {
      message.error(e?.response?.data?.message ?? 'Không tải được danh sách người dùng')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const openCreate = () => {
    setEditingUser(null)
    form.resetFields()
    form.setFieldsValue({ roleCodes: ['VIEWER'], enabled: true })
    setDrawerOpen(true)
  }

  const openEdit = (u) => {
    setEditingUser(u)
    form.resetFields()
    form.setFieldsValue({
      username: u.username,
      fullName: u.fullName,
      email: u.email,
      roleCodes: (u.roles ?? []).map((r) => r.code),
      enabled: !!u.enabled,
    })
    setDrawerOpen(true)
  }

  const onSaveUser = async (values) => {
    setSaving(true)
    try {
      if (!editingUser) {
        await createUserApi({
          username: values.username,
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          roleCodes: values.roleCodes,
        })
        message.success('Đã tạo user')
      } else {
        await updateUserApi(editingUser.id, { fullName: values.fullName, email: values.email })
        await setUserRolesApi(editingUser.id, values.roleCodes)
        await setUserEnabledApi(editingUser.id, values.enabled)
        message.success('Đã cập nhật user')
      }
      setDrawerOpen(false)
      await load()
    } catch (e) {
      message.error(e?.response?.data?.message ?? 'Lưu thất bại')
    } finally {
      setSaving(false)
    }
  }

  const onToggleEnabled = async (userId, enabled) => {
    try {
      await setUserEnabledApi(userId, enabled)
      setRows((prev) => prev.map((u) => (u.id === userId ? { ...u, enabled } : u)))
      message.success(enabled ? 'Đã kích hoạt tài khoản' : 'Đã vô hiệu hóa tài khoản')
    } catch (e) {
      message.error(e?.response?.data?.message ?? 'Cập nhật trạng thái thất bại')
    }
  }

  const onChangeRoles = async (userId, roleCodes) => {
    try {
      await setUserRolesApi(userId, roleCodes)
      setRows((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, roles: roleCodes.map((c) => ({ code: c, name: c })) } : u
        )
      )
      message.success('Đã cập nhật vai trò')
    } catch (e) {
      message.error(e?.response?.data?.message ?? 'Cập nhật vai trò thất bại')
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 90,
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Full name',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      width: 260,
      render: (roles, record) => (
        <Select
          mode="multiple"
          value={(roles ?? []).map((r) => r.code)}
          style={{ width: '100%' }}
          options={roleOptions}
          onChange={(v) => onChangeRoles(record.id, v)}
        />
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'enabled',
      width: 160,
      render: (enabled) => (enabled ? <Tag color="green">ENABLED</Tag> : <Tag>DISABLED</Tag>),
    },
    {
      title: 'Duyệt',
      dataIndex: 'enabled',
      width: 120,
      render: (enabled, record) => (
        <Switch checked={enabled} onChange={(v) => onToggleEnabled(record.id, v)} />
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Button size="small" onClick={() => openEdit(record)}>
          Xem/Sửa
        </Button>
      ),
    },
  ]

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Quản lý tài khoản
          </Typography.Title>
          <Typography.Text type="secondary">
            Tài khoản người dùng đăng ký sẽ ở trạng thái DISABLED cho đến khi được admin duyệt.
          </Typography.Text>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={load} loading={loading}>
            Tải lại
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
            Thêm user
          </Button>
        </Space>
      </Space>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={rows}
        pagination={{ pageSize: 10 }}
      />

      <Drawer
        title={editingUser ? `User #${editingUser.id}` : 'Tạo user'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={520}
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={onSaveUser} requiredMark={false}>
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Vui lòng nhập username' }]}>
            <Input disabled={!!editingUser} />
          </Form.Item>
          <Form.Item label="Full name" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email' }, { type: 'email', message: 'Email không hợp lệ' }]}
          >
            <Input />
          </Form.Item>

          {!editingUser && (
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }, { min: 6, message: 'Tối thiểu 6 ký tự' }]}
            >
              <Input.Password />
            </Form.Item>
          )}

          <Form.Item label="Roles" name="roleCodes">
            <Select mode="multiple" options={roleOptions} />
          </Form.Item>

          {!!editingUser && (
            <Form.Item label="Enabled" name="enabled" valuePropName="checked">
              <Switch />
            </Form.Item>
          )}

          <Space>
            <Button type="primary" htmlType="submit" loading={saving}>
              Lưu
            </Button>
            <Button onClick={() => setDrawerOpen(false)} disabled={saving}>
              Hủy
            </Button>
          </Space>
        </Form>
      </Drawer>
    </div>
  )
}
