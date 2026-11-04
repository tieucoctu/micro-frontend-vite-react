# Micro-Frontend with Vite, React & Module Federation

Dự án Micro-Frontend hoàn chỉnh sử dụng **Vite**, **React 18** và **Module Federation** (`@originjs/vite-plugin-federation`) quản lý theo mô hình Monorepo (Yarn Workspaces).

---

## 🏗️ Cấu trúc thư mục (Monorepo)

```text
micro-frontend-vite-react/
├── package.json               # Root workspace scripts & orchestrations
├── README.md
└── apps/
    ├── host/                  # Shell / Container App (Port: 5000)
    │   ├── index.html
    │   ├── package.json
    │   ├── vite.config.js     # Cấu hình remotes: { remoteApp: '...' }
    │   └── src/
    │       ├── App.jsx        # Import Suspense / lazy từ remoteApp/*
    │       ├── index.css
    │       └── main.jsx
    └── remote/                # Micro-Frontend Sub-app (Port: 5001)
        ├── index.html
        ├── package.json
        ├── vite.config.js     # Cấu hình exposes: { './RemoteWidget': ... }
        └── src/
            ├── components/
            │   ├── RemoteButton.jsx
            │   └── RemoteWidget.jsx
            ├── App.jsx        # Chạy độc lập (Standalone mode)
            ├── index.css
            └── main.jsx
```

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy

### 1. Cài đặt dependencies (tại thư mục gốc)

```bash
yarn install
```

### 2. Build dự án

Vì Module Federation của Vite chia sẻ qua bundle `remoteEntry.js`:

```bash
yarn build
```

### 3. Chạy cả 2 ứng dụng cùng lúc

```bash
yarn preview
```

Hoặc chạy dev:

```bash
yarn dev
```

- **Host App (Shell)**: [http://localhost:5000](http://localhost:5000)
- **Remote App (Sub-app)**: [http://localhost:5001](http://localhost:5001)
