import React from 'react';
import SQLite from 'react-native-sqlite-storage';

export default class SQLiteScreen extends React.Component {
  constructor() {
    super();
    SQLite.DEBUG = true;
  }

  /**
   * Execute sql queries
   *
   * @param sql
   * @param params
   *
   * @returns {resolve} results
   */
  ExecuteQuery = (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.transaction(trans => {
        trans.executeSql(
          sql,
          params,
          (trans, results) => {
            resolve(results);
          },
          error => {
            reject(error);
          },
        );
      });
    });

  // Create Table
  async CreateTable() {
    let user_list = await this.ExecuteQuery(
      'CREATE TABLE IF NOT EXISTS user_list (user_id INTEGER NOT NULL,' +
        ' user_name VARCHAR(20) NOT NULL UNIQUE,' +
        ' user_password NOT NULL,' +
        ' PRIMARY KEY(user_id AUTOINCREMENT))',
      [],
    );
    let book_list = await this.ExecuteQuery(
      'CREATE TABLE IF NOT EXISTS book_list (book_id INTEGER NOT NULL,' +
        ' book_title VARCHAR(100) NOT NULL,' +
        ' categori VARCHAR(20),' +
        ' book_rate INTEGER,' +
        ' PRIMARY KEY(book_id AUTOINCREMENT))',
      [],
    );
    console.log('Tạo Bảng Thanh Cong');
  }

  //InsertUser
  async InsertUserQuery(name, pass) {
    const query =
      'INSERT INTO user_list (user_name, user_password) VALUES (?,?)';
    console.log(query);
    let singleInsert = await this.ExecuteQuery(query, [name, pass]);
    console.log('Them User Thanh Cong');
  }

  //InsertBook
  async InsertBookQuery(title, category, rating) {
    const query =
      'INSERT INTO book_list (book_title, categori, book_rate) VALUES (?,?,?)';
    console.log(query);
    let singleInsert = await this.ExecuteQuery(query, [
      title,
      category,
      rating,
    ]);
    console.log('Them Sach Thanh Cong');
  }

  async SelectAllUser() {
    let selectQuery = await this.ExecuteQuery('SELECT * FROM user_list', []);
    var rows = selectQuery.rows;
    for (let i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      console.log(item);
    }
  }

  async SelectUser(inputName, inputPassword) {
    let userToken = '';
    let query =
      'SELECT * FROM user_list where user_name = ? and user_password = ?';
    let selectQuery = await this.ExecuteQuery(query, [
      inputName,
      inputPassword,
    ]);

    if (selectQuery.rows.length == 1) {
      // console.log(selectQuery.rows.item(0));
      let user = selectQuery.rows.item(0);
      // console.log(`USER NAME: ${user.user_name}`);
      return true;
    } else {
      return false;
    }
  }

  async SelectAllBook() {
    let selectQuery = await this.ExecuteQuery('SELECT * FROM book_list', []);
    var rows = selectQuery.rows;

    for (let i = 0; i < rows.length; i++) {
      let item = rows.item(i);
      console.log(item);
    }

  }
}
// let singleInsert = await this.ExecuteQuery
// ("INSERT INTO users (id, first_name, last_name, is_deleted)
// VALUES ( ?, ?, ?, ?)", [1, 'Infinite', 'Ability', 0]);
