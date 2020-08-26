const adminActions = (validationResult, Admin, bcrypt) => {
  const admins = async (req, res) => {
    const admins = await Admin.find({});
    res.json(admins);
  };

  const login = (req, res) => {
    res.json("Admin login here");
  };

  const register = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      const isUsed = await Admin.findOne({ email });

      if (isUsed) return res.json(`${email} is already an Admin`);

      const newAdmin = new Admin({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      newAdmin.password = hash;

      await newAdmin.save();

      res.json(newAdmin);
    } catch (err) {
      res.json(err);
    }
  };

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
