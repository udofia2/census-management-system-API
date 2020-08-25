const citizenActions = (Citizens, crypto) => {
  const citizens = (req, res) => {
    res.json("all citizen on display");
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
    const citizenID = crypto.randomBytes(5).toString('hex')

    const newCitizen = new Citizens({
        email,
        fName,
        lName,
        gender,
        citizenID
    })

    await newCitizen.save()

    res.json(newCitizen);
} catch(err) {
    console.error(err)
}
  };
  const login = (req, res) => {
    res.json("Citizen Login page");
  };
  const logout = (req, res) => {
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
