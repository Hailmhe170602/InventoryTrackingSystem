# Member 4 - Roles (View + Update Info)

Pham vi: xem danh sach role, xem permissions, update thong tin role (khong bao gom edit permissions va active/deactive).

Khuyen nghi branch
- `role-view-update`

FE files (duoc sua)
- `frontend/src/pages/admin/RolesPage.jsx` (phan list/view + update info)
- `frontend/src/api/rbac.js` (GET roles, GET role detail, update role info)

BE files (duoc sua)
- `backend/src/main/java/com/its/inventory/controller/role/RoleController.java` (GET + update info)
- `backend/src/main/java/com/its/inventory/dto/role/RoleDto.java`
- `backend/src/main/java/com/its/inventory/dto/role/RoleDetailDto.java`
- `backend/src/main/java/com/its/inventory/dto/role/UpdateRoleRequest.java`

BE files (chi doc, han che sua)
- `backend/src/main/java/com/its/inventory/repository/RoleRepository.java`

Lenh git mau (commit theo path)
```bash
git checkout main
git pull
git checkout -b role-view-update

git add \
  frontend/src/pages/admin/RolesPage.jsx frontend/src/api/rbac.js \
  backend/src/main/java/com/its/inventory/controller/role/RoleController.java \
  backend/src/main/java/com/its/inventory/dto/role/RoleDto.java \
  backend/src/main/java/com/its/inventory/dto/role/RoleDetailDto.java \
  backend/src/main/java/com/its/inventory/dto/role/UpdateRoleRequest.java

git commit -m "Roles: view + update info"
git push -u origin role-view-update
```
