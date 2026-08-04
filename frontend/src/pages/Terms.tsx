import { Link } from "react-router";

export function Terms() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <title>Terms</title>
      <h1 style={{ margin: 0 }}>Sample terms and conditions of a website</h1>
      <Link to="/signup">Back to sign up</Link>
    </div>
  );
}
