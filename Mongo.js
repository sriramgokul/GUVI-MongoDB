// ****** Flow of MongoDB--Database->Collections->Document *****

// To show the list of databases --> show dbs
// To shift to any database --> use databasename
// To show the list of Collections in the database --> show collections
// To create a new Database --> use newDatabase Name
// Creating a Collection --> db.createCollection("students")

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

// db.students.find()

// ** To find the specific data in the document,we will use mongodb unique id

// Syntax -- db.collectionName.findOne({uniqueId})

// db.students.findOne({_id: ObjectId('66f6515f43207b05f8c73c11')})

// ** To find/read a document using FILTER

// Syntax -- db.collectionName.find({object})
 //db.students.find({name:"SRIRAM GOKUL"})



                        // ** To Update the document

// Syntax - db.collectionName.updateMany({filter},{$set:{filtervalue}})

// db.students.updateMany({name:"SRIRAM GOKUL"},{$set:{task:100}})

// To update a unique document
// Syntax - db.collectionName.updateOne({filter},{$set,{filtervalue}})
 db.students.updateOne({_id: ObjectId('66f6515f43207b05f8c73c15')},{$set:{task:98, status:"EXPERIENCED"}})

// db.students.find({_id: ObjectId('66f6515f43207b05f8c73c11')})


                       //**To Delete a document

// Syntax - db.students.deleteoperation({filter})
// db.students.deleteOne({_id: ObjectId('66f6515f43207b05f8c73c11')}) -- To delete a single document

// db.students.deleteMany({name:"SRIRAM GOKUL"})-- To delete multiple documents