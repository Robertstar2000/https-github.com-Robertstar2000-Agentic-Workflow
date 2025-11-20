const Service = require('node-windows').Service;
const path = require('path');

// Create a new service object
const svc = new Service({
    name: 'Tallman Workflow Backend',
    script: path.join(__dirname, 'dist', 'index.js')
});

// Listen for the "uninstall" event
svc.on('uninstall', function () {
    console.log('Service uninstalled successfully!');
    console.log('The backend service has been removed.');
});

// Uninstall the service
console.log('Uninstalling Tallman Workflow Backend service...');
svc.uninstall();
