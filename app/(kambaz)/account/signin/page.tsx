import Link from "next/link";
export default function Signin() {
 return (
   <div id="wd-signin-screen">
     <h3>Sign in</h3>
     <input
        value="alice"
        type="text"
        title="Please enter your username"
        placeholder="username"
        className="wd-username"
      /> <br />
     <input
        value="123"
        type="password" 
        title="Please enter your password"
        placeholder="password"
        className="wd-password" 
      /> <br />
     <Link href="/dashboard" id="wd-signin-btn"> Sign in </Link> <br />
     <Link href="signup" id="wd-signup-link"> Sign up </Link>
   </div>
);}
