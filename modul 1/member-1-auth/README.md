# Member 1 - Auth

Pham vi: login/logout/forgot/reset/change password.

Khuyen nghi branch
- `auth-module` hoac `fe-be-auth`

FE files (duoc sua)
- `frontend/src/pages/auth/LoginPage.jsx`
- `frontend/src/pages/auth/LoginPage.css`
- `frontend/src/pages/auth/RegisterPage.jsx`
- `frontend/src/pages/auth/RegisterPage.css`
- `frontend/src/pages/auth/ForgotPasswordPage.jsx`
- `frontend/src/pages/auth/ResetPasswordPage.jsx`
- `frontend/src/pages/profile/ChangePasswordPage.jsx`
- `frontend/src/api/auth.js`
- `frontend/src/api/http.js`
- `frontend/src/auth/token.js`
- `frontend/src/App.jsx` (routes/guard lien quan auth)
- `frontend/src/components/DashboardLayout.jsx` (logout / link change-password)

BE files (duoc sua)
- `backend/src/main/java/com/its/inventory/controller/auth/AuthController.java`
- `backend/src/main/java/com/its/inventory/service/AuthService.java`
- `backend/src/main/java/com/its/inventory/service/impl/AuthServiceImpl.java`
- `backend/src/main/java/com/its/inventory/dto/auth/LoginRequest.java`
- `backend/src/main/java/com/its/inventory/dto/auth/LoginResponse.java`
- `backend/src/main/java/com/its/inventory/dto/auth/LogoutResponse.java`
- `backend/src/main/java/com/its/inventory/dto/auth/RegisterRequest.java`
- `backend/src/main/java/com/its/inventory/dto/auth/RegisterResponse.java`
- `backend/src/main/java/com/its/inventory/dto/auth/ForgotPasswordRequest.java`
- `backend/src/main/java/com/its/inventory/dto/auth/ForgotPasswordResponse.java`
- `backend/src/main/java/com/its/inventory/dto/auth/ResetPasswordRequest.java`
- `backend/src/main/java/com/its/inventory/dto/auth/ResetPasswordResponse.java`
- `backend/src/main/java/com/its/inventory/dto/auth/ChangePasswordRequest.java`
- `backend/src/main/java/com/its/inventory/dto/auth/ChangePasswordResponse.java`
- `backend/src/main/java/com/its/inventory/security/SecurityConfig.java`
- `backend/src/main/java/com/its/inventory/security/JwtAuthFilter.java`
- `backend/src/main/java/com/its/inventory/security/JwtService.java`
- `backend/src/main/java/com/its/inventory/security/DbUserDetailsService.java`
- `backend/src/main/java/com/its/inventory/entity/PasswordResetToken.java`
- `backend/src/main/java/com/its/inventory/repository/PasswordResetTokenRepository.java`

BE files (chi doc, han che sua de tranh conflict voi nhom Users/Roles)
- `backend/src/main/java/com/its/inventory/repository/UserRepository.java`
- `backend/src/main/java/com/its/inventory/repository/RoleRepository.java`
- `backend/src/main/java/com/its/inventory/entity/User.java`
- `backend/src/main/java/com/its/inventory/mapper/UserMapper.java`
- `backend/src/main/java/com/its/inventory/dto/user/UserDto.java`

Lenh git mau (commit theo path)
```bash
git checkout main
git pull
git checkout -b auth-module

git add \
  frontend/src/pages/auth \
  frontend/src/pages/profile/ChangePasswordPage.jsx \
  frontend/src/api/auth.js frontend/src/api/http.js frontend/src/auth/token.js \
  frontend/src/App.jsx frontend/src/components/DashboardLayout.jsx \
  backend/src/main/java/com/its/inventory/controller/auth/AuthController.java \
  backend/src/main/java/com/its/inventory/service/AuthService.java \
  backend/src/main/java/com/its/inventory/service/impl/AuthServiceImpl.java \
  backend/src/main/java/com/its/inventory/dto/auth \
  backend/src/main/java/com/its/inventory/security \
  backend/src/main/java/com/its/inventory/entity/PasswordResetToken.java \
  backend/src/main/java/com/its/inventory/repository/PasswordResetTokenRepository.java

git commit -m "Auth module (FE+BE)"
git push -u origin auth-module
```
