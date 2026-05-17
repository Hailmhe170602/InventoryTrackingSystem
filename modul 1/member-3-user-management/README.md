# Member 3 - User Management

Pham vi: them user moi, update thong tin user, active/deactive user.

Khuyen nghi branch
- `user-management`

FE files (duoc sua)
- `frontend/src/pages/admin/UsersPage.jsx` (phan CRUD/toggle)
- `frontend/src/api/users.js` (POST/PUT/PATCH)

BE files (duoc sua)
- `backend/src/main/java/com/its/inventory/controller/user/UserController.java` (POST/PUT/PATCH)
- `backend/src/main/java/com/its/inventory/service/UserService.java`
- `backend/src/main/java/com/its/inventory/service/impl/UserServiceImpl.java`
- `backend/src/main/java/com/its/inventory/dto/user/CreateUserRequest.java`
- `backend/src/main/java/com/its/inventory/dto/user/UpdateUserRequest.java`
- `backend/src/main/java/com/its/inventory/dto/user/UpdateUserRolesRequest.java` (neu co)

BE files (chi doc, han che sua)
- `backend/src/main/java/com/its/inventory/repository/UserRepository.java`
- `backend/src/main/java/com/its/inventory/entity/User.java`

Lenh git mau (commit theo path)
```bash
git checkout main
git pull
git checkout -b user-management

git add \
  frontend/src/pages/admin/UsersPage.jsx frontend/src/api/users.js \
  backend/src/main/java/com/its/inventory/controller/user/UserController.java \
  backend/src/main/java/com/its/inventory/service/UserService.java \
  backend/src/main/java/com/its/inventory/service/impl/UserServiceImpl.java \
  backend/src/main/java/com/its/inventory/dto/user/CreateUserRequest.java \
  backend/src/main/java/com/its/inventory/dto/user/UpdateUserRequest.java \
  backend/src/main/java/com/its/inventory/dto/user/UpdateUserRolesRequest.java

git commit -m "User management"
git push -u origin user-management
```
