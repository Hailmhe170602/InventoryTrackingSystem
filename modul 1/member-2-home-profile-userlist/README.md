# Member 2 - Home + Profile + User List

Pham vi: HomePage, view profile, danh sach user (chi xem/list).

Khuyen nghi branch
- `home-profile-userlist`

FE files (duoc sua)
- `frontend/src/pages/HomePage.jsx`
- `frontend/src/pages/HomePage.css`
- `frontend/src/pages/profile/ProfilePage.jsx`
- `frontend/src/pages/SubPages.css` (neu dung chung cho trang con)
- `frontend/src/pages/admin/UsersPage.jsx` (chi phan list/view, tranh sua CRUD/toggle)
- `frontend/src/api/users.js` (GET list users)

BE files (duoc sua)
- `backend/src/main/java/com/its/inventory/controller/user/UserController.java` (GET list, GET me neu dat o day)
- `backend/src/main/java/com/its/inventory/service/UserService.java` (cac method read/list)
- `backend/src/main/java/com/its/inventory/service/impl/UserServiceImpl.java` (read/list)
- `backend/src/main/java/com/its/inventory/dto/user/UserDto.java`

BE files (chi doc, han che sua)
- `backend/src/main/java/com/its/inventory/repository/UserRepository.java`
- `backend/src/main/java/com/its/inventory/mapper/UserMapper.java`

Lenh git mau (commit theo path)
```bash
git checkout main
git pull
git checkout -b home-profile-userlist

git add \
  frontend/src/pages/HomePage.jsx frontend/src/pages/HomePage.css \
  frontend/src/pages/profile/ProfilePage.jsx \
  frontend/src/pages/SubPages.css \
  frontend/src/pages/admin/UsersPage.jsx \
  frontend/src/api/users.js \
  backend/src/main/java/com/its/inventory/controller/user/UserController.java \
  backend/src/main/java/com/its/inventory/service/UserService.java \
  backend/src/main/java/com/its/inventory/service/impl/UserServiceImpl.java \
  backend/src/main/java/com/its/inventory/dto/user/UserDto.java

git commit -m "Home/Profile/User list"
git push -u origin home-profile-userlist
```
