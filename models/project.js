const connexion = require('../conf');

const getFullProjectSql = (findOne = false) => {
  const where = findOne ? 'where project.id = ?' : '';
  return `
    SELECT
    project.*,
    t.name,t.image_name, t.id AS tid
    FROM project
    JOIN project_techno pt ON pt.project_id=project.id
    JOIN techno t ON pt.techno_id=t.id
    ${where}
    GROUP BY project.id, t.id
    ORDER BY priority ASC, t.priority ASC
    `;
};

const formatResults = (result) => {
  // Fetch uniq project ids
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
  findAll (callback) {
    const sql = getFullProjectSql();
    connexion.query(sql, (err, result) => {
      if (err) return callback(err);
      return callback(null, formatResults(result));
    });
  },

  findOneById (id, callback) {
    const sql = getFullProjectSql(true);
    connexion.query(sql, [id], (err, result) => {
      if (err) return callback(err);
      return callback(null, formatResults(result)[0]);
    });
  }
};
