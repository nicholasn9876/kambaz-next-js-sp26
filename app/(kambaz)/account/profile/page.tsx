import Link from "next/link";
import { IoCalendarOutline } from "react-icons/io5";
import { FormControl, FormSelect, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <FormControl defaultValue="alice" placeholder="username" className="wd-username mb-2"/>
      <FormControl defaultValue="123" placeholder="password" className="wd-password mb-2"/>
      <FormControl defaultValue="Alice" placeholder="First Name" className="wd-firstname mb-2"/>
      <FormControl defaultValue="Wonderland" placeholder="Last Name" className="wd-lastname mb-2"/>
      <InputGroup className="mb-2">
        <FormControl defaultValue="mm/dd/yyyy" placeholder="date of birth" id="wd-dob" className="border-end-0"/>
        <InputGroupText className="bg-white border-start-0">
          <IoCalendarOutline/>
        </InputGroupText>
      </InputGroup>
      <FormControl defaultValue="alice@wonderland" placeholder="email" id="wd-email" className="mb-2"/>
      <FormSelect defaultValue="FACULTY" id="wd-role" className="mb-2">
        <option value="USER">User</option>       <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
      </FormSelect>
      
      <Link href="signin" className="btn btn-danger w-100 mb-2"> Sign out </Link>
    </div>
);}
