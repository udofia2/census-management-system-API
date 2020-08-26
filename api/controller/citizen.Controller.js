const citizenActions = (Citizens, crypto, jwt, jwtScrete) => {
  const citizens = async (req, res) => {
    try {
      const citizens = await Citizens.find({})
        .select("-__v -createdAt")
        .sort("desc");

      res.json(citizens);
    } catch (err) {
      console.error(err);
    }
  };

  const citizen = (req, res) => {
    res.json("individual citizen");
  };


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

      res.json({ newCitizen, token });
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (req, res) => {
    const { email, citizenID } = req.body;
    if (!(email || citizenID))
      return res.json("provide a valid email and citizen Id");

    const user = await Citizens.find({ email });

    const payload = {
      user: user._id
    };

    const token = await jwt.sign(payload, jwtScrete, { expiresIn: "1h" });
    // const head = req.headers['x-auth-header'] = await token
    // const heads = await res.setHeader('x-auth-header', token)

    res.json({ token });
  };

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
