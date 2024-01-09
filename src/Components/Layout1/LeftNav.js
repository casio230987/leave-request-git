import About from "../Pages/About";
import LeaveRequestList from "../Pages/LeaveRequestList";
import React from "react";
import CustomLink from "../Core/CustomLink";

function LeftNav() {
    return (<ul>
        <li><CustomLink href="/" activeClassName="abc">Home</CustomLink></li>
        <li><CustomLink href="/leaverequestlist" activeClassName="abc">Leave Request List</CustomLink></li>
        <li><CustomLink href="/about" activeClassName="abc">About</CustomLink></li>
    </ul>
   
   );
}
export default LeftNav;