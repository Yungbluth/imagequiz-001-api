'use strict';

require('dotenv').config();
const { Pool } = require('pg');

// check whether this api is runing on production server or not
const isProduction = process.env.IS_PRODUCTION !== 'false';
console.log(process.env.IS_PRODUCTION);
console.log(`Is this the production environment? ${isProduction ? 'yes' : 'no'}`);


//postgresql://USER:PASSWORD@HOST:PORT/DATABASE
// postgresql://picture_dictionary_user:@localhost:5433/picture_dictionary
const postgreConnectionString =
 `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

console.log(postgreConnectionString);

const postgrePool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : postgreConnectionString,
  ssl: isProduction,
});

function getAllCategories() {
  return postgrePool.query('select * from category')
  .then(result => result.rows);
}

function getQuiz(categoryId) {
  return postgrePool.query('select * from quiz where category_id = $1', [categoryId])
  .then(result => result.rows);
}

function getQuestionId(quizId) {
  return postgrePool.query('select * from quiz_question where quiz_id = $1', [quizId])
  .then(result => result.rows);
}

function getQuestion(questionId) {
  return postgrePool.query('select * from question where id = $1', [questionId])
  .then(result => result.rows);
}
/**

function saveTheme(name) {
   return postgrePool.query('insert into theme(name) values($1) returning id', [name])
   .then(result => result.rows[0].id);
}

function saveImage(themeId) {
  let maxId = (new Date()).getTime().toString(36);
  getLastImageId(themeId).then(x => {if(x[0].maxId) maxId += x[0].maxId;});
  let imageName = maxId + "-" + themeId + ".png";
   return postgrePool.query('insert into image(name, themeid) values($1, $2) returning *', [imageName, themeId])
   .then(result => result.rows[0]);
}

function getLastImageId(themeId) {
  return postgrePool.query('select max(id) as maxId from image where themeid = $1', [themeId])
  .then(result => {console.log(result.rows[0]); return result.rows});
}



function updateLabel(name, id) {
   return postgrePool.query(`update word set name = $1 where id = $2 returning *`, [name, id])
   .then(result => result.rows[0].id);
}



function getAllThemes() {
  return postgrePool.query('select * from theme')
  .then(result => result.rows);
}



function getImageIds(themeId) {
  return postgrePool.query('select * from image where themeid = $1', [themeId])
  .then(result => result.rows);
}

function getImageName(imageId) {
  return postgrePool.query('select name from image where id = $1', [imageId])
  .then(result => result.rows[0].name);
}

function getLabels(imageId) {
  //DONE: get all the words (lables) for the given imageId
  return postgrePool.query('select * from word where imageid = $1', [imageId])
  .then(result => result.rows);

}

function getLabel(imageId, x, y) {
  //DONE: return the related word record
  // you can use the following sql statement:
  //  select  * from word where imageid = $1 and abs(x - $2) < 7 and abs(y - $3) < 7
  return postgrePool.query('select * from word where imageid = $1 and abs(x - $2) < 7 and abs(y - $3) < 7', [imageId, x, y])
  .then(result => result.rows[0]);
}

function saveLabel(name, x, y, number, imageId) {
   //DONE: insert a new record in the word table and return its id
   //save the word (name, x, y, number, imageid)
   //and return the id of the inserted word
   return postgrePool.query('insert into image(name, x, y, number, imageid) values($1, $2, $3, $4, $5) returning *', [name, x, y, number, imageId])
   .then(result => result.rows[0].id);
}

function saveImageData(imageId, imageData) {
  return postgrePool.query('update image set data = $1 where id = $2', [imageData, imageId])
  .then(result => {
    if(result.rows[0]) {
      return result.rows[0].id;
    } else {
      throw Error('Image with the given id was not found.');
    }
  });
}

function getImageData(imageId) {
  return postgrePool.query('select data from image where id = $1', [imageId])
  .then(result => {
    if(result.rows[0]) {
      return result.rows[0].id;
    } else {
      throw Error('Image with the given id was not found.');
    }
  });
}
*/
module.exports = { getAllCategories, getQuiz, getQuestionId, getQuestion }
