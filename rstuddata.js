const { mStuRecords } = require('../modelfile/mstuddata');

//save student record
exports.saveStuRecord = function (req, res) {
    const oDupQry={ $and: [{ regno :{$regex:"^"+req.body.regno+"$",$options:'i'}},{ StFl: 'A' }]};     //duplicate check
    mStuRecords.find(oDupQry,{_id:1},function(err,docs){     
        if(err){
            res.status(500).send(err);
        } else if(docs.length==0){
            const oStudRec = new mStuRecords();
            oStudRec.regno = req.body.regno;
            oStudRec.name = req.body.name;
            oStudRec.gender = req.body.gender;
            oStudRec.phone = req.body.phone;
            oStudRec.dob = req.body.dob;
            oStudRec.cntry = req.body.cntry;
            oStudRec.email = req.body.email;
            oStudRec.pwd = req.body.pwd;
            //save stud records to db
            oStudRec.save(function (err,sucess) {
                if(err){
                    console.log(err);
                }else{
                    res.status(200).json({ code: "success"})
                }
        })} else {
            res.status(200).json({ code: "already exist"})
        }
    })   
}

//get StFl: 'A' student record from db
exports.getStuRecord=function (req, res) {
    const oFetchQry={ StFl: 'A' };
    mStuRecords.find(oFetchQry,{email:0,pwd:0},function (err, docs) {
        if (err) {
            res.status(500).send("Internal error");
        } else {
            res.status(200).send(docs);
        }
    })
}
//edit Stud Record
exports.editStuRecord=function (req, res) {
    const oEditQry={ $and: [{ _id :req.body._id},{ StFl: 'A' }]}
    mStuRecords.findOne(oEditQry,function (err, docs) {
        if (err) {
            res.status(500).send("Internal error");
        } else {
            res.status(200).send(docs);
        }
    })
}

//delete student record db, set StFl: "A" to "D"
exports.deleteStuRecord=function (req, res) {
    const oDelQry={ _id: req.body._id };
    mStuRecords.updateOne(oDelQry, { $set: { StFl: "D" } },function (err, docs) {
        if (err) {
            res.status(500).send("Internal error");
        } else {
            res.status(200).send("deleted");
        }        
    })    
}

//update student record
exports.updateStuRecord=function(req,res){
    const oUpdateQry={ $and: [{ "_id": { "$ne": req.body._id }},{ regno :{$regex:"^"+req.body.regno+"$",$options:'i'}},{ StFl: 'A' }]};   //duplicate check
    mStuRecords.find(oUpdateQry,{_id:1},function(err,docs){
        if(err){
            res.status(500).send(err);
        }
        else if(docs.length==0){
            const oUpdateSetQry={ $set: {
                regno : req.body.regno,
                name : req.body.name,
                gender : req.body.gender,
                phone : req.body.phone,
                dob : req.body.dob,
                cntry : req.body.cntry,
                email : req.body.email,
                pwd : req.body.pwd,
            }}
            mStuRecords.updateOne({ _id:req.body._id },oUpdateSetQry).then(()=>{
                res.status(200).send("updated");
            }).catch(function(){
                res.status(500).send("Internal error");
            }) 
        }
        else{
            res.status(200).json({ code: "already exist"});
        } 
    })
}
