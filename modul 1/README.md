# Modul 1 (Chia Viec Nhom)

Muc tieu: moi thanh vien lam viec tren phan duoc giao (FE/BE) va push len Git bang branch/PR rieng. Khi merge day du 5 PR, code tren `main` se giong source hoan chinh.

Quy uoc chung
- Lam viec tren nhanh rieng: `git checkout -b <branch>`
- Chi commit cac file trong danh sach duoc giao (dung pathspec khi commit)
- Khong push thang len `main`, tao Pull Request.
- Neu can sua file de conflict (router tong, layout chung, config chung) thi phai thong nhat truoc.

Huong dan commit chi dung pham vi (vi du)
```bash
git add frontend/src/pages/auth/LoginPage.jsx frontend/src/api/auth.js
git commit -m "FE(auth): login page"
git push -u origin <branch>
```

Thu muc thanh vien
- `member-1-auth/` (Login/Logout/Forgot/Reset/Change password)
- `member-2-home-profile-userlist/` (Home + Profile + User list)
- `member-3-user-management/` (Add/Update/Active-Deactive user)
- `member-4-role-view-update/` (Role list + view permissions + update role info)
- `member-5-role-permissions-active-integration/` (Edit permissions + active/deactive role + integration files)
