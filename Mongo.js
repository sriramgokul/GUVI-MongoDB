// ****** Flow of MongoDB--Database->Collections->Document *****

// To show the list of databases --> show dbs
// To shift to any database --> use databasename
// To show the list of Collections in the database --> show collections
// To create a new Database --> use newDatabase Name
// Creating a Collection --> db.createCollection("students")
// cls--> cls command is used to clear screen the details

// *** Creating a document --> db.CollectionName.insertMany(BsonData)--insertMany is used for inserting multiple documents at a time in the collections.

db.students.insertMany([
    {
        name: "SRIRAM GOKUL",
        batch: "b51WD2",
        task: 99,
        status: "Experienced", 
    },
    {
        name: "Selvam",
        batch: "b51WD2",
        task: 95,
        status: "Experienced", 
    },
    {
        name: "DEEPAK",
        batch: "b51WD3",
        task: 85,
        status: "Fresher", 
    },
    {
        name: "RAJ",
        batch: "b51WD4",
        task: 90,
        status: "Fresher", 
    },
    {
        name: "DEEPAK",
        batch: "b51WD3",
        task: 85,
        status: "Fresher", 
    },
])

// db.students.insertOne()--> IT is used to insert only one document in the collections.
db.students.insertOne({
        name: "DEEPAK",
        batch: "b51WD3",
        task: 85,
        status: "Fresher", 
})


                        // *** To find the document

// Syntax- db.collectionName.operationValue()

db.students.find()

// ** To find the specific data in the document,we will use mongodb unique id

// Syntax -- db.collectionName.findOne({uniqueId})

db.students.findOne({_id: ObjectId('66f6515f43207b05f8c73c11')})

// ** To find/read a document using FILTER

// Syntax -- db.collectionName.find({object})
 db.students.find({name:"SRIRAM GOKUL"})



                        // ** To Update the document

// Syntax - db.collectionName.updateMany({filter},{$set:{filtervalue}})

db.students.updateMany({name:"SRIRAM GOKUL"},{$set:{task:100}})

// To update a unique document
// Syntax - db.collectionName.updateOne({filter},{$set,{filtervalue}})
 db.students.updateOne({_id: ObjectId('66f6515f43207b05f8c73c15')},{$set:{task:98, status:"EXPERIENCED"}})

// db.students.find({_id: ObjectId('66f6515f43207b05f8c73c11')})


                       //**To Delete a document

// Syntax - db.students.deleteoperation({filter})
db.students.deleteOne({_id: ObjectId('66f6515f43207b05f8c73c11')}) -- // To delete a single document

db.students.deleteMany({name:"SRIRAM GOKUL"})-- // To delete multiple documents


// **** Mentor 

db.mentors.insertMany([
    {
        name: "SRIRAM GOKUL",
        batch: "b51w2D",
    },
    {
        name:"SANJAY",
        batch: "b52w3E",
    },
    {
        name:"RAWAT",
        batch:"b53w4F",
    },
])

// To get All Data at a time in students collection

db.students.find().toArray()

// ****** To get all Students name at a time,we can use loop function in momgoDB

db.students.find().forEach(function(stud){print("StudentsName :" + stud.name)})
db.students.find().forEach(function(stud){print("Student Status :" + stud.status)})

// ** Aggregates

// ASC- to sort it in Ascending order
db.students.find().sort({task:1}).toArray()
db.students.find().sort({name:1}).toArray()

// Desc - to sort it in Descinding order
db.students.find().sort({task:-1}).toArray()
db.students.find().sort({name:-1}).toArray()

// Limit-- we can put a limit in showing the number of results

db.students.find().sort({name:1}).limit(5)

// Skip-- we can skip a document

db.students.find().limit(5).skip(1)

// Count -- to count a specific value or to count data

db.students.find({task:85}).count()

// $gt -- to find the greater than value

db.students.find({task:{$gt:85}})
db.students.find({task:{$gt:90}}).sort({task:1})

// $gte -- to find the greater than or equal value

db.students.find({task:{$gte:90}}).sort({task:1})

// $lt -- to find the lesser than value
db.students.find({task:{$lt:90}})

// $lte -- to find the lesser than or equal value

db.students.find({task:{$lte:85}})

// Not operator

db.students.find({task:{$not:{$gt:85,$lt:98}}}).sort({task:1})

// In operator--> will find out the in between value

db.students.find({task:{$gt:85,$lt:95}})

// OR operator

db.students.find({$or:[{task:85},{name:"RAJ"}]})

// Look Up Aggregate-- to compare two colletions

db.mentors.aggregate([
    {
        $lookup: {
            from: "students",
            localField: "batch",
            foreignField: "batch",
            as:"mentor_student_data"
        }
    }
])

// Match Aggregate-- stages of aggregation-- we can match & get overall sum from it 
db.students.aggregate([
    {$match: {batch: "b51WD4"}},
    {$group:{_id:"$name",totalNumberOfStudents:{$sum:"$task"}}}
])

db.students.aggregate([
    {$match: {status: "Fresher"}},
    {$group: {_id:"$name", totalNumberOfStudents: {$sum:"$task"}}}
])

// Removing of Duplicates

db.students.aggregate([
    {$group: {
        _id: "$name",
        duplicate: {$addToSet:"$_id"},
        TotalCount: {$sum:1}
    }}
])

// using Aggregates and forEach & Delete
db.students.aggregate([
    {$group: {
        _id: "$name",
        duplicate: {$addToSet:"$_id"},
        TotalCount : {$sum:1}
    }},
    {$match: {TotalCount: {$gt:6}}}
]).forEach((val)=>{
    val.duplicate.shift();
    db.students.deleteMany({_id:{$in:val.duplicate}})
})