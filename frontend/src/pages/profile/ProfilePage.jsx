import React from 'react'
import { Card, Descriptions, Space, Tag, Typography } from 'antd'

export default function ProfilePage({ me }) {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Space direction="vertical" style={{ width: '100%' }} size={16}>
        <div>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Hồ sơ
          </Typography.Title>
          <Typography.Text type="secondary">Thông tin tài khoản.</Typography.Text>
        </div>

        <Card title="Thông tin tài khoản">
          <Descriptions column={1} size="middle">
            <Descriptions.Item label="Username">{me?.username ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {me?.enabled ? <Tag color="green">ENABLED</Tag> : <Tag>DISABLED</Tag>}
            </Descriptions.Item>
            <Descriptions.Item label="Roles">
              {(me?.roles ?? []).length ? (
                (me.roles ?? []).map((r) => (
                  <Tag key={r.code} style={{ marginBottom: 6 }}>
                    {r.code}
                  </Tag>
                ))
              ) : (
                <Tag>NO_ROLE</Tag>
              )}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </div>
  )
}
