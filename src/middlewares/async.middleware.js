/**
 * @function asyncHandler
 * @param {*} func - the express route handler function
 * @returns {func}
 */

module.exports = (func) => (req, res, next) => Promise.resolve(func(req, res, next).catch(next));
