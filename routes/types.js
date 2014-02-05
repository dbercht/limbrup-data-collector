var utils = require('../utils.js');

exports.all = function(req, res) {
  utils.query (res,
      { 
        name : "all_types", 
    text: 'SELECT types.name, types.slug, types.description, array_agg(type_alias.alias) as aliases from types LEFT OUTER JOIN type_alias ON types.slug = type_alias.type_slug GROUP BY types.name, types.slug, types.description',
    values : []
      }, 
      function(result) {
        res.send(result.rows);
      });
};

exports.get = function(req, res) {
  utils.query(res,
      { 
        name : "get_type", 
    text: 'SELECT types.name, types.description, array_agg(type_alias.alias) as aliases from types LEFT OUTER JOIN type_alias ON types.slug = type_alias.type_slug WHERE types.slug = $1 GROUP BY types.name, types.description', 
    values : [req.params.slug]
      },
      function(result) {
        if (result.rows.length === 0) {
          res.send(404);
        } else {
          res.send(result.rows[0]);
        }
      });
};

exports.create = function(req, res) {
  utils.query(res,
    { 
    name : "create_type", 
    text: 'INSERT INTO types VALUES ($1, $2, $3)',
    values : [req.body.slug, req.body.name, req.body.description]
  },
  function(result) {
    res.send({slug : req.body.slug, name : req.body.name, description : req.body.description});
  });
};

exports.createAlias = function(req, res) {
  utils.query(res,
      { 
    name : "create_type", 
    text: 'INSERT INTO type_alias VALUES ($1, $2)',
    values : [req.body.alias, req.params.slug]
  },
  function(result) {
    res.send(result.rows);
  });
};
