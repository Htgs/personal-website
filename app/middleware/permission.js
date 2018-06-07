module.exports = async function(ctx, next) {
    console.log('middleware');
    console.log(ctx);
    next();
};
