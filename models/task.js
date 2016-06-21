'use strict'

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
let dbpath = path.join(__dirname, '../data/database.db');
const db = new sqlite3.Database(dbpath);
const uuid =require('uuid');

db.run(`CREATE TABLE IF NOT EXISTS tasks(
        id text,
        description text,
        duedate text,
        done int
  );`);

exports.getAll = cb =>{
  db.all(`select * from tasks;`, cb);
}

exports.create = (task, cb)=>{

  if(!task.description || !task.description ||!task.duedate){
    return cb({error: "Missing required field"});
  }
  db.run(`insert into tasks values (?, ?, ?, ?)`, uuid(), task.description, task.duedate, task.done, cb);

}

exports.delete = (id, cb)=>{
  db.run(`delete from tasks where id = "${id}"`, cb);
}

exports.update = (id, task, cb)=>{
    if(task.description)
       db.run(`UPDATE tasks SET description = "${task.description}'" WHERE id = "${id}"`, cb); 
    if(task.duedate)
       db.run(`update tasks set duedate = "${task.duedate}" where id = "${id}"`, cb); 
    if(task.done)
       db.run(`update tasks set done = "${task.done}" where id = "${id}"`, cb); 
}  











