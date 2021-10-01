const camelToSnakeCase = (string) => string.split(/(?=[A-Z])/).join('_').toLowerCase();

module.exports = {
  camelToSnakeCase
};
