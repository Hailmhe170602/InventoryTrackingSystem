# Bo co Feature W1 (InventoryTrackingSystem)

## Phm vi

- Frontend: React + Vite + Ant Design
- Backend: Spring Boot + Spring Security (JWT) + JPA + MySQL
- Mo hnh phn quyn: RBAC (User - Role - Permission), cu hnh dynamic trn giao din

## Tm tt

Hnh ng W1  hon thnh c chng nng ct li:

- ng nhp/ ng xut (JWT)
- ng k ti khon (ti khon mi ch admin duyt)
- Qun l ti khon (Admin): danh sch, xem/s, to user, duyt/kho, gn roles
- Qun l vai tr & quyn (Admin Advanced): xem roles, xem/ cp nht thng tin role, bt/tt role, gn permissions cho role
- Profile + Change password
- Forgot password + Reset password (dev mode: tr token)

## Checklist W1

### Common

1. Homepage
- FE: `frontend/src/pages/HomePage.jsx`

2. Login
- FE: `frontend/src/pages/auth/LoginPage.jsx`
- BE: `POST /api/auth/login`, `GET /api/auth/me`

3. Logout
- FE: logout trong HomePage
- BE: `POST /api/auth/logout`

4. Forgot password
- FE: `GET /forgot-password`, `GET /reset-password`
- BE:
  - `POST /api/auth/forgot-password` (tr `resetToken`  dev)
  - `POST /api/auth/reset-password`

5. View my profile
- FE: `GET /profile`
- D liu: t `GET /api/auth/me`

6. Change password
- FE: `GET /change-password`
- BE: `POST /api/auth/change-password`

### Admin

7. View user list
- FE: `GET /admin/users` (bng danh sch)
- BE: `GET /api/users`

8. View user information
- FE: Drawer `Xem/S` trong `/admin/users`
- BE: `GET /api/users/{id}`

9. Add new user
- FE: Nt `Thm user` trong `/admin/users`
- BE: `POST /api/users`

10. Active/deactive user
- FE: switch `enabled` trong `/admin/users`
- BE: `PUT /api/users/{id}/enabled?enabled=true|false`

11. Update user information
- FE: S `fullName`, `email`, roles, enabled trong drawer `/admin/users`
- BE:
  - `PUT /api/users/{id}` (cp nht `fullName`, `email`)
  - `PUT /api/users/{id}/roles`
  - `PUT /api/users/{id}/enabled`

### Admin Advanced

12. View role list
- FE: `GET /admin/roles`
- BE: `GET /api/roles`

13. View role permissions
- FE: khi chn role trong `/admin/roles` s load detail
- BE: `GET /api/roles/{id}` (tr `permissionCodes`)

14. Update role information
- FE: form `name`, `description` trong `/admin/roles`
- BE: `PUT /api/roles/{id}`

15. Active/deactive role
- FE: switch `enabled` trong `/admin/roles`
- BE: `PUT /api/roles/{id}/enabled?enabled=true|false`

16. Edit role permissions
- FE: multi-select permissions + `Lu` trong `/admin/roles`
- BE: `PUT /api/roles/{id}/permissions`

## Thay oi Database/Model

- `User` thm field: `fullName`, `email`
- `Role` thm field: `enabled`
- Thm entity: `Permission`, `PasswordResetToken`
- Quan h:
  - User <-> Role: many-to-many (`user_roles`)
  - Role <-> Permission: many-to-many (`role_permissions`)

## RBAC & Security

- JWT stateless
- Authorities:
  - Role: `ROLE_<code>`
  - Permission: `<code>`
- Seed RBAC:
  - Seed permission catalog (server-controlled)
  - Seed roles `ADMIN/WAREHOUSE/VIEWER`
  - Seed admin user t `app.seed.admin.*`

## Ghi ch

- Dng `spring.jpa.hibernate.ddl-auto=update` (dev)
- Forgot password hin ti l dev-mode: tr token tr v FE, cha th hp email.
