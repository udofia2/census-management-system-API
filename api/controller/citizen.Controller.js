const citizenActions = (Citizens, crypto, jwt, jwtScrete) => {
  /**
   * @param       GET /api/v1/profile
   * @desc        Fectches all citizens
   * @access      public( Every one can access)
   */
  const citizens = async (req, res) => {
    try {
      const citizens = await Citizens.find({})
        .select("-__v -createdAt")
        .sort("desc");

      res.json({
        Total: citizens.length,
        Citizens: citizens.map((citizen) => {
          return {
            Name: `${citizen.fName} ${citizen.lName}`,
            email: citizen.email,
            citizenId: citizen.citizenID,
            gender: citizen.gender,
            request: {
              type: "GET",
              url: `http://localhost:3000/api/v1/citizen/profile/${citizen._id}`,
            },
          };
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * @param       GET /api/v1/profile/:citizenID
   * @desc        Displays single citizen's profile
   * @access      protected( only signed citizens can access)
   */
  const citizen = async (req, res) => {
    const citizen = await Citizens.findById(req.params.citizenID);
    res.json(citizen);
  };

  /**
   * @param       POST /api/v1/citizen/rgister
   * @desc        Citizen registration route
   * @access      public( Every one can access)
   */
  const register = async (req, res) => {
    const {
      email,
      fName,
      lName,
      weight,
      height,
      bloodGroup,
      religion,
      fatherN,
      homeTown,
      LGA,
      city,
      state,
      nationality,
      maritalStatus,
      occupation,
      DOB,
      age,
      gender,
    } = req.body;
    try {
      const Taken = Citizens.find({ email });
      if (Taken) return res.json(`${email} is taken, choose another email`);

      const citizenID = crypto.randomBytes(5).toString("hex");

      const newCitizen = new Citizens({
        email,
        fName,
        lName,
        gender,
        citizenID,
      });

      await newCitizen.save();

      res.status(201).json({ name: `${newCitizen.fName} ${newCitizen.lName}` });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * @param       POST /api/v1/citizen/login
   * @desc        signs in a citizen
   * @access      public( Every one can access)
   */
  const login = async (req, res) => {
    const { email, citizenID } = req.body;
    if (!(email || citizenID))
      return res.json("provide a valid email and citizen Id");

    const user = await Citizens.find({ email });

    const payload = {
      user: user._id,
    };

    const token = await jwt.sign(payload, jwtScrete, { expiresIn: "1h" });
    // const head = req.headers['x-auth-header'] = await token
    // const heads = await res.setHeader('x-auth-header', token)

    res.json({ token });
  };

  /**
   * @param       GET /api/v1/citizen/logout
   * @desc        Logs out a citizen
   * @access      protected( only logged in users can access)
   */
  const logout = (req, res) => {
    //   console.log(req.logout())
    res.json("You are now logged out");
  };

  return {
    citizens,
    register,
    login,
    logout,
    citizen,
  };
};

module.exports = citizenActions;
