const { query } = require('../config/database');

const UserModel = {
    create: async (userData) => {
        const sql = `INSERT INTO users (name, email, password) values (?,?,?)`;
        const result = await query(sql, [
            userData.name,
            userData.email,
            userData.password
        ]);
        return result.insertId;
    },

    findByEmail: async (email) => {
        const sql = `select * from users where email=?`;
        const user = await query(sql, [email]);
        return user[0]|| null;
    },

    findById: async(id)=>{
        const sql = 'select id, name, email, created_at from users where id=?'
        const user= await query(sql,[id]);
        return user[0] || null;
    },

    findAll: async ()=>{
        const sql=`select id, name, email, created_at from users`;
        return await query(sql);
    },

    update: async (id, userData)=>{
        const sql= `update users set name=?, email=? where id=?`;
        const result = await query(sql, [userData.name, userData.email, id]);
        return result.affectedRows>0;
    },
    
    delete: async (id)=>{
        const sql=`delete from users where id=?`;
        const result= await query(sql, [id]);
        return result.affectedRows>0;
    },

    emailExists: async (email)=>{
        const sql=`select count(*) as count from users where email = ?`;
        const result= await query(sql, [email]);
        return result[0].count>0;
    }
};

module.exports=UserModel;