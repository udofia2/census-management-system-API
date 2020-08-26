const form = (body) => {
  const formReg = [
    body("name").not().isEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ];

  const formLogin = [
      body("email")
      .isEmail(), 
      body("password").
      not()
      .isEmpty()
    ]

  return {
    formReg,
    formLogin,
  };
};

module.exports = form;
