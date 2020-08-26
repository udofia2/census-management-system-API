const adminActions = (
  validationResult,
  Admin,
  bcrypt,
  jwt,
  jwtSecret,
  Citizens
) => {
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
  const login = async (req, res) => {
    try {
      //form validation error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await Admin.findOne({ email });

      if (!user) return res.json("invalid Credentials");

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.json("invalid Credentials");

      const payload = {
        user: user._id,
      };
      const token = await jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

      res.json({ token });
    } catch (err) {
      res.json(err);
    }
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

      const citizen = await Citizens.find({});

      //creates new admin
      const newAdmin = new Admin({
        name,
        email,
        password,
        citizens: citizen,
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
  const admin = async (req, res) => {
    const id = req.params.adminID;
    const profile = await Admin.findById(id);
    const citizens = await Citizens.find({}).select("-createdAt -__v -_id");

    res.json({
      details: {
        adminDetails: {
          profile,
        },
        citizensDetails: {
          citizens,
        },
      },
    });
  };

  return {
    admins,
    admin,
    login,
    register,
  };
};

module.exports = adminActions;
