const validator=require('validator')


const validate=(data)=>{
  const mandatoryField=['firstName','emailId','password'];
  const isAllowed=mandatoryField.every((key)=>Object.keys(data).includes(key));
  if(!isAllowed) throw new Error("Some Field Missing");
  if(!validator.isEmail(data.emailId)) throw new Error('Invalid Email')
  if(!validator.isStrongPassword(data.password)) throw new Error('Weak Password')


};
  
module.exports=validate


// const validator = require('validator');

// const validate = (data) => {
//   const mandatoryFields = ['firstName', 'emailId', 'password'];

//   const isAllPresent = mandatoryFields.every(field => data[field]);
//   if (!isAllPresent) throw new Error("Some required field is missing");

//   if (!validator.isEmail(data.emailId)) throw new Error('Invalid Email');
//   if (!validator.isStrongPassword(data.password)) throw new Error('Weak Password');
// };

// module.exports = validate;
