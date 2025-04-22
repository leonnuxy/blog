import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Determine API path considering potential base path
    const apiLoginPath = `${router.basePath}/api/login`;
    // Determine admin path considering potential base path and dev/prod difference
    const adminPath = process.env.NODE_ENV === 'production' ? `${router.basePath}/admin` : '/admin.html';
    // Determine redirect target, using query param or default admin path
    const redirectTarget = router.query.redirect || adminPath;


    try {
      const res = await fetch(apiLoginPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // Redirect to the intended page or the correct admin page
        router.push(redirectTarget);
      } else {
        const data = await res.json();
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <style jsx>{`
        div { margin-bottom: 10px; }
        label { display: inline-block; width: 80px; }
      `}</style>
    </div>
  );
}
