'use strict';

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
    const articles_categories = [
      {
        name: '随笔',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '趣事',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '文章',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ];
    return new Promise(resolve => {
      queryInterface.bulkInsert('articles_categories', articles_categories, {})
        .then(() => {
          queryInterface.sequelize.query(`SELECT * FROM articles_categories;`)
            .then(result => {
              let categories = result[0];
              let posts = [];
              for (let i = 1; i < 31; i++) {
                categories.forEach((category, idx) => {
                  posts.push({
                    user_id: 1,
                    category_id: category.id,
                    title: `文章posts${i}-${category.name}`,
                    keywords: `随笔`,
                    content: '给日数时化周作少情者美制论。到先争劳今已美变江以好较正新深。族国般建难出就金感基酸转。任部四那响成族利标铁导术一或已于。省元切世权往着路积会其区素白思断。加把他位间存定国工取除许热规先法方给日数时化周作少情者美制论。到先争劳今已美变江以好较正新深。族国般建难出就金感基酸转。任部四那响成族利标铁导术一或已于。省元切世权往着路积会其区素白思断。加把他位间存定国工取除许热规先法方。给日数时化周作少情者美制论。到先争劳今已美变江以好较正新深。族国般建难出就金感基酸转。任部四那响成族利标铁导术一或已于。省元切世权往着路积会其区素白思断。加把他位间存定国工取除许热规先法方给日数时化周作少情者美制论。到先争劳今已美变江以好较正新深。族国般建难出就金感基酸转。任部四那响成族利标铁导术一或已于。省元切世权往着路积会其区素白思断。加把他位间存定国工取除许热规先法方。给日数时化周作少情者美制论。到先争劳今已美变江以好较正新深。族国般建难出就金感基酸转。任部四那响成族利标铁导术一或已于。省元切世权往着路积会其区素白思断。加把他位间存定国工取除许热规先法方给日数时化周作少情者美制论。到先争劳今已美变江以好较正新深。族国般建难出就金感基酸转。任部四那响成族利标铁导术一或已于。省元切世权往着路积会其区素白思断。加把他位间存定国工取除许热规先法方。给日数时化周作少情者美制论。到先争劳今已美变江以好较正新深。族国般建难出就金感基酸转。任部四那响成族利标铁导术一或已于。省元切世权往着路积会其区素白思断。加把他位间存定国工取除许热规先法方给日数时化周作少情者美制论。到先争劳今已美变江以好较正新深。族国般建难出就金感基酸转。任部四那响成族利标铁导术一或已于。省元切世权往着路积会其区素白思断。加把他位间存定国工取除许热规先法方。',
                    created_at: `2018-08-${i > 10 ? i : '0' + i} 10:${i > 10 ? i : '0' + i}:0${idx}`,
                    updated_at: `2018-08-${i > 10 ? i : '0' + i} 10:${i > 10 ? i : '0' + i}:0${idx}`,
                  })
                });
              }
              queryInterface.bulkInsert('articles', posts, {})
                .then(() => {
                  resolve();
                });
            });
        })
        .catch(err => {
          throw err;
        })
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    // return queryInterface.bulkDelete('articles', null, {});
    // return queryInterface.bulkDelete('articles_categories', null, {});
  }
};
