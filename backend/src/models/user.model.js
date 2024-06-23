import { Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

config({ path: './.env' });


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

const User = sequelize.define('User', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 10]
        }
    },
    nationalId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [16, 16]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false
    }
}, {
    timestamps: true,
    hooks: {
        beforeCreate: (user, options) => {
            user.password = user.password; // Placeholder for hash function
        }
    }

});



User.prototype.generateAuthToken = function() {
    const token = jsonwebtoken.sign(
        { id: this.id, role: this.role },
        process.env.JWT_SECRET.trim()
    );
    return token;
};

//Sync model with database
sequelize.sync().then(() => {
    console.log('User table created');
}).catch(err => {
    console.error('Failed to create User table:', err);
});

export default User;