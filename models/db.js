var chalk = require('chalk');
var mongoose = require( 'mongoose' );


//var dbURI = 'mongodb://your_username:your_password@ds043615.mongolab.com:43615/leavethemarks';
var dbURI = 'mongodb://leavethemarks:mongolab@ds123399.mlab.com:23399/leavethemarks';


mongoose.connect(dbURI);


mongoose.connection.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});



var userSchema = new mongoose.Schema({
  username: {type: String, unique:true},
  email: {type: String, unique:true},
  password: String
});


userSchema.pre('save', function(next) {
    var user = this;
    console.log("Before Registering the user");
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    console.log(user.password);
          user.password = user.password;
          next();

});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    console.log("candidatePassword "+ candidatePassword);
    console.log("this password "+ this.password);

    if(candidatePassword === this.password){
      cb(null, true);
    }else{
      cb(false);
    }
}



// Build the User model
mongoose.model( 'User', userSchema );

// Stories Schema

var storiesSchema = new mongoose.Schema({
  author:String,
  title: {type: String,unique:true},
  created_at:{type:Date,default:Date.now},
  summary:String,
  content: {type: String},
  imageLink:String,
  comments:[{body:String,commented_by:String,date:Date}],
  slug:String

});

// Build the User model

mongoose.model( 'Story', storiesSchema,'stories');
