import { DataTypes, Model } from "sequelize";
import url from 'url'
import util from 'util'
import connectToDB from './db.js'


const db = await connectToDB('postgresql:///encounterdb')


// Model declarations here (table blueprints)
//TAB User model
class User extends Model {}
User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        hashedPass: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        imgUrl: {
            type: DataTypes.STRING(2000)
        },
    },
    {
        modelName:'user',
        sequelize: db,
    },
)
//TAB Campaign model
class Campaign extends Model {}
Campaign.init(
    {
        campaignId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        campaignName: {
            type: DataTypes.STRING(30),
            defaultValue: "Campaign",
            allowNull: false

        },
    },
    {
        modelName:'campaign',
        sequelize: db,
    },
)
//TAB Encounter model
class Encounter extends Model {}
Encounter.init(
    {
        encounterId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        encounterName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },

    },
    {
        modelName:'encounter',
        sequelize: db,
    },
)
//TAB Player model

class Player extends Model {}
Player.init(
    {
        playerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        playerName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        playerImgUrl: {
            type: DataTypes.STRING(2000)
        },
        playerLv: {
            type: DataTypes.INTEGER(2)
        },
        playerHP: {
            type: DataTypes.INTEGER
        },
        playerAC: {
            type: DataTypes.INTEGER(2)
        },
        playerInit: {
            type: DataTypes.INTEGER(2)
        }
    },
    {
        modelName:'player',
        sequelize: db,
    },
)

class EncCamp extends Model {}
EncCamp.init(
    {
        encCampId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        encounterId: {
            type: DataTypes.INTEGER
        },
        campaignId: {
            type: DataTypes.INTEGER
        }
    },
    {
        modelName: 'enccamp',
        sequelize: db
    }
)

class Monster extends Model {}
Monster.init(
    {
        monsterId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        monsterUrl: {
            type: DataTypes.STRING
        },
    },
    {
        modelName: 'monster',
        sequelize: db
    }
)


// Association methods here (relationships, foreign keys)
User.hasMany(Campaign, {foreignKey: 'userId'})
Campaign.belongsTo(User, {foreignKey: 'userId'})

// Campaign.hasMany(Encounter, {foreignKey: 'campaignId'})
// Encounter.belongsTo(Campaign, {foreignKey: 'campaignId'})

Campaign.hasMany(EncCamp, {foreignKey: 'campaignId'})
EncCamp.belongsTo(Campaign, {foreignKey: 'campaignId'})

Encounter.hasMany(EncCamp, {foreignKey: 'encounterId'})
EncCamp.belongsTo(Encounter, {foreignKey: 'encounterId'})

Campaign.hasMany(Player, {foreignKey: 'campaignId'})
Player.belongsTo(Campaign, {foreignKey: 'campaignId'})

User.hasMany(Encounter, {foreignKey: 'userId'})
Encounter.belongsTo(User, {foreignKey: 'userId'})

Encounter.hasMany(Monster, {foreignKey: 'encounterId'})
Monster.belongsTo(Encounter, {foreignKey: 'encounterId'})




if(process.argv[1] === url.fileURLToPath(import.meta.url)) {
    console.log('Syncing database...');
    await db.sync();
    console.log('Finished syncing database!');
    await db.close()
}

//export models
export {User, Campaign, Encounter, Player, EncCamp, Monster}