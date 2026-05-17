# Member 5 - Roles (Edit Permissions + Active/Deactive) + Integration

Pham vi: active/deactive role, edit role permissions. Dong thoi phu trach cac file tich hop neu can (tranh conflict).

Khuyen nghi branch
- `role-permissions-active-integration`

FE files (duoc sua)
- `frontend/src/pages/admin/RolesPage.jsx` (phan edit permissions + toggle active)
- `frontend/src/api/rbac.js` (update permissions, toggle active)

BE files (duoc sua)
- `backend/src/main/java/com/its/inventory/controller/role/RoleController.java` (endpoints toggle active / update permissions)
- `backend/src/main/java/com/its/inventory/dto/role/UpdateRolePermissionsRequest.java`
- `backend/src/main/java/com/its/inventory/dto/permission/PermissionDto.java`
- `backend/src/main/java/com/its/inventory/repository/PermissionRepository.java`
- `backend/src/main/java/com/its/inventory/entity/Permission.java`

Integration files (neu bat buoc, chi member 5 sua)
- `frontend/src/App.jsx` (neu can them route moi)
- `backend/src/main/java/com/its/inventory/security/SecurityConfig.java` (neu can permit/authorize them)
- `backend/src/main/java/com/its/inventory/config/seed/RbacSeeder.java` (neu can seed permission/role)

Lenh git mau (commit theo path)
```bash
git checkout main
git pull
git checkout -b role-permissions-active-integration

git add \
  frontend/src/pages/admin/RolesPage.jsx frontend/src/api/rbac.js \
  backend/src/main/java/com/its/inventory/controller/role/RoleController.java \
  backend/src/main/java/com/its/inventory/dto/role/UpdateRolePermissionsRequest.java \
  backend/src/main/java/com/its/inventory/dto/permission/PermissionDto.java \
  backend/src/main/java/com/its/inventory/repository/PermissionRepository.java \
  backend/src/main/java/com/its/inventory/entity/Permission.java \
  frontend/src/App.jsx \
  backend/src/main/java/com/its/inventory/security/SecurityConfig.java \
  backend/src/main/java/com/its/inventory/config/seed/RbacSeeder.java

git commit -m "Roles: permissions + active + integration"
git push -u origin role-permissions-active-integration
```
