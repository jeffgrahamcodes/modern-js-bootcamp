const layout = require('../layout');

module.exports = ({ req }) => {
  return layout({
    content: `
      <div>
        Your id is: ${req.session.userId}
        <form method="POST" action="">
          <input name="email" type="text" placeholder="email">
          <input name="password" type="text" placeholder="password">
          <input name="passwordConfirmation" type="text" placeholder="password confirmatiom">
          <button>Sign Up</button>
        </form>
      </div>
    `,
  });
};
