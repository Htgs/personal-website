'use strict';
function now() {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users', [{
      name: 'admin',
      email: 'admin@qq.com',
      password: '123456',
      niname: 'niko',
      realname: '尼克',
      gender: 0,
      created_at: now(),
      updated_at: now(),
    }], {});
    // return queryInterface.bulkInsert('articles_categories', [{
    //   name: 'test',
    //   created_at: now(),
    //   updated_at: now(),
    // }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
