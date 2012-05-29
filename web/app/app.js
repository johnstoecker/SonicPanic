// Enable dynamic dependency to be able find files at appropriate locations automatically
Ext.Loader.setConfig({
    enabled: true
});

// Main application entry point
Ext.application({
    name: 'SonicPanic', // Name of the application. Modules should use unique module name
    
    views: ['Main', 'Menu','Grid', 'Cell'], // List of Views for dynamic loading
    controllers: ['Session'] // List of Controllers for dynamic loading
});