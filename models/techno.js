const connexion = require('../conf');

const addTechnosToProjectSql = (addOne = false) => {
  const insertSql = addOne ? '(project_id, techno_id) VALUES (?, ?)' : 'SET ?';
  return ` INSERT INTO project_techno ${insertSql} `;
};

const getTechnosByProjectSql = `
    SELECT t.*
    FROM techno t
    JOIN project_techno pt
    ON t.id = pt.techno_id
    WHERE pt.project_id = ?
    ORDER BY t.priority ASC`
;

const removeTechnofromProjectSql = `
  DELETE FROM project_techno WHERE project_id = ? AND techno_id = ?
`;

module.exports = {
  findTechnosByProject (projectId, callback) {
    connexion.query(getTechnosByProjectSql, projectId, (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  addOneTechnoToProject (projectId, technoId, callback) {
    connexion.query(addTechnosToProjectSql(true), [projectId, technoId], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  addTechnosToProject (technos, callback) {
    connexion.query(addTechnosToProjectSql, [...technos], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  removeOneTechnoFromProject (projectId, technoId, callback) {
    connexion.query(removeTechnofromProjectSql, [projectId, technoId], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  }
};
