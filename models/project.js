const connexion = require('../conf');

// CREATE
const addProjectSql = (keys) => `INSERT INTO project (${keys}) VALUES (?)`;

// READ
const getFullProjectSql = (findOne = false) => {
  const where = findOne ? 'where p.id = ?' : '';
  return `
    SELECT
    p.*,
    t.name,t.image_name, t.id AS tid
    FROM project p
    LEFT JOIN project_techno pt ON pt.project_id=p.id
    LEFT JOIN techno t ON pt.techno_id=t.id
    ${where}
    GROUP BY p.id, tid
    ORDER BY p.priority ASC
    `;
};

// UPDATE
const updateOneByIdSql = (key) => `UPDATE project SET ${key} = ? WHERE id = ?`;

// DELETE
const deleteFullProjectSql = 'DELETE FROM project WHERE id = ?';

// DISPATCH RESULT
const formatGetResults = (result) => {
  // Get uniq project ids
  const idProjects = result.reduce((acc, current) => {
    if (!acc.includes(current.id)) acc.push(current.id);
    return acc;
  }, []);
  // Format the result to separate the technos and main datas
  return idProjects.map((projectId) => {
    const rows = result.filter((el) => el.id === projectId);
    const { name, image_name: imageName, ...mainDatas } = rows[0];
    const currentProject = { mainDatas };
    const currentProjectTechnos = rows.map(
      ({ name, image_name: imageName, tid }) => ({ id: tid, name, image_name: imageName })
    );
    currentProject.technos = currentProjectTechnos;
    return currentProject;
  });
};

module.exports = {
  createProject (keys, values, callback) {
    connexion.query(addProjectSql(keys), [values], (err, result) => {
      if (err) return callback(err);
      return callback(null, result.insertId);
    });
  },

  deleteFullProject (id, callback) {
    connexion.query(deleteFullProjectSql, [id], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  findAll (callback) {
    connexion.query(getFullProjectSql(), (err, result) => {
      if (err) return callback(err);
      return callback(null, formatGetResults(result));
    });
  },

  findOneById (id, callback) {
    connexion.query(getFullProjectSql(true), [id], (err, result) => {
      if (err) return callback(err);
      return callback(null, formatGetResults(result)[0]);
    });
  },

  updateOneById ([key, value], id, callback) {
    connexion.query(updateOneByIdSql(key), [value, id], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  }
};
