
## System Monitor Dashboard 
In this web application SampleCompany will be able to see all the devices and the corresponding vulnerabilities
![Screenshot from 2024-07-22 20-06-09](https://github.com/user-attachments/assets/bd857b7a-50c3-4f88-9fa1-306189f5c418)

To run this application locally

Rename env.example to .env file and update the Backend API URL with your application backend API url
```bash
mv env.example .env
```

then update value of
DEVICE_MONITOR_SERVER_URL={your_backend_url}

Install depedency packages using the following command
```bash
npm install
```

To run the development server
```bash
npm run dev
```

To run the test suites 
```bash
npm run test
```

To run the build use the following command
```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

