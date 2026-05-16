import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, Form, Input, Select, Space, Switch, Typography, message } from 'antd'
import { ReloadOutlined, SaveOutlined } from '@ant-design/icons'
import { getRoleApi, listPermissionsApi, listRolesApi, setRolePermissionsApi } from '../../api/rbac'
import { http } from '../../api/http'

export default function RolesPage() {
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [selectedRoleId, setSelectedRoleId] = useState(null)
  const [selectedPermissionCodes, setSelectedPermissionCodes] = useState([])
  const [saving, setSaving] = useState(false)
  const [roleEnabled, setRoleEnabled] = useState(true)
  const [form] = Form.useForm()

  const roleOptions = useMemo(
    () => roles.map((r) => ({ value: r.id, label: `${r.code}` })),
    [roles]
  )

  const permissionOptions = useMemo(
    () => permissions.map((p) => ({ value: p.code, label: `${p.code}` })),
    [permissions]
  )

  const load = async () => {
    setLoading(true)
    try {
      const [r, p] = await Promise.all([listRolesApi(), listPermissionsApi()])
      setRoles(r)
      setPermissions(p)
      if (!selectedRoleId && r.length > 0) {
        setSelectedRoleId(r[0].id)
      }
    } catch (e) {
      message.error(e?.response?.data?.message ?? 'Không tải được RBAC data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchRole = async () => {
      if (!selectedRoleId) return
      try {
        const detail = await getRoleApi(selectedRoleId)
        setSelectedPermissionCodes(detail.permissionCodes ?? [])
        setRoleEnabled(!!detail.enabled)
        form.setFieldsValue({ name: detail.name, description: detail.description })
      } catch (e) {
        message.error(e?.response?.data?.message ?? 'Không tải được role detail')
      }
    }
    fetchRole()
  }, [selectedRoleId, form])

  const onSave = async () => {
    if (!selectedRoleId) return
    setSaving(true)
    try {
      const values = form.getFieldsValue()
      await http.put(`/api/roles/${selectedRoleId}`, { name: values.name, description: values.description })
      await http.put(`/api/roles/${selectedRoleId}/enabled`, null, { params: { enabled: roleEnabled } })
      await setRolePermissionsApi(selectedRoleId, selectedPermissionCodes)
      message.success('Đã cập nhật permissions cho role')
    } catch (e) {
      message.error(e?.response?.data?.message ?? 'Lưu thất bại')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Cấu hình vai trò và quyền
          </Typography.Title>
          <Typography.Text type="secondary">
            Permission catalog được seed từ backend; bạn có thể gán quyền cho role một cách dynamic.
          </Typography.Text>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={load} loading={loading}>
            Tải lại
          </Button>
          <Button type="primary" icon={<SaveOutlined />} onClick={onSave} loading={saving}>
            Lưu
          </Button>
        </Space>
      </Space>

      <Card>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <div>
            <Typography.Text strong>Role</Typography.Text>
            <div>
              <Select
                style={{ width: '100%', maxWidth: 360 }}
                options={roleOptions}
                value={selectedRoleId}
                onChange={setSelectedRoleId}
              />
            </div>
          </div>

          <Form form={form} layout="vertical" requiredMark={false}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên role' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Form>

          <div>
            <Typography.Text strong>Enabled</Typography.Text>
            <div>
              <Switch checked={roleEnabled} onChange={setRoleEnabled} />
            </div>
          </div>

          <div>
            <Typography.Text strong>Permissions</Typography.Text>
            <div>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                options={permissionOptions}
                value={selectedPermissionCodes}
                onChange={setSelectedPermissionCodes}
                placeholder="Chọn permissions cho role"
              />
            </div>
          </div>
        </Space>
      </Card>
    </div>
  )
}
