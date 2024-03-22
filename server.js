const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    console.log(file);
   
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/uploads', express.static('uploads'))

const path = require("path");
app.get("/", (req, res) => {
app.use(express.static(path.resolve(__dirname, "frontend", "build")));
res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

let userSchema = new mongoose.Schema({
 firstName:{
  type: String,
    validate: {
      validator: function(v) {
        return /^[A-Za-z]+$/.test(v);
      },
      message: props => `${props.value} is not a valid First Name!`
    },
    required: [true, 'User First Name required']
 },
 lastName:{
  type: String,
    validate: {
      validator: function(v) {
        return /^[A-Za-z]+$/.test(v);
      },
      message: props => `${props.value} is not a valid Last Name!`
    },
    required: [true, 'User Last Name required']
 }
  ,
  age: {
    type:Number,
    required:true,
    min: 15,
    max: 85,
  },
  email:{
    type: String,
    required:true
  },
  password: {
    type:String,
    required:true
  },
  mobileNo: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})$/.test(v);
      },
      message: props => `${props.value} is not a valid mobile Number!`
    },
    required: [true, 'User mobile Number required']
  },
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

app.post("/login",upload.none(),async (req,res)=>{
  console.log(req.body);
  let userDetails = await User.find().and({email:req.body.email});
  console.log(userDetails);

  if(userDetails.length>0){
    let isPassword = await bcrypt.compare(req.body.password,userDetails[0].password)
    if(isPassword == true){

      let token = jwt.sign({email:req.body.email,password:userDetails[0].password},"abracadabra");

      let dataObj = {
        age:userDetails[0].age,
        firstName:userDetails[0].firstName,
        lastName:userDetails[0].lastName,
        email:userDetails[0].email,
        profilePic:userDetails[0].profilePic,
        mobileNo:userDetails[0].mobileNo,
        token:token,
        
      } 
      res.json({status:"success",data:dataObj})
    }
    else{
      res.json({status:"failure",msg:"User doesnot exist"})
    }
  }
  else{
    res.json({status:"failure",msg:"User doesnot exist"});
  }
 
})



app.post("/loginWithToken", upload.none(), async (req, res) => {
  let receivedToken = req.body.token;

  try {
    let decryptedTokenObj = await jwt.verify(receivedToken, "abracadabra");

    console.log(decryptedTokenObj);

    let userDetails = await User.find({ email: decryptedTokenObj.email });

    if (userDetails.length > 0 && userDetails[0].password === decryptedTokenObj.password) {
      let dataObj = {
        age: userDetails[0].age,
        firstName: userDetails[0].firstName,
        lastName: userDetails[0].lastName,
        email: userDetails[0].email,
        profilePic: userDetails[0].profilePic,
        mobileNo: userDetails[0].mobileNo,
      };
      res.json({ status: "success", data: dataObj });
    } else {
      res.json({ status: "failure", msg: "Invalid Token" });
    }
  } catch (err) {
    res.json({ status: "failure", msg: "Invalid Token", err: err });
  }
});



app.post("/signup", upload.array("profilePic"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    let signupUser = new User({
      firstName: req.body.fn,
      lastName: req.body.ln,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      mobileNo: req.body.mobileNo,
      profilePic: req.files[0].path,
    });

    await signupUser.save(); 
    res.json({
      status: "success",
      msg: "User created successfully",
    });
  } catch (err) {
    console.log("unable to insert data:", err);
    res.status(500).json({
      status: "error",
      msg: "Unable to insert data",
    });
  }
});

app.put("/updateProfile",upload.single("profilePic"),async(req,res)=>{
  try{

    console.log(req.body);
    console.log(req.file);

  if(req.body.fn.length > 0){
    let updatedDetailsStatus = await User.updateMany(
      {email:req.body.email},{firstName:req.body.fn}
        
      
      
      
      );
  }
  if(req.body.ln.length > 0){
    let updatedDetailsStatus = await User.updateMany(
      {email:req.body.email},{lastName:req.body.ln,
      }

      
      );
  }
  if(req.body.age.length > 0){
    let updatedDetailsStatus = await User.updateMany(
      {email:req.body.email},{age:req.body.age,
      }
      
      
      );
  }
  if(req.body.password.length > 0){
    let updatedDetailsStatus = await User.updateMany(
      {email:req.body.email},{password:req.body.password,
      }
      
      
      );
  }
  if(req.body.mobileNo.length > 0){
    let updatedDetailsStatus = await User.updateMany(
      {email:req.body.email},{mobileNo:req.body.mobileNo,
      }
      
      
      );
  }
  if(req.file){
    let updatedDetailsStatus = await User.updateMany(
      {email:req.body.email},{profilePic:req.file.path,
      }
      
      
      );
  }
   
    res.json({status:"success",msg:"user details updated"});

  }
  catch(err){
    res.json({status:"failure",msg:"unable to update",err:err});
  }
  
});
app.delete("/deleteProfile", upload.none(), async (req, res) => {
  try {
    await User.deleteMany({ email: req.body.email });
    res.json({ status: "success", msg: "User deleted" });
  } catch (err) {
    res.json({ status: "failure", msg: "Unable to delete" });
  }
});

app.listen(process.env.port, () => {
  console.log(`listening to the port${process.env.port}`);
});

let connectToMDB = async () => {
  try {
    await mongoose.connect(process.env.mdburl);
    console.log("connected to MDB");
  } catch (err) {
    console.log("unable to connect:", err);
  }
};

connectToMDB();