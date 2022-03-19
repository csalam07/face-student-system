const Users = require('../models/userModel')

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fname, lname, contact, email, address, dept, securityQ, securityA, password, confirm_password } = req.body
      const [user_email, _] = await Users.findByEmail(email)
      
      if (user_email)
        return res.status(400).json({ msg: 'This email already exists' });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: 'Password must be at least 6 characters' });

      if (password != confirm_password)
        return res.status(400).json({ msg: 'password should match' });
      
      const newUser = new Users(fname, lname, contact, email, address, dept, securityQ, securityA, password)
      await newUser.create()
	    newUser.save()

      res.json({msg: 'Register Success'})
      console.log("Register Success")
      console.log("Now You can login using following credentials")
      console.log("Email: " + email + " \npassword: " + password)
    }
    catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const [user, _] = await Users.getUserByEmail(email)
      
      if(!user) return res.status(400).json({ msg: 'Invalid email' })
      const isMatch = JSON.stringify(password)==JSON.stringify(user.password)
      console.log(isMatch)
      if (!isMatch) return res.status(400).json({ msg: 'Invalid password'})

      res.json({msg: 'Login Successfull'})
    }
    catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  forgotpass: async (req, res) => {
    try {
      const { email, securityQ, securityA, password } = req.body
      const [user, _] = await Users.getUserByEmail(email)
      if(!user) return res.status(400).json({ msg: 'Invalid email' })
      if (!user.securityQ == securityQ) return res.status(400).json({ msg: 'Invalid Security Question'})
      if (!user.securityA == securityA) return res.status(400).json({ msg: 'Invalid Security Answer'})
      await Users.updatePassword(email,password)
      res.json({msg: 'Password Updated Successfully'})
      console.log(`Hurrah! Now you can login using your new password: ${password}`)
    }
    catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

}

module.exports = authCtrl
