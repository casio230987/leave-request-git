import Header from "./Header";
import Body from "./Body";
import About from "../Pages/About";
import LeaveRequestList from "../Pages/LeaveRequestList";

function Layout1({ children }) {

    return (<>
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <Header />
                </div>
            </div>
            <div class="row">
                <Body>{children}</Body>
            </div>
        </div>

    </>);

}
export default Layout1;