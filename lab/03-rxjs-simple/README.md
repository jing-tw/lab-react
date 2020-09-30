# Install
```bash
curl -L https://git.io/n-install | bash -s -- -y 
npm install -savedev typescript
npm install -savedev tslint
npm install @types/rx
```

# Compile
```bash
npm run build

or 

tsc
```

# Run
```bash
npm start

or 

node index.js
```

# Tree
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── index.js
│   ├── index.js.by_hand
│   └── index.ts
└── tsconfig.json


# Uninstall
```bash
npm run clean
```