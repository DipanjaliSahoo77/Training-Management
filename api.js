const mongoClient = require("mongodb").MongoClient;
const express = require("express");
const cors = require("cors");

const app = express();
const connectionString = "mongodb://127.0.0.1:27017";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Trainers API 


app.get("/get-trainer", (req, res) => {
    mongoClient.connect(connectionString).then(client_obj => {
        const database = client_obj.db("Training-Management-System");
        database.collection("Trainers").find({}).toArray().then(documents => {
            res.send(documents);
        });
    }).catch(error => res.status(500).json({ error: error.message }));
});


app.get("/get-trainer/:id", (req, res) => {
    mongoClient.connect(connectionString).then(client_obj => {
        const database = client_obj.db("Training-Management-System");
        database.collection("Trainers").findOne({ TrainerId: parseInt(req.params.id) }).then(document => {
            if (document) {
                res.send(document);
            } else {
                res.status(404).json({ message: "Trainer not found" });
            }
        });
    }).catch(error => res.status(500).json({ error: error.message }));
});


app.post("/add-trainer", (req, res) => {
    mongoClient.connect(connectionString).then(client_obj => {
        const database = client_obj.db("Training-Management-System");

        const trainer = {
            TrainerId: parseInt(req.body.TrainerId),
            TrainerName: req.body.TrainerName,
            Mobile: req.body.Mobile,
            Subject: req.body.Subject,
            Salary: req.body.Salary
        };

        database.collection("Trainers").insertOne(trainer).then(() => {
            res.json({ message: "Trainer Registered" });
        });
    }).catch(error => res.status(500).json({ error: error.message }));
});

app.put("/edit-trainer/:id", (req, res) => {
    mongoClient.connect(connectionString).then(client_obj => {
        const database = client_obj.db("Training-Management-System");

        database.collection("Trainers").updateOne(
            { TrainerId: parseInt(req.params.id) },
            { $set: { TrainerName: req.body.TrainerName, Number: req.body.Number, Subject: req.body.Subject, Salary: req.body.Salary } }
        ).then(result => {
            if (result.modifiedCount === 0) {
                res.status(404).json({ message: "Trainer not found" });
            } else {
                res.json({ message: "Trainer Updated Successfully" });
            }
        });
    }).catch(error => res.status(500).json({ error: error.message }));
});

app.delete("/delete-trainer/:id", (req, res) => {
    mongoClient.connect(connectionString).then(client_obj => {
        const database = client_obj.db("Training-Management-System");
        database.collection("Trainers").deleteOne({ TrainerId: parseInt(req.params.id) }).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).json({ message: "Trainer not found" });
            } else {
                res.json({ message: "Trainer Deleted Successfully" });
            }
        });
    }).catch(error => res.status(500).json({ error: error.message }));
});

//  Trainee API 


app.get("/get-trainee", (req, res) => {
    mongoClient.connect(connectionString).then(client_obj => {
        const database = client_obj.db("Training-Management-System");
        database.collection("Trainee").find({}).toArray().then(documents => {
            res.send(documents);
        });
    }).catch(error => res.status(500).json({ error: error.message }));
});


app.get("/get-trainee/:id", (req, res) => {
    mongoClient.connect(connectionString).then(client_obj => {
        const database = client_obj.db("Training-Management-System");
        database.collection("Trainee").findOne({ TraineeId: parseInt(req.params.id) }).then(document => {
            if (document) {
                res.send(document);
            } else {
                res.status(404).json({ message: "Trainee not found" });
            }
        });
    }).catch(error => res.status(500).json({ error: error.message }));
});


app.post("/add-trainee", (req, res) => {
    mongoClient.connect(connectionString).then(client_obj => {
        const database = client_obj.db("Training-Management-System");

        const trainee = {
            TraineeId: parseInt(req.body.TraineeId),
            TraineeName: req.body.TraineeName,
            Class: req.body.Class,
            Number: parseInt(req.body.Number),
            Age: parseInt(req.body.Age),
            Dob: req.body.Dob,
            Gender: req.body.Gender
        };

        database.collection("Trainee").insertOne(trainee).then(() => {
            res.json({ message: "Trainee Registered" });
        });
    }).catch(error => res.status(500).json({ error: error.message }));
});


app.put("/edit-trainee/:id", (req, res) => {
    mongoClient.connect(connectionString).then(client_obj => {
        const database = client_obj.db("Training-Management-System");

        database.collection("Trainee").updateOne(
            { TraineeId: parseInt(req.params.id) },
            { $set: { TraineeName: req.body.TraineeName, Class: req.body.Class, Number: req.body.Number, Age: req.body.Age, Dob: req.body.Dob, Gender: req.body.Gender } }
        ).then(result => {
            if (result.modifiedCount === 0) {
                res.status(404).json({ message: "Trainee not found" });
            } else {
                res.json({ message: "Trainee Updated Successfully" });
            }
        });
    }).catch(error => res.status(500).json({ error: error.message }));
});


app.delete("/delete-trainee/:id", (req, res) => {
    mongoClient.connect(connectionString).then(client_obj => {
        const database = client_obj.db("Training-Management-System");
        database.collection("Trainee").deleteOne({ TraineeId: parseInt(req.params.id) }).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).json({ message: "Trainee not found" });
            } else {
                res.json({ message: "Trainee Deleted Successfully" });
            }
        });
    }).catch(error => res.status(500).json({ error: error.message }));
});

app.listen(8000, () => {
    console.log("Server Started at http://127.0.0.1:8000");
});
