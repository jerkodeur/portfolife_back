const connexion = require('../conf');

// CREATE
const addTechnoSql = 'INSERT INTO techno SET ?';

// READ
const getAllTechnosSql = 'SELECT * from techno';

const getTechnosByProjectSql = `
SELECT t.*
FROM techno t
JOIN project_techno pt
ON t.id = pt.techno_id
WHERE pt.project_id = ?
ORDER BY t.priority ASC`;

const getTechnoByIdSql = 'SELECT * FROM techno WHERE id = ?';

// HANDLE TECHNOS IN PROJECTS
const addTechnosToProjectSql = (addOne = false) => {
  const insertSql = addOne ? '(project_id, techno_id) VALUES (?, ?)' : 'VALUES ?';
  return ` INSERT INTO project_techno ${insertSql} `;
};

const removeTechnofromProjectSql = 'DELETE FROM project_techno WHERE project_id = ? AND techno_id = ?';

module.exports = {
  addOneTechnoToProject (projectId, technoId, callback) {
    connexion.query(addTechnosToProjectSql(true), [projectId, technoId], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  addTechnosToProject (technos, callback) {
    connexion.query(addTechnosToProjectSql(), [technos], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  createTechno (datas, callback) {
    connexion.query(addTechnoSql, datas, (err, result) => {
      if (err) return callback(err);
      return callback(null, result.insertId);
    });
  },

  findAllTechnos (callback) {
    connexion.query(getAllTechnosSql, (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  findTechnoById (id, callback) {
    connexion.query(getTechnoByIdSql, id, (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  findTechnosByProject (projectId, callback) {
    connexion.query(getTechnosByProjectSql, projectId, (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  removeTechnoFromProject (projectId, technoId, callback) {
    connexion.query(removeTechnofromProjectSql, [projectId, technoId], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  }
};
