// var mongoose = require('mongoose')
// var Task = mongoose.model('Task') // We are retrieving this Schema from our Models, named 'Panda'

// module.exports = {
//     index: (request, response) => {
//         Task.find({}, (err, tasks) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 response.json({message: "Success!", tasks: tasks});
//             }
//         });
//     },

//     new: (request, response) => {
//         var tasks = new Task({ 
//             title: request.body.title, 
//             description: request.body.description,
//         });
//         tasks.save((err, tasks) => {
//             if (err) {
//                 console.log('Something went wrong', err);
//                 for (var key in err.errors) {
//                     request.flash('registration', err.errors[key].message);
//                 }
//                 response.json({message: 'There was an error', error: err});
//             }
//             else {
//                 console.log('Successfully added a user!');
//                 response.json({ tasks: tasks})
//             }
//         });
//     },

//     view: (request, response) => {
//         console.log("The task id requested is:", request.params.id);
//         Task.findOne({ _id: request.params.id }, (err, task) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log(task);
//                 response.json({ task: task });
//             }
//         });
//     },

//     update: (request, response) => {
//         console.log('The task id requested is:', request.params.id);
//         Task.update({ _id: request.params.id }, { 
//             title: request.body.title, 
//             description: request.body.description, 
//             completed: request.body.completed }, (err) => {
//             if (err) {
//                 console.log('There was an error', err);
//             }
//             else {
//                 console.log('Successfully edited a task!')
//                 response.json()
//             }
//         });
//     },

//     remove: (request, response) => {
//         console.log('The task id requested is:', request.params.id);
//         Task.remove({ _id: request.params.id }, (err) => {
//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 console.log('Task has successfully been removed!')
//                 response.json({message: 'Task has been removed'})
//             }
//         });
//     }

// }


var mongoose = require("mongoose");
var Task = mongoose.model("Task");

module.exports = {

    index: function(req, res){
        Task.find({}, function(err, task){
            if(err){
                res.json({message: "Error!", error: err});
            }
            else{
                res.json({message: "Success!", task: task});
            }
        })
    },

    view: function(req, res){
        let id = req.params.id;
        Task.find({_id: id},function(err, task){
            if(err){
                res.json({message: "Error!", error: err});
            }
            else{
                res.json({message: "Success!", task: task});
            }
        })
    },

    new: function(req, res){
        Task.create({title: req.body.title, description: req.body.description, completed: req.body.completed}, function(err, task){
            if(err){
                res.json({message: "Error!", error: err});
            }
            else{
                res.json({message: "Success!", added: true});
            }
        })
    },

    update: function(req, res){
        let id = req.params.id;
        Task.findById(id, function(err, task){
            if(err){
                res.json({message: "Error!", error: err});
            }
            else{
                if(req.body.title){
                    task.title = req.body.title;
                }
                if(req.body.description){
                    task.description = req.body.description;
                }
                if(req.params.completed){
                    task.completed = req.body.completed;
            }
            task.save(function(err){
                if(err){
                    res.json({message: "Error!", error: err});
                }
                else{
                    res.json({message: "Success!", task: task})
                }
            })
            }
        })
    },

    remove: function(req, res){
        let id = req.params.id;
        Task.remove({_id: id},function(err){
            if(err){
                res.json({message: "Error!", error: err});
            }
            else{
                res.json({message: "Success!", removed: true});
            }
        })
    }
}