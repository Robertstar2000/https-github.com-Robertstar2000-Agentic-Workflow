const Service = require('node-windows').Service;
const path = require('path');

// Create a new service object
const svc = new Service({
    name: 'Tallman Workflow Backend',
    description: 'Super Agentic Workflow System Backend - Ollama Only',
    script: path.join(__dirname, 'dist', 'index.js'),
    nodeOptions: [
        '--harmony',
        '--max_old_space_size=4096'
    ],
    env: [
        {
            name: "NODE_ENV",
            value: "production"
        },
        {
            name: "PORT",
            value: "3001"
        }
    ],
    workingDirectory: __dirname
});

// Listen for the "install" event
svc.on('install', function () {
    console.log('Service installed successfully!');
    console.log('Starting service...');
    svc.start();
});

// Listen for the "start" event
svc.on('start', function () {
    console.log('Service started successfully!');
    console.log('Backend is now running on port 3001');
});

// Listen for errors
svc.on('error', function (err) {
    console.error('Service error:', err);
});

// Install the service
console.log('Installing Tallman Workflow Backend service...');
svc.install();
