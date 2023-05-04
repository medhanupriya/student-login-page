const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = 8301;
const mongoose = require('mongoose');
const rstuddata=require('../studentform/src/routefile/rstuddata');
const cors=require("cors");

// connect to local db
mongoose.connect('mongodb://localhost:27017/studlist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors());

// save student records
app.post('/save-studata',rstuddata.saveStuRecord);

//get students record from db
app.post('/get-studata', rstuddata.getStuRecord);

//delete student record
app.post('/del-studata',rstuddata.deleteStuRecord);

//update student record
app.post('/update-studata',rstuddata.updateStuRecord);

//edit student record
app.post('/edit-studata',rstuddata.editStuRecord);

// listen port        
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});


