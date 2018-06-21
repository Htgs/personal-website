const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Menu = require('../../models').menu;

module.exports = {
    getMenus: async (ctx, next) => {
        console.log(ctx.params.type);
        ctx.body = await Menu.findAll({
            where: {
                pid: null,
                name: {
                    [Op.like]: `%${ctx.params.type}%`,
                },
            },
            include: [
                {
                    model: Menu,
                },
            ],
        });
    },
}
