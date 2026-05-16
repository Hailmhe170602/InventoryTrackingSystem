import React from 'react';
import { Dropdown, Layout, Progress, Tag, Row, Col } from 'antd';
import { 
  ArrowRightOutlined, 
  FileTextOutlined,
  ImportOutlined,
  ExportOutlined,
  CarryOutOutlined,
  DatabaseOutlined,
  WarningOutlined,
  DownOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { logoutApi } from '../api/auth';
import { clearAccessToken } from '../auth/token';
import inventoryLogo from '../assets/inventory-logo.png';

const { Header, Content, Footer } = Layout;

const HomePage = ({ onLogout, me }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      // ignore
    } finally {
      clearAccessToken();
      if (onLogout) await onLogout();
      navigate('/login');
    }
  };

  const rolesText = (me?.roles ?? []).map((r) => r.code).join(', ') || 'NO_ROLE';
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'View profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'password',
      icon: <LockOutlined />,
      label: 'Change password',
      onClick: () => navigate('/change-password'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      danger: true,
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Header */}
      <Header style={{ 
        background: 'white', 
        padding: '0 46px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        height: '64px',
        gap: '28px',
        lineHeight: 1,
        boxShadow: '0 1px 8px rgba(15, 23, 42, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: '0 0 220px' }}>
          <img
            src={inventoryLogo}
            alt="InventoryTracking"
            style={{ display: 'block', width: '204px', height: '54px', objectFit: 'contain', objectPosition: 'left center' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '24px', flex: 1, minWidth: 0 }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px', fontWeight: 500, color: '#111827', fontSize: '16px', whiteSpace: 'nowrap' }}>
            <span style={{ cursor: 'pointer', lineHeight: 1.15 }}>Tổng quan</span>
            <span style={{ cursor: 'pointer', lineHeight: 1.15 }}>Kho hàng</span>
            <span style={{ cursor: 'pointer', lineHeight: 1.15 }}>Phiếu nhập</span>
            <span style={{ cursor: 'pointer', lineHeight: 1.15 }}>Phiếu xuất</span>
            <span style={{ cursor: 'pointer', lineHeight: 1.15 }}>Báo cáo</span>
            {(me?.roles ?? []).some((r) => r.code === 'ADMIN') && (
              <>
                <span style={{ cursor: 'pointer', lineHeight: 1.15 }} onClick={() => navigate('/admin/users')}>Tài khoản</span>
                <span style={{ cursor: 'pointer', lineHeight: 1.15 }} onClick={() => navigate('/admin/roles')}>Vai trò</span>
              </>
            )}
          </nav>

          <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
            <button
              type="button"
              style={{
                minWidth: '214px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '5px 10px 5px 6px',
                border: '1px solid #d8e3ea',
                borderRadius: '999px',
                background: '#f8fbfd',
                color: '#00384d',
                cursor: 'pointer',
                boxShadow: '0 8px 22px rgba(15, 23, 42, 0.06)'
              }}
            >
              <span style={{ width: '40px', height: '40px', flex: '0 0 40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #d8eef7', background: 'white' }}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" style={{ width: '100%', height: '100%' }} />
              </span>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', lineHeight: 1.1 }}>
                <span style={{ maxWidth: '132px', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 13, fontWeight: 800, whiteSpace: 'nowrap' }}>
                  {me ? me.username : 'User'}
                </span>
                <span style={{ color: '#047fa9', fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap' }}>
                  {rolesText}
                </span>
              </span>
              <DownOutlined style={{ marginLeft: 'auto', color: '#64748b', fontSize: 12 }} />
            </button>
          </Dropdown>
        </div>
      </Header>

      <Content style={{ padding: '32px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Hero Banner */}
          <div style={{ 
            background: 'linear-gradient(90deg, #048ABF 0%, #024e6b 100%)', 
            borderRadius: '24px', 
            padding: '48px', 
            color: 'white',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(4, 138, 191, 0.15)'
          }}>
            <Row align="middle">
              <Col span={14}>
                <h1 style={{ color: 'white', fontSize: '42px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>
                  Quản lý xuất nhập kho nhanh, chính xác, minh bạch
                </h1>
                <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '32px', maxWidth: '500px' }}>
                  Theo dõi tồn kho, tạo phiếu nhập xuất, kiểm soát hàng hóa theo thời gian thực với giải pháp tối ưu.
                </p>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button className="btn-primary" style={{ background: 'white', color: 'var(--primary)', width: '180px' }}>
                    Bắt đầu quản lý <ArrowRightOutlined />
                  </button>
                  <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', width: '180px' }}>
                    Xem báo cáo <FileTextOutlined />
                  </button>
                </div>
              </Col>
              <Col span={10}>
                <div className="glass-panel" style={{ padding: '24px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '16px', opacity: 0.8 }}>TỔN KHO THEO TUẦN</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: '140px', gap: '8px' }}>
                    {[40, 70, 50, 80, 100, 60, 85].map((h, i) => (
                      <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.3)', height: `${h}%`, borderRadius: '4px' }}></div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Top Stats */}
          <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
            <Col span={6}>
              <div className="glass-panel" style={{ padding: '24px', background: 'white', border: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ color: '#666', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>Tổng số mặt hàng</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#004e6b' }}>1,280</div>
                    <div style={{ fontSize: '12px', color: '#52c41a', marginTop: '4px' }}>+12% so với tháng trước</div>
                  </div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DatabaseOutlined style={{ fontSize: '22px', color: 'var(--primary)' }} />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="glass-panel" style={{ padding: '24px', background: 'white', border: 'none', borderLeft: '4px solid #f5222d' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ color: '#666', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>Hàng sắp hết</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#f5222d' }}>12</div>
                    <div style={{ fontSize: '12px', color: '#f5222d', marginTop: '4px' }}>Cần nhập thêm ngay</div>
                  </div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff1f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <WarningOutlined style={{ fontSize: '22px', color: '#f5222d' }} />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="glass-panel" style={{ padding: '24px', background: 'white', border: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ color: '#666', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>Phiếu nhập hôm nay</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#004e6b' }}>45</div>
                    <div style={{ fontSize: '12px', color: '#52c41a', marginTop: '4px' }}>Tổng: 12.5tr VNĐ</div>
                  </div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f6ffed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ImportOutlined style={{ fontSize: '22px', color: '#52c41a' }} />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="glass-panel" style={{ padding: '24px', background: 'white', border: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ color: '#666', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>Phiếu xuất hôm nay</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#004e6b' }}>32</div>
                    <div style={{ fontSize: '12px', color: '#faad14', marginTop: '4px' }}>Đang chờ: 5 phiếu</div>
                  </div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff7e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ExportOutlined style={{ fontSize: '22px', color: '#faad14' }} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col span={16}>
              <div className="glass-panel" style={{ padding: '32px', background: 'white', border: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>Giao dịch gần đây</h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Tag color="blue" style={{ borderRadius: '8px' }}>Tất cả</Tag>
                    <Tag style={{ borderRadius: '8px' }}>Nhập kho</Tag>
                    <Tag style={{ borderRadius: '8px' }}>Xuất kho</Tag>
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #f0f0f0' }}>
                      <th style={{ padding: '16px 0', color: '#999', fontSize: '13px' }}>MÃ PHIẾU</th>
                      <th style={{ padding: '16px 0', color: '#999', fontSize: '13px' }}>NGÀY TẠO</th>
                      <th style={{ padding: '16px 0', color: '#999', fontSize: '13px' }}>NGƯỜI TẠO</th>
                      <th style={{ padding: '16px 0', color: '#999', fontSize: '13px' }}>TRẠNG THÁI</th>
                      <th style={{ padding: '16px 0', color: '#999', fontSize: '13px' }}>HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'PN-240501', date: '15/05/2024', user: 'Nguyễn Văn A', status: 'Hoàn thành', color: 'success' },
                      { id: 'PX-240502', date: '15/05/2024', user: 'Trần Thị B', status: 'Đang xử lý', color: 'processing' },
                      { id: 'PN-240495', date: '14/05/2024', user: 'Lê Văn C', status: 'Chờ duyệt', color: 'warning' },
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '16px 0', fontWeight: 700 }}>{row.id}</td>
                        <td style={{ padding: '16px 0', color: '#666' }}>{row.date}</td>
                        <td style={{ padding: '16px 0' }}>{row.user}</td>
                        <td style={{ padding: '16px 0' }}><Tag color={row.color} style={{ borderRadius: '6px' }}>{row.status}</Tag></td>
                        <td style={{ padding: '16px 0' }}><span style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>Xem chi tiết</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>

            <Col span={8}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="glass-panel" style={{ padding: '24px', background: 'white', border: 'none' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>Thao tác nhanh</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[
                      { icon: <ImportOutlined />, label: 'Tạo phiếu nhập', color: '#52c41a' },
                      { icon: <ExportOutlined />, label: 'Tạo phiếu xuất', color: '#1890ff' },
                      { icon: <CarryOutOutlined />, label: 'Kiểm kê kho', color: '#722ed1' },
                      { icon: <SettingOutlined />, label: 'Cấu hình', color: '#8c8c8c' }
                    ].map((item, idx) => (
                      <div key={idx} className="action-card" style={{ 
                        padding: '16px', 
                        borderRadius: '16px', 
                        background: '#f8fbff', 
                        border: '1px solid #eef2f6',
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}>
                        <div style={{ color: item.color, fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                        <div style={{ fontSize: '13px', fontWeight: 700 }}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '24px', background: '#fff9f9', border: '1px solid #feeef2' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <WarningOutlined style={{ color: '#f5222d' }} />
                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#f5222d' }}>Cảnh báo tồn kho</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                        <span style={{ fontWeight: 600 }}>iPhone 15 Pro Max</span>
                        <span style={{ color: '#f5222d', fontWeight: 800 }}>2/50</span>
                      </div>
                      <Progress percent={4} showInfo={false} strokeColor="#f5222d" strokeWidth={8} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                        <span style={{ fontWeight: 600 }}>MacBook M3 14-inch</span>
                        <span style={{ color: '#f5222d', fontWeight: 800 }}>5/20</span>
                      </div>
                      <Progress percent={25} showInfo={false} strokeColor="#f5222d" strokeWidth={8} />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: 'white', padding: '32px 0', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ fontWeight: 800, color: '#004e6b', fontSize: '18px', marginBottom: '12px' }}>InventoryTrackingSystem</div>
        <div style={{ color: '#999', fontSize: '12px' }}>
          © 2024 InventoryTrackingSystem. All rights reserved.
        </div>
      </Footer>
    </Layout>
  );
};

export default HomePage;
