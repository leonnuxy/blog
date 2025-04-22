import { withSessionRoute } from '../../lib/session';

export default withSessionRoute(function logoutRoute(req, res) {
  req.session.destroy();
  // Redirect to login page, considering potential base path
  const isProduction = process.env.NODE_ENV === 'production';
  const basePath = isProduction ? '/blog' : '';
  const loginPath = `${basePath}/login`;
  res.redirect(loginPath);
});
