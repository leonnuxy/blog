import Link from 'next/link';
import { withSessionSsr } from '../../lib/session'; // Import the SSR wrapper

function AdminIndex({ user }) { // Receive user from props
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      <nav>
        <ul>
          <li><Link href="/admin/new-post">Create New Post</Link></li>
          {/* Add other admin links here */}
        </ul>
      </nav>
      <form action="/api/logout" method="POST">
         <button type="submit">Logout</button>
      </form>
      {/* Rest of your admin page content */}
    </div>
  );
}

// Wrap the page component with withSessionSsr to ensure user is authenticated
// and to pass the user object as a prop.
// Note: The middleware already handles the redirect if not logged in,
// but this ensures the page only renders for logged-in users server-side
// and provides the user data.
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user?.isLoggedIn) {
      // Although middleware redirects, double-check here
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      props: { user },
    };
  }
);

export default AdminIndex;
