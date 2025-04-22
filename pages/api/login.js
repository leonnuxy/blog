import { withSessionRoute } from '../../lib/session';

export default withSessionRoute(async function loginRoute(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;

  // Simple hardcoded credential check
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.user = {
      isLoggedIn: true,
      username: username,
    };
    await req.session.save();
    res.status(200).json({ ok: true });
  } else {
    res.status(401).json({ ok: false, message: 'Invalid credentials' });
  }
});
