require('dotenv').config();

let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person;

const personSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

 Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person_info = new Person({name: 'Ajibade', age: 28,  favoriteFoods: ["jollof rice", "suya"]})
  person_info.save(function(err, data) {
    if (err) {
      return done(er);

    } else {
       done(null, data);

    }
  
});
};

const createManyPeople = (arrayOfPeople, done) => {
   Person.create(arrayOfPeople, (err, data) => {

    if (err) {
      return done(er);

    } else {
       done(null, data);

    }

   });

  

};

const findPeopleByName = (personName, done) => {
Person.find({name: personName }, (err, data) => {

   if (err) {
      return done(er);

    } else {
       done(null, data);

    }

})

};

const findOneByFood = (food, done) => {

  Person.findOne({favoriteFoods: food }, (err, data) => {

   if (err) {
      return done(er);

    } else {
       done(null, data);

    }

})
  


};

const findPersonById = (personId, done) => {


  Person.findById({_id: personId }, (err, data) => {

   if (err) {
      return done(err);

    } else {
       done(null, data);

    }

})
  

};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  /* 1st arg what to change, second arg change made, 3rd arg to return new data */
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};



const removeById = (personId, done) => {
  
    Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

   Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

   
  Person.find({ favoriteFoods: foodToSearch }) // Find people who like the specified food
    .sort({ name: 1 }) // Sort by name in ascending order
    .limit(2) // Limit the results to 2 documents
    .select('-age') // Exclude the 'age' field
    .exec((err, data) => { // Execute the query and pass the callback
      if (err) {
        return done(err);
      }
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
