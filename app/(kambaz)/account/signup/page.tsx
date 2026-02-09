import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signin-screen">
      <h1>Sign Up</h1>
      <FormControl id="wd-signup-username"
             placeholder="username"
             className="mb-2"/>
      <FormControl id="wd-signup-password"
             placeholder="password" type="password"
             className="mb-2"/>
      <Link id="wd-signup-btn"
            href="/account/profile"
            className="btn btn-primary w-100 mb-2">
            Sign up </Link>
      <Link id="wd-signin-link" href="/account/signin">Sign in</Link>
    </div> );}