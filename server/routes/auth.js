const express= require('express');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const pool= require('../db/pool');
const router= express.Router();

const jwtSecret= process.env.JWT_SECRET;
const {verifyToken, verifyAdmin}= require('../middleware/auth');

router.post('/register', async(req,res) => {
  const {first_name, last_name, email, phone, password} = req.body;

  try {
    const userExists= await pool.query('SELECT * FROM users WHERE email= $1', [email]);
    if (userExists.row.length > 0) {
      return res.status(400).json({msg:'User already exists'});
    }

    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password, salt);

    const newUser= await pool.query(
      'INSERT INTO users (first_name, last_name, email, phone, password) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [first_name, last_name, email, phone, hashedPassword]
    );

    const token = jwt.sign({id: newUser.rows[0].id, is_admin: newUser.rows[0].is_admin}, jwtSecret, {expresIn:'1h'});

    res.json({token});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/login', async (req,res)=> {
  const {email, password}= req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email= $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({msg: 'Invalid Credentials' });
    }
    const validPass= await bcrypt.compare(password, user.rows[0].password);
    if (!validPass) {
      return res.status(400).json({msg: 'Invalid Credentials'});
    } 

    const token= jwt.sign({id: user.rows[0].id, is_admin: user.rows[0].is_admin}, jwtSecret, {expiresIn: '1h'});

    res.json({token});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/admin/free-subscription/:userid', verifyToken, verifyAdmin, async(req,res)=> {
  const {userId}= req.params;

  try{
    await pool.query('UPDATE users SET subscription_active= TRUE WHERE id= $1', [userId]);
    res.json({msg: 'User upgraded to free subscription'});
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');  
  }
});

module.exports= router;