import bcrypt from 'bcrypt'
const saltRounds = 10
export const hashPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds); // Generate a salt
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password using the generated salt
      console.log(hashedPassword);
      
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Error hashing password');
    }
  };

  export const comparePassword = async (password , hashedPassword) => {
    try{
      return await bcrypt.compare(password , hashedPassword)
    }
    catch(err){
      console.log(err);
    }  
  }