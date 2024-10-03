// ****** Flow of MongoDB--Database->Collections->Document *****

// To show the list of databases --> show dbs
// To shift to any database --> use databasename
// To show the list of Collections in the database --> show collections
// To create a new Database --> use newDatabase Name
// Creating a Collection --> db.createCollection("students")
// cls--> cls command is used to clear screen the details

// Note: You cannot use both 0 and 1 in the same object. The only exception is the _id field. You should either specify the fields you would like to include or the fields you would like to exclude.

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

// MongoDB Query Operators
// There are many query operators that can be used to compare and reference document fields.

// Comparison
// The following operators can be used in queries to compare values:

// $eq: Values are equal
// $ne: Values are not equal
// $gt: Value is greater than another value
// $gte: Value is greater than or equal to another value
// $lt: Value is less than another value
// $lte: Value is less than or equal to another value
// $in: Value is matched within an array

// Logical
// The following operators can logically compare multiple queries.

// $and: Returns documents where both queries match
// $or: Returns documents where either query matches
// $nor: Returns documents where both queries fail to match
// $not: Returns documents where the query does not match

// Evaluation
// The following operators assist in evaluating documents.

// $regex: Allows the use of regular expressions when evaluating field values
// $text: Performs a text search
// $where: Uses a JavaScript expression to match documents

// MongoDB Update Operators
// There are many update operators that can be used during document updates.

// Fields
// The following operators can be used to update fields:

// $currentDate: Sets the field value to the current date
// $inc: Increments the field value
// $rename: Renames the field
// $set: Sets the value of a field
// $unset: Removes the field from the document

// Array
// The following operators assist with updating arrays.

// $addToSet: Adds distinct elements to an array
// $pop: Removes the first or last element of an array
// $pull: Removes all elements from an array that match the query
// $push: Adds an element to an array


// Aggregation $lookup

// This aggregation stage performs a left outer join to a collection in the same database.

// There are four required fields:

// from: The collection to use for lookup in the same database
// localField: The field in the primary collection that can be used as a unique identifier in the from collection.
// foreignField: The field in the from collection that can be used as a unique identifier in the primary collection.
// as: The name of the new field that will contain the matching documents from the from collection.

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

// Aggregation $match
// This aggregation stage behaves like a find. It will filter documents that match the query provided.

// Aggregation $group
// This aggregation stage groups documents by the unique _id expression provided.

// Don't confuse this _id expression with the _id ObjectId provided to each document.

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