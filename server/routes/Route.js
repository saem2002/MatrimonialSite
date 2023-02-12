import express from 'express';
import {  getUsers,signin,register,finduser, updateuser, getsubcategory, noofusers, blockuser } from '../controller/userController.js';
import cloudinary from 'cloudinary';


cloudinary.config({
    cloud_name:'saemarora',
    api_key:'811255976848432',
    api_secret:'CoB1cMxfKj59FjfqiBPeGqll0q4'
})


const route = express.Router();

route.post('/register', register);
route.post('/signin', signin);

route.get('/users', getUsers);
route.get('/noofusers', noofusers);
route.get('/getsubcategory/:age/:gender/:religion/:currGender', getsubcategory);
route.get('/:token', finduser);
route.patch('/updateuser/:id', updateuser);
route.patch('/blockuser/:id', blockuser);



export default route;