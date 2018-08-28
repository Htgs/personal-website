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
    let now = new Date();
    const menus = [
      {
        name: 'Admin-User',
        display_name: '用户管理',
        resource: '/admin/user',
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Admin-Article',
        display_name: '文章管理',
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Admin-System',
        display_name: '系统管理',
        created_at: now,
        updated_at: now,
      },
    ];
    const childrenMenus = {
      ArticleMenus: [
        {
          name: 'Article-Category',
          display_name: '文章分类',
          resource: '/admin/article-category',
        },
        {
          name: 'Article',
          display_name: '文章列表',
          resource: '/admin/article',
        },
        {
          name: 'Comment',
          display_name: '文章评论',
          resource: '/admin/comment',
        },
      ],
      SystemMenus: [
        {
          name: 'User-Info',
          display_name: '用户信息',
          resource: '/admin/user-info',
        },
        {
          name: 'Alog',
          display_name: '日志管理',
          resource: '/admin/alog',
        },
        // {
        //   name: 'Permission',
        //   display_name: '权限设置',
        //   resource: '/admin/permission',
        // },
      ],
    };
    return new Promise(resolve => {
      // 写入父级菜单数据
      queryInterface.bulkInsert('menus', menus, {})
        .then(() => {
          // 查询已经插入的父级菜单数据
          queryInterface.sequelize.query(`SELECT * FROM menus WHERE ISNULL(pid);`)
            .then(result => {
              let parentMenus = result[0];
              let childrenMenusData = [];
              parentMenus.forEach(parentMenu => { // 根据父级菜单获取每个子级菜单
                let type = parentMenu.name.split('-')[1];
                if (childrenMenus[`${type}Menus`]) {// 存在自己菜单才会添加数据
                  childrenMenus[`${type}Menus`].forEach(childrenMenu => {
                    childrenMenusData.push({
                      pid: parentMenu.id,
                      name: `${parentMenu.name}-${childrenMenu.name}`,
                      display_name: childrenMenu.display_name,
                      resource: childrenMenu.resource,
                      created_at: now,
                      updated_at: now,
                    });
                  });
                }
              });
              queryInterface.bulkInsert('menus', childrenMenusData, {})
                .then(() => {
                  resolve();
                });
            });
        })
        .catch(err => {
          throw err;
        });
    });
    //   {
    //     display_name: '系统管理',
    //     resource: 'system',
    //     icon: 'el-icon-setting',
    //     children: [
    //       {
    //         display_name: '用户信息',
    //         resource: '/admin/user-info',
    //       },
    //       {
    //         display_name: '日志管理',
    //         resource: '/admin/logs',
    //       },
    //       // {
    //       // 	display_name: '权限设置',
    //       // 	resource: '/admin/permission',
    //       // },
    //     ],
    //   },
    // ]
  },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('menus', null, {});
  }
};
