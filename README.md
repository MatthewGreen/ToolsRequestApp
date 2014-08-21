# Webserver Using Node.js, Express and JADE

This application is a simple node.js web server that builds off the the External API project with a similar name. The application follows the logical flow and process of a field engineer who needs tools for a job. The process, serialized steps are outlined below.

## The Flow
The application has the following features and flow:

1. Add a Master Tool
2. Add a Tool to the Inventory
3. Add a Request for a tool from a field engineer
4. Add a Tool Request/Manage Tool Requests by a tool manager
5. Approval of Requests
6. Confirmation of Tool receipt and return of tools

## Routes

Typical to a Node.js application using Express, this application uses routes to serve pages in an orderly fashion which allows actions to happen as pages are served and redirected. The list of all routes (which match the features) are found below:

    app.use('/', routes);
    
    // Set of calls to manage Master Tools
    app.get('/addMasterTool', addMasterTool);
    app.get('/listMasterTool', listMasterTool);
    app.post('/createMasterTool', createMasterTool);
    app.post('/updateMasterTool', updateMasterTool);
    app.post('/deleteMasterTool', deleteMasterTool);
    
    // Set of calls to manage inventory
    app.get('/addInventory', addInventory);
    app.post('/createInventory', createInventory);
    app.get('/listInventory', listInventory);
    app.post('/deleteInventory', deleteInventory);
    app.post('/updateInventory', updateInventory);
    
    // Set of calls to request management
    app.get('/addRequest', addRequest);
    app.post('/createRequest', createRequest);
    app.get('/listRequest', listRequest);
    app.post('/deleteRequest', deleteRequest);
    app.post('/updateRequest', updateRequest);
    
    app.get('/addToolRequest', addToolRequest);
    app.post('/createToolRequest', createToolRequest);
    app.post('/updateToolRequest', updateToolRequest);
    
    app.get('/approveRequest', approveRequest);
    app.post('/approveTools', approveTools);
    
    app.get('/receivedTools', receivedTools);
    app.post('/updateReceivedTools', updateReceivedTools);
    
    // Set of calls for the reports
    app.get('/damageReport', damageReport);

The routes defined above match the functionality but it should be noted that only the **GET** requests will serve pages that the user can access and understand. **POST** requests are merely used to move form entries to the models/ engine which leverages Mongoose to create MongoDB documents and write them to the database.

## Reports

Currently the routes:

    /damageReport
    /maintNeeded

Give a report of all damaged tools and a report of all tools that need maintenance.

## To-Do

There is much left to be done with the application but in order of priority:

1. Style the application.
2. Make it responsive.
3. Add more reports.
4. Improve the flow.