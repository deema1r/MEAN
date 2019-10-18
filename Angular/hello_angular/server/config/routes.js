// var tasks = require("../controllers/tasks.js");

// module.exports = function(app){

//     app.get("/tasks", tasks.index)

//     app.get("/tasks/:id", tasks.details)

//     app.post("/tasks", tasks.addTask)

//     app.put("/tasks/:id", tasks.editTask)

//     app.delete("/tasks/:id", tasks.deleteTask)
// }

var mongoose = require('mongoose')
//var User = mongoose.model('Task', TaskSchema) 
var tasks = require('../controllers/tasks.js')

module.exports = (app) => {

    app.get('/tasks', tasks.index);
    
    app.get('/tasks/:id', tasks.view);
    
    app.post('/tasks', tasks.new);
    
    app.patch('/tasks/:id', tasks.update);

    app.delete('/tasks/:id', tasks.remove)
}