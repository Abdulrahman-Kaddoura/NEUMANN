import { Link } from "react-router";
import type { MouseEvent } from "react";

export function Terms() {
  function handleBackToSignUp(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.close();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <title>Terms</title>
      <h1 style={{ margin: 0 }}>Sample terms and conditions of a website</h1>
      <Link to="/signup" onClick={handleBackToSignUp}>Back to sign up</Link>
    </div>
  );
}
