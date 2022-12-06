require("dotenv").config();
const mongoose = require('mongoose');
const { validat_id,update_Course_validation,validate_addcourse_course,validate_course,update_user_validation,update_Department_validation,Add_Department_validation,update_faculty_validation,addUserValidation ,addlocationvalid ,updatevalidation ,validate_name, update_salary_validation} = require("../validations/hrMember.validation");
const Joi=require('joi');
const academicMembers = require('../models/academicMembers.model');
const hrMembers = require('../models/hrMembers.model');
const location=require('../models/locations.model')
const faculty=require('../models/faculties.model')
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const slots=require('../models/slots.model');
const department=require('../models/departments.model');
const course=require('../models/courses.model');
const { off } = require("../models/academicMembers.model");


let __id=1;

const Add_loc= async (req,res)=>{
    const token=req.headers.token;
        if(!token){
            return res.json({msg: "Token is required"})
        }
        try{ 
            const decodeToken=jwt.verify(token,"abcRaneem");
            if(decodeToken.role!="HR"){
                return res.json({msg: "You are not authorized"})
            }
   
     const{name, loc_type,max_capacity,current_capacity}=req.body;
   const valid= addlocationvalid.validate(req.body); 
   if(valid.error){
    return res.status(400).json({ msg: valid.error.message });
   }
     const search= await location.find({name:name})
     if(search.length==0){
         if(current_capacity>max_capacity){
            return res.status(400).json({msg: "Current Capacity is more than Max capacity"});
         }
     const newLoc= new location({name:name, loc_type: loc_type,max_capacity:max_capacity,current_capacity:current_capacity});
    await newLoc.save();
    res.json('A new Room has been Added');
     }else{
        return res.status(400).json({msg: "This location already exists"});
     }
 }
catch (error){
    res.status(500).json({error: error.message});
}
    }

    const delete_loc = async (req, res) => {
        const token=req.headers.token;
        if(!token){
            return res.json({msg: "Token is required"})
        }
        try{ 
            const decodeToken=jwt.verify(token,"abcRaneem");
            if(decodeToken.role!="HR"){
                return res.json({msg: "You are not authorized"})
            }
            const name=req.body.name;
            const valid= validate_name.validate(req.body);//req.body
            if(valid.error){
             return res.status(400).json({ msg: valid.error.message });
            }
            if(!name){
                res.status.json({msg: "This location does not exists"})
            }
            
            const search= await location.findOne({name:name}).exec();
            if(!search){
                return res.status(400).json({msg: "This location does not exists"});
            }
            await academicMembers.findOneAndUpdate({office_loc:search._id}, {$set:{office_loc: null}})
            await hrMembers.findOneAndUpdate({office_loc: search._id}, {$set: {office_loc: null}})
            const deletedLocation = await location.remove({name: name});
            res.json('The Location has been deleted');
        }
        catch (error) {
            res.status(500).json({error: error.message});
        }
    }
 
    const update_loc=async (req,res)=>{
        const token=req.headers.token;
        if(!token){
            return res.json({msg: "Token is required"})
        }
        try{ 
            const decodeToken=jwt.verify(token,"abcRaneem");
            if(decodeToken.role!="HR"){
                return res.json({msg: "You are not authorized"})
            }
            const{name,newname,loc_type}=req.body;
            const valid= updatevalidation.validate(req.body);
            if(valid.error){
             return res.status(400).json({ msg: valid.error.message });
            }
           
            const f=await location.find({name:name});
            if(f.length==0){
                return res.status(400).json({msg: "This room does not exist"});
            }
            await location.update({name:name},{$set:{name:newname}})
            await location.update({name:newname},{$set:{loc_type:loc_type}})
         
            res.json('The room has been updated')
        }
        catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    const Add_faculty= async(req,res)=>{
        const token=req.headers.token;
        if(!token){
            return res.json({msg: "Token is required"})
        }
        try{ 
            const decodeToken=jwt.verify(token,"abcRaneem");
            if(decodeToken.role!="HR"){
                return res.json({msg: "You are not authorized"})
            }
        let name=req.body.name;
         const valid= validate_name.validate(req.body);//req.body
            if(valid.error){
             return res.status(400).json({ msg: valid.error.message });
            }
        if(!name){
            return res.status(400).json({msg: "You are missing an input"});
        }
        const fun=await faculty.find({name:name})
        if(fun.length==0){
        let Newfaculty= new faculty({name:name})
        await  Newfaculty.save();
        res.json('New faculty has been added');
        }
        else{
            return res.status(400).json({msg: "This faculty is already exists"});
        }
        
    }
    catch (error){
        res.status(500).json({error: error.message});
        }
    
    }

const Delete_faculty=async(req,res)=>{
    const token=req.headers.token;
    if(!token){
        return res.json({msg: "Token is required"})
    }
    try{ 
        const decodeToken=jwt.verify(token,"abcRaneem");
        if(decodeToken.role!="HR"){
            return res.json({msg: "You are not authorized"})
        }
const name=req.body.name;
const valid= validate_name.validate(req.body);//req.body
if(valid.error){
 return res.status(400).json({ msg: valid.error.message });
}
if(!name){
    return res.status(400).json({msg: "You are missing an input"});
}
const faculty_name=await faculty.find({name:name});
if(faculty_name.length==0){
    return res.status(400).json({msg: "This faculty is not found"});
}
else{
    const search= await faculty.find({name:name}); 
    await department.findOneAndUpdate({faculty_id:search[0]._id},{$set:{faculty_id:null}});
    await faculty.remove({name: name});
    res.json('This faculty has been deleted')
}
}
catch (error){
    res.status(500).json({error: error.message});
}
}

const update_faculty=async (req,res)=>{
    const token=req.headers.token;
    if(!token){
        return res.json({msg: "Token is required"})
    }
    try{ 
        const decodeToken=jwt.verify(token,"abcRaneem");
        if(decodeToken.role!="HR"){
            return res.json({msg: "You are not authorized"})
        }  
  const {name,newname}=req.body;
  const valid= update_faculty_validation.validate(req.body);//req.body
  if(valid.error){
   return res.status(400).json({ msg: valid.error.message });
  }
  
  const fuc=await faculty.find({name:name});
  if(fuc.length==0){
    return res.status(400).json({msg: "No faculty with this name"});
  }
      
      await faculty.updateMany({name:name},{$set:{name:newname}});
      
      res.json('This faculty has been updated')
}
catch (error){
    res.status(500).json({error: error.message});
}
}
const Add_Department= async (req,res)=>{
    const token=req.headers.token;
        if(!token){
            return res.json({msg: "Token is required"})
        }
        try{ 
            const decodeToken=jwt.verify(token,"abcRaneem");
            if(decodeToken.role!="HR"){
                return res.json({msg: "You are not authorized"})
            } 
       const {name,faculty_id,hod_id} = req.body; 
       const valid= Add_Department_validation.validate(req.body);//req.body
       if(valid.error){
        return res.status(400).json({ msg: valid.error.message });
       }    
     const isValid = mongoose.Types.ObjectId.isValid(faculty_id);
     const isValidhod= mongoose.Types.ObjectId.isValid(hod_id);
     if(isValid==true &&  isValidhod==true){
        const facultyy= await faculty.findById({_id:faculty_id});
        if(!facultyy){
         return res.status(400).json({msg: "This Faculty does not exists"});
        }
        const search_ac=await academicMembers.find({_id:hod_id}).exec();
        if(!search_ac){
            return res.status(400).json({msg: "This User does not exists"});
        }
        await academicMembers.findByIdAndUpdate({_id:hod_id},{$set:{role:"HOD"}});
        const search=await department.find({name:name});
        if(search.length==0){
        let newdepartment=new department({name:name,faculty_id:faculty_id,hod_id:hod_id});
       await newdepartment.save();
       res.json('New Department has been added');
     }
     else {
         return res.status(400).json({msg: "Department name already exists"});
     }
    
    }
    else{
        return res.status(400).json({msg: "Please Enter a valid ID"});
     }
 }
catch (error){
    res.status(500).json({error: error.message});
}


    }

const Delete_Department= async (req,res)=>{
    const token=req.headers.token;
    if(!token){
        return res.json({msg: "Token is required"})
    }
    try{ 
        const decodeToken=jwt.verify(token,"abcRaneem");
        if(decodeToken.role!="HR"){
            return res.json({msg: "You are not authorized"})
        }
const name=req.body.name;
const valid= validate_name.validate(req.body);//req.body
if(valid.error){
 return res.status(400).json({ msg: valid.error.message });
}
if(!name){
    return res.status(400).json({msg: "Please Enter a Department Name"})
}
const dep= await department.find({name:name});
if(dep.length==0)
{
    return res.status(400).json({msg: "No Departmet Found"});   
}

const search= await department.find({name:name}); 
await course.findOneAndUpdate({ department_id:search[0]._id},{$set:{department_id:""}});
await department.deleteMany({name:name});
res.json('This Department has been deleted')}
catch (error){
    res.status(500).json({error: error.message});
}
    }
    
const update_department= async (req,res)=>{
    const token=req.headers.token;
    if(!token){
        return res.json({msg: "Token is required"})
    }
    try{ 
        const decodeToken=jwt.verify(token,"abcRaneem");
        if(decodeToken.role!="HR"){
            return res.json({msg: "You are not authorized"})
        }
       const id=req.body.id;
       const valid= update_Department_validation.validate(req.body);//req.body
if(valid.error){
 return res.status(400).json({ msg: valid.error.message });
}
const searchdep=await department.findOne({_id:id}).exec();
if(!searchdep){
    return res.json({msg: "No Department Found"})
}

if(req.body.name){
     const name=req.body.name;
   const searchname= await department.findOne({name:name}).exec();

   if(searchname){
    return res.json({msg: "This name already exists"});
   }
   await department.findOneAndUpdate({_id:id},{$set:{name:name}});
   res.json('The name has been updated');
}
if(req.body.faculty_id){
    const faculty_id=req.body.faculty_id;
    const isValid = mongoose.Types.ObjectId.isValid(faculty_id);
  if(isValid==false){
    return res.status(400).json({msg: "This ID is not valid"});
  }
    const search_facultyid= await faculty.find({_id:faculty_id}).exec();
    if(!search_facultyid){
        return res.status(400).json({msg: "This Faculty does not exists"});
    }
    await department.findOneAndUpdate({_id:id},{$set:{faculty_id:faculty_id}});
    res.json('The Facylty ID  has been updated');
}
if(req.body.hod_id){
    const hod_id=req.body.hod_id;
    const isValid = mongoose.Types.ObjectId.isValid(hod_id);
    if(isValid==false){
        return res.status(400).json({msg: "This ID is not valid"});
    }
    const searchod= await academicMembers.findOne({_id:hod_id}).exec();
    if(!searchod){
        return res.status(400).json({msg: "This User does not exists"});
    }
    if(searchod.role!="HOD"){
        await academicMembers.findOneAndUpdate({_id:hod_id},{$set:{role:"HOD"}});
        await department.findOneAndUpdate({_id:id},{$set:{hod_id:hod_id}});
       res.json('The HOD has been updated')
    }
    else{
        await department.findOneAndUpdate({_id:id},{$set:{hod_id:hod_id}});
        res.json('The HOD has been updated'); 
    }
    
}
    }
catch (error){
    res.status(500).json({error: error.message});
}
}
const Add_course=async(req,res)=>{
 
    const token=req.headers.token;
    if(!token){
        return res.json({msg: "Token is required"})
    }
    try{ 
        const decodeToken=jwt.verify(token,"abcRaneem");
        if(decodeToken.role!="HR"){
            return res.json({msg: "You are not authorized"})
        } 
    const {name, department_id, course_coordinator_id}=req.body;
    const valid= validate_addcourse_course.validate(req.body);//req.body
     if(valid.error){
     return res.status(400).json({ msg: valid.error.message });
     }   
    
    const isValid_Did = mongoose.Types.ObjectId.isValid(department_id);
    const isValid_Ci=mongoose.Types.ObjectId.isValid(course_coordinator_id);
    if(isValid_Did==true && isValid_Ci==true){
        const search= department.findOne({_id:department_id}).exec();
        if(!search){
            return res.status(400).json({msg: "This Department is not found"});
        }
        const coursename= await course.findOne({name:name}).exec();
        if(coursename){
            return res.status(400).json({msg: "This course is already added"});
        }
        const search_cc= await academicMembers.findOne({_id:course_coordinator_id},'role').exec();
        if(search_cc){
        if(search_cc.role=="CC"){
            const newcourse = new course({name:name, department_id:department_id,course_coordinator_id:course_coordinator_id});
            await newcourse.save();
            res.send("The course has been added");   
        }}
        else{
            return res.status(400).json({msg: "This course Coordinator is not found"});
        }
           
    }
  else{
    return res.status(400).json({msg: "Please Enter a valid ID"})
  }
}
catch(error){
    res.status(500).json({error: error.message});
}


}

const update_course= async (req,res)=>{
    const token=req.headers.token;
    if(!token){
        return res.status(400).json({msg: "token is required"})
    }
    try{ 
        const decodeToken=jwt.verify(token,"abcRaneem");
        if(decodeToken.role!="HR"){
            return res.status(400).json({msg: "you are not authorized"})
        
        }
     const valid= update_Course_validation.validate(req.body);//req.body
  if(valid.error){
      
    return res.status(400).json({ msg: valid.error.message });
    }
    const id=req.body.id;
    const searchid= await course.findOne({_id:id}).exec();
    if(!searchid){
        return res.status(400).json({msg: "This course is not found"})
    }

if(req.body.name){
    const name=req.body.name;
    const searchname= await course.findOne({name:name}).exec();
    if(searchname){
        return res.status(400).json({msg: "This course is already exists"})
    }
    await course.findOneAndUpdate({_id:id},{name:name});
res.json('The name is updated')
}
if(req.body.department_id){
    const  department_id=req.body.department_id;
    const isvalid= mongoose.Types.ObjectId.isValid(department_id);
    if(isvalid==false){
        return res.status(400).json({msg: "This ID is not valid"})
    }
    const searchdep= await department.findOne({_id:department_id}).exec();
    if(!searchdep){
        return res.status(400).json({msg: "This department does not exists"})
    }
    await course.findOneAndUpdate({_id:id},{department_id:department_id});
    res.json('The department id has been updated')

}
if(req.body.course_coordinator_id){
    const course_coordinator_id=req.body.course_coordinator_id;
    const isvalid= mongoose.Types.ObjectId.isValid(course_coordinator_id);
    if(isvalid==false){
        return res.status(400).json({msg: "This ID is not valid"})
    }
    const searchaca=await academicMembers.findOne({_id:course_coordinator_id}).exec();
    if(!searchaca){
        return res.status(400).json({msg: "This user is not found"})
    }
    await academicMembers.findOneAndUpdate({_id:course_coordinator_id},{role:"CC"})
    await course.findOneAndUpdate({_id:id},{course_coordinator_id:course_coordinator_id}).exec();
    res.json('The course coordinator has been updated')

}
   
 }
 catch (error){
     res.status(500).json({error: error.message});
 }
 }


 const Delete_course= async (req,res)=>{
    const token=req.headers.token;
    if(!token){
        return res.json({msg: "Token is required"})
    }
    try{ 
        const decodeToken=jwt.verify(token,"abcRaneem");
        if(decodeToken.role!="HR"){
            return res.json({msg: "You are not authorized"})
        }
const name=req.body.name;
const valid= validate_name.validate(req.body);//req.body
if(valid.error){
return res.status(400).json({ msg: valid.error.message });
}   
if(!name){
return res.status(400).json({msg: "Please Enter a Department Name"})
}
const find= await course.findOne({name:name}).exec();
if(!find)
{
return res.status(400).json({msg: "No course found"});   
}
 await slots.findOneAndUpdate({course_id:find._id},{$set:{course_id:""}});
await course.deleteOne({name:name});
res.json('The course has been deleted');
}
catch (error){
res.status(500).json({error: error.message});
}
}

const addUser = async (req, res) => {
    const token = req.headers.token;
    if (!token) {
      return res.json({ error: "token is required" });
    }
    const validation = addUserValidation.validate(req.body);
    if (validation.error) {
      return res.json({ error: validation.error.message });
    }
    try {
      const decodedToken = jwt.verify(token, process.env.JWT);
      if (decodedToken.role != "HR") {
        return res.json({ error: "You are not authorized to add a user" });
      }
      let user = await academicMembers.findOne({ email: req.body.email });
      if (user) {
        return res.json({ error: "Email already exists" });
      }
      user = await hrMembers.findOne({ email: req.body.email });
      if (user) {
        return res.json({ error: "Email already exists" });
      }
      const valid_location_id = mongoose.isValidObjectId(req.body.location_id);
      if (valid_location_id == false) {
        return res.json({ error: "Invalid location ID" });
      }
      const location = await locations.findById(req.body.location_id).exec();
      if (!location) {
        return res.json({ error: "Location does not exist" });
      }
      if (location.max_capacity == location.current_capacity) {
        return res.json({ error: "Room reached maximum capacity" });
      }
      const capacity = location.current_capacity + 1;
      locations.findByIdAndUpdate(req.body.location_id);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("123456", salt);
      if (req.body.role == "HR") {
        const newUser = new hrMembers({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          gender: req.body.gender,
          salary: req.body.salary,
          day_off: "Saturday",
          sign_in: [],
          sign_out: [],
          annual_leave_balance: 2.5,
          accidential_leave_balance: 6,
          ofiice_loc: req.body.location_id,
          total_hours_attended: 0,
          missing_days: [],
        });
        newUser.save((err) => {
          return res.json({ error: err });
        });
        return res.json({ msg: "User added" });
      }
      if (req.body.role != "HR") {
        const newUser = new academicMembers({
          name: req.body.name,
          email: req.body.email,
          role: req.body.role,
          password: hashedPassword,
          gender: req.body.gender,
          salary: req.body.salary,
          day_off: req.body.day_off,
          sign_in: [],
          sign_out: [],
          annual_leave_balance: 2.5,
          accidential_leave_balance: 6,
          ofiice_loc: req.body.location_id,
          total_hours_attended: 0,
          missing_days: [],
          schedule: [],
        });
        newUser.save((err) => {
          return res.json({ error: err });
        });
        return res.json({ msg: "User added" });
      }
    } catch (error) {
      res.json({ error: "error decoding token" });
    }
  };

const delete_user= async(req,res)=>{
    const token=req.headers.token;
    if(!token){
        return res.json({msg: "Token is required"})
    }
    try{ 
        const decodeToken=jwt.verify(token,"abcRaneem");
        if(decodeToken.role!="HR"){
            return res.json({msg: "You are not authorized"})
        }
    const id=req.body.id;
        const search_ac=await academicMembers.findOne({id:id}).exec();
        if(!search_ac){
            const search_hr=await hrMembers.findOne({id:id}).exec();
            if(!search_hr){
                return res.json({ error: "This user is not found" });
            }
            await hrMembers.deleteOne({id:id});
            res.json('The HR Member has been deleted');
        }
        else{

            await course.findOneAndUpdate({course_coordinator_id:id},{$set:{course_coordinator_id:""}});
await department.findOneAndUpdate({hod_id:id},{$set:{hod_id:""}});
await slots.findOneAndUpdate({academic_member_id:id},{$set:{academic_member_id:""}});
           await  academicMembers.deleteOne({id:id});
           
           res.json('The Academic Member has been deleted');
        }

    }

catch (error){
    res.status(500).json({error: error.message});
    }   
}

const view_AttendenceRecord= async (req,res)=>{
    const token=req.headers.token;
    if(!token){
        return res.json({msg: "Token is required"})
    }
    try{ 
        const decodeToken=jwt.verify(token,"abcRaneem");
        if(decodeToken.role!="HR"){
            return res.json({msg: "You are not authorized"})
        }
const id=req.body.id;


const search_ac = await academicMembers.findOne({id:id});

if(!search_ac){
    
    const search_hr= await hrMembers.findOne({id:id});

    if(!search_hr){
        return res.status(400).json({msg: "This user is not found"})
    }

    const totatalhours= await hrMembers.findOne({id:id},'total_hours_attended');
    return res.json(totatalhours.total_hours_attended)

}

const totatalhours2= await academicMembers.findOne({id:id},'total_hours_attended');
res.json(totatalhours2.total_hours_attended)

    }
catch (error){
        res.status(500).json({error: error.message});
         }
}




const view_missingdays= async (req,res)=>{
    const token=req.headers.token;
    if(!token){
        return res.json({msg: "Token is required"})
    }
    try{ 
        const validation = validat_id.validate(req.body);
    if (validation.error) {
      return res.json({ error: validation.error.message });
    }
        const decodeToken=jwt.verify(token,"abcRaneem");
        if(decodeToken.role!="HR"){
            return res.json({msg: "You are not authorized"})
        }
const id=req.body.id;
const search_ac = await academicMembers.findOne({id:id});
if(!search_ac){
    const search_hr= await hrMembers.findOne({id:id});
    if(!search_hr){
        return res.status(400).json({msg: "This user is not found"})
    }
    
   const missing_days= await hrMembers.findOne({id:id},'missing_days');
   res.json(missing_days.missing_days);
}
const missing_days= await academicMembers.findOne({id:id},'missing_days');
   res.json(missing_days.missing_days);
    }
catch (error){
        res.status(500).json({error: error.message});
         }
}


const view_misssinghours= async (req,res)=>{
    const token=req.headers.token;
    if(!token){
        return res.json({msg: "Token is required"})
    }
    try{ 
        const validation = validat_id.validate(req.body);
    if (validation.error) {
      return res.json({ error: validation.error.message });
    }
        const decodeToken=jwt.verify(token,"abcRaneem");
        if(decodeToken.role!="HR"){
            return res.json({msg: "You are not authorized"})
        }
const id=req.body.id;
const search_ac = await academicMembers.findOne({id:id});
if(!search_ac){
    const search_hr= await hrMembers.findOne({id:id});
    if(!search_hr){
        return res.status(400).json({msg: "This user is not found"})
    }
    
   const missing_hours= await hrMembers.findOne({id:id},'missing_hours');
   res.json(missing_hours.missing_hours);
}
const missing_hours= await academicMembers.findOne({id:id},'missing_hours');
   res.json(missing_hours.missing_hours);
    }
catch (error){
        res.status(500).json({error: error.message});
         }
}

const update_salary=async (req,res)=>{
    const token=req.headers.token;
    if(!token){
        return res.json({msg: "Token is required"})
    }
    try{ 
        const decodeToken=jwt.verify(token,"abcRaneem");
        if(decodeToken.role!="HR"){
            return res.json({msg: "You are not authorized"})
        }
    const {id,salary}=req.body;

  
    const validation = update_salary_validation.validate(req.body);
    if (validation.error) {  
      return res.json({ error: validation.error.message });
    }
    
const search_ac=await academicMembers.find({id:id})
if(!search_ac){ 
    const search_hr= await hrMembers.find({id:id});
    if(!search_hr){
        return res.status(400).json({msg:"This user is not found"})
    }
    await hrMembers.updateOne({id:id},{salary:salary});
    res.send('The salary has been updated for HR member');
}

await academicMembers.updateOne({id:id},{salary:salary});
res.send('The salary has been updated for Academic member');
    
  
    }
catch(error){
    res.status(500).json({error: error.message});
}
}

const update_user = async(req,res)=>{
    const token = req.headers.token;
    if(!token){
        res.json({error: "token is required"})
    }
    const validation = update_user_validation.validate(req.body);
    if(validation.error){
        return res.json({error:validation.error.message})
    }
    try {
        const decodedToken = jwt.verify(token, "abcRaneem");
        if(decodedToken.role!="HR"){
            res.json({error: "You are not authorized to access this route"})
        }
       const id= req.body.id;
        let user = await academicMembers.findOne({id:id}).exec();
        if(!user){
             user= await hrMembers.findOne({id:id}).exec()
            if(!user){
                return res.status(400).json({msg:"ID does not exist"})
            }
        }
        if(req.body.email){
            const email=req.body.email;
            let emailsearch =await academicMembers.findOne({email:email}).exec();
            if(emailsearch){
                return res.json({error: "Email already exists"})
            }
            emailsearch =await hrMembers.findOne({email:email}).exec();
            if(emailsearch){
                return res.json({error: "Email already exists"})
            }
            await academicMembers.findOneAndUpdate({id:id},{$set:{email:email}});
            await hrMembers.findOneAndUpdate({id:id},{$set:{email:email}});
            res.json('email has been updated')
        }
        if(req.body.office_loc){
            const officeid =req.body.office_loc
            const validateLocId = mongoose.isValidObjectId(officeid);
            if(!validateLocId){
                return res.json({error: "Invalid location id"})
            }  
            const searchloc= await location.findOne({_id:officeid}).exec();
            if(!searchloc){
                return res.json({error: "This location is not found"})
            }
           
            if(searchloc.current_capacity<searchloc.max_capacity){
                if(searchloc.loc_type=="Office"){
                    if(searchloc._id== user.office_loc){
                        return res.json({error: "This user already assigned to this location"});
                    }
                    let oldLoc = await location.findOne({_id:user.office_loc})

                    await location.findOneAndUpdate({_id:user.office_loc},{$set:{current_capacity:oldLoc.current_capacity-1}})
                    await academicMembers.findOneAndUpdate({_id:user._id},{$set:{office_loc:officeid}})
                    await hrMembers.findOneAndUpdate({_id:user._id},{$set:{office_loc:officeid}})
                    await location.findByIdAndUpdate({_id:officeid}, {$set:{current_capacity:searchloc.current_capacity+1}})
                   return res.json('The Location has been updated');
                }
                else{
                    return res.json({error: "This location is not an office"})
                }
            }
            else{
                return res.json({error: "This room has no capacity"});
            }

    }
    if(req.body.name){
const name=req.body.name;
        const s_ac= await academicMembers.findOneAndUpdate({id:user.id},{$set:{name:name}}).exec();
        const s_hr= await hrMembers.findOneAndUpdate({id:user.id},{$set:{name:name}}).exec();
        if(!s_ac && !s_hr){
            return res.json({error: "This name is not found"});
        }
        res.json('The name has been updated')
    }


}
catch(error){
    res.status(500).json({error: error.message});
}
}   

const addSignIn = async (req, res) => {
    try {
      const token = req.headers.token;
      if (!token) {
        return res.json({ error: "token is required" });
      }
      const user_id = req.body.id;
      if (!user_id) {
        return res.json({ error: "id is required" });
      }
  
      const decodedToken = jwt.verify(token, process.env.JWT);
      if (decodedToken.role != "HR") {
        return res.json({ error: "you are not authorized to add signin" });
      }
      let user = await hrMembers.findOne({ id: user_id }).exec();
      if (!user) {
        user = await academicMembers.findOne({ id: user_id }).exec();
      }
      if (!user) {
        return res.json({ error: "user not found" });
      }
      const hr = await hrMembers.findById(decodedToken.id).exec();
      if (!hr) {
        return res.json({ error: "user not found" });
      }
      if (hr.id == user.id) {
        return res.json({ error: "you can't add for yourself" });
      }
      if (user.sign_in.length > user.sign_out.length) {
        return res.json({ error: "user already signed in" });
      }
      const now = moment();
      user.sign_in.push(now);
      user.save();
      res.json({ msg: "signin record added" });
    } catch (error) {
      res.json({ error: error.message });
    }
  };
  
  const addSignOut = async (req, res) => {
    const token = req.headers.token;
    if (!token) {
      return res.json({ error: "token is required" });
    }
  
    const user_id = req.body.id;
    if (!user_id) {
      return res.json({ eror: "id is required" });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT);
      if (decodedToken.role != "HR") {
        return res.json({ error: "you are not authorized to add signin" });
      }
      let user = await hrMembers.findOne({ id: user_id }).exec();
      if (!user) {
        return (user = await academicMembers.findOne({ id: user_id }).exec());
      }
      if (!user) {
        return res.json({ error: "user not found" });
      }
      const hr = await hrMembers.findById(decodedToken.id).exec();
      if (!hr) {
        return res.json({ error: "user not found" });
      }
      if (hr.id == user.id) {
        return res.json({ error: "you can't add for yourself" });
      }
      if (user.sign_in.length == user.sign_out.length) {
        return res.json({ error: "user already signed out" });
      }
  
      // ----------------------------------------------------------------
      let signin_time = user.sign_in;
      signin_time = signin_time[signin_time.length - 1];
      signin_time = moment(signin_time);
      let signout_time = moment();
      user.sign_out.push(signout_time);
      var sevenam = moment("7:00am", "h:mma");
      var sevenpm = moment("7:00pm", "h:mma");
      if (
        signin_time.isBefore(sevenam) &&
        signout_time.isBetween(sevenam, sevenpm)
      ) {
        const timedif = signout_time.diff(sevenam);
        const tempTime = moment.duration(timedif);
        const timeSpent =
          tempTime.hours() + ":" + tempTime.minutes() + ":" + tempTime.seconds();
        if (user.total_hours_attended == "0") {
          const time_addition = sumTime(timeSpent, "00:00:00");
          user.total_hours_attended = time_addition;
        } else {
          const time_addition = sumTime(timeSpent, user.total_hours_attended);
          user.total_hours_attended = time_addition;
        }
        user.save();
        return res.json({ msg: "signed out, hours are added" });
      } else if (
        signin_time.isBetween(sevenam, sevenpm) &&
        signout_time.isBetween(sevenam, sevenpm)
      ) {
        const timedif = signout_time.diff(signin_time);
        const tempTime = moment.duration(timedif);
        const timeSpent =
          tempTime.hours() + ":" + tempTime.minutes() + ":" + tempTime.seconds();
  
        if (user.total_hours_attended == "0") {
          const time_addition = sumTime(timeSpent, "00:00:00");
          user.total_hours_attended = time_addition;
        } else {
          const time_addition = sumTime(timeSpent, user.total_hours_attended);
          user.total_hours_attended = time_addition;
        }
        user.save();
        return res.json({ msg: "signed out, hours are added" });
      } else if (
        signin_time.isBetween(sevenam, sevenpm) &&
        signout_time.isAfter(sevenpm)
      ) {
        const timedif = sevenpm.diff(signin_time);
        const tempTime = moment.duration(timedif);
        const timeSpent =
          tempTime.hours() + ":" + tempTime.minutes() + ":" + tempTime.seconds();
        if (user.total_hours_attended == "0") {
          const time_addition = sumTime(timeSpent, "00:00:00");
          user.total_hours_attended = time_addition;
        } else {
          const time_addition = sumTime(timeSpent, user.total_hours_attended);
          user.total_hours_attended = time_addition;
        }
        user.save();
        return res.json({ msg: "signed out user" });
      } else {
        return res.json({ msg: "signed out user" });
      }
    } catch (error) {
      user.save();
      return res.json({ error: error.message });
    }
  };
  
  function sumTime(t1, t2, array = []) {
    var times = [3600, 60, 1],
      sum = [t1, t2, ...array]
        .map((s) => s.split(":").reduce((s, v, i) => s + times[i] * v, 0))
        .reduce((a, b) => a + b, 0);
  
    return times
      .map((t) => [Math.floor(sum / t), (sum %= t)][0])
      .map((v) => v.toString().padStart(2, 0))
      .join(":");
  }


exports.addUser = addUser;
exports.Add_loc = Add_loc;
exports.Add_faculty=Add_faculty;
exports.delete_loc = delete_loc;
exports.Delete_faculty=Delete_faculty;
exports.update_faculty=update_faculty;
exports.update_loc=update_loc;
exports.Add_Department=Add_Department;
exports.Delete_Department=Delete_Department;
exports.update_department=update_department;
exports.Add_course=Add_course;
exports.update_course=update_course;
exports.Delete_course=Delete_course;
exports.view_AttendenceRecord=view_AttendenceRecord;
exports.update_salary=update_salary;
exports.update_user=update_user;
exports.delete_user=delete_user;
exports.view_missingdays=view_missingdays;
exports.view_misssinghours=view_misssinghours;
exports.addSignIn = addSignIn;
exports.addSignOut = addSignOut;