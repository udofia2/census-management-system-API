const adminActions = (validationResult, Admin) => {
  const admins = (req, res) => {
    res.json("All admins on display");
  };

  const login = (req, res) => {
    res.json("Admin login here");
  };

  const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const newAdmin = new Admin({
      name,
      email,
      password,
    });

    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(password, salt, function(err, hash) {
    //         // Store hash in your password DB.
    //     });
    // });

    // const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(password, salt);
    // newAdmin.password = hash

    await newAdmin.save();

    res.json(newAdmin)
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
