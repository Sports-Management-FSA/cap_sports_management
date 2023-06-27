const conn = require('../conn');
const { TEXT, STRING, UUID, UUIDV4, BOOLEAN, INTEGER  } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;


const User = conn.define('user', {
  // id: {
  //   type: UUID,
  //   primaryKey: true,
  //   defaultValue: UUIDV4
  // },
  username: {
    type: STRING,
   // allowNull: false,
   // validate: {
   //   notEmpty: true
   // },
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    },
    unique: true
  },
  avatar: {
    type: TEXT
  },
});

User.prototype.getActions = async function(match){
  let actions = [];
  if(match){
    actions = await conn.models.scorekeeper.findAll({
      where: {
        userId: this.id,
        matchId: match.id,
      },
      include: [
        {
          model: conn.models.actions,
        }
      ]
    })
  } else {
    actions = await conn.models.scorekeeper.findAll({
      where: {
        userId: this.id,
      },
      include: [
        {
          model: conn.models.actions,
        }
      ]
    })
  }
  return actions;
}

User.prototype.getRoles = async function(){
  const teamRoles = await conn.models.user_teamRoles.findAll({
    where:{
      userId: this.id,
    },
    include: [
      {
        model: conn.models.teamRoles,
      },
      {
        model: conn.models.team,
      }
    ]
  })

  const leagueRoles = await conn.models.user_leagueRoles.findAll({
    where:{
      userId: this.id,
    },
    include: [
      {
        model: conn.models.leagueRoles,
      },
      {
        model: conn.models.league,
      }
    ]
  })

  const roles = [teamRoles, leagueRoles];
  return roles;
}

User.addHook('beforeSave', async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw 'user not found';
  }
  catch (ex) {
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
}

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username
    }
  });
  if (user && await bcrypt.compare(password, user.password)) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error('bad credentials');
  error.status = 401;
  throw error;
}

module.exports = User;

