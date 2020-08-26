const adminActions = (validationResult, Admin, bcrypt) => {
  /**
   * @param       GET /api/v1/admin
   * @desc        Fectches list of Admins
   * @access      Everyone can access
   */
  const admins = async (req, res) => {
    //Feteches all the admins from the database
    const admins = await Admin.find({});
    res.json(admins);
  };

  /**
   * @param       POST /api/v1/admin/login
   * @desc        An admin login route
   * @access      Everyone can access
   */
  const login = (req, res) => {
    res.json("Admin login here");
  };

  /**
   * @param       POST /api/v1/admin/register
   * @desc        An admin registeration route
   * @access      Everyone can access
   */
  const register = async (req, res) => {
    //Validates form before registration
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      //Checks if admin exist
      const isUsed = await Admin.findOne({ email });

      if (isUsed) return res.json(`${email} is already an Admin`);

      //creates new admin
      const newAdmin = new Admin({
        name,
        email,
        password,
      });

      //Encrypt admin password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      newAdmin.password = hash;

      await newAdmin.save();

      res.json(newAdmin);
    } catch (err) {
      res.json(err);
    }
  };

  /**
   * @param       GET /api/v1/:adminID
   * @desc        Fectches single Admin
   * @access      protected( only signed in admin can access)
   */
  const admin = (req, res) => {
    res.json("Single admin");
  };

  return {
    admins,
    admin,
    login,
    register,
  };
};

module.exports = adminActions;
