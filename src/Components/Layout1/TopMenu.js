import CustomLink from "../Core/CustomLink";


function TopMenu() {
    return (
        <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">          
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item"><CustomLink className="nav-link" href="/">Home</CustomLink></li>
                    <li class="nav-item"><CustomLink className="nav-link" href="/leaverequestlist">Leave request</CustomLink></li>
                    <li class="nav-item"><CustomLink className="nav-link" href="/about">About</CustomLink></li>
                 
                </ul>
            
        </nav></div>
    );
}
export default TopMenu;