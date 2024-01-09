import { useContext } from "react"
import { CoreDataContext } from "../../Context/LeaveRequestContext"
import Layout1 from "../Layout1/Layout1";
function MyProfile() {
    const {coreData,cdDispatch} = useContext(CoreDataContext);
    return (<Layout1><div class="panel panel-default">
        <div class="panel-body">
            <div class="col-xml-12">
            <h2>{coreData.userData.full_name}</h2>
            <p><strong>Company:</strong><span>{coreData.userData.company}</span></p>
            <p><strong>Location:</strong><span>{coreData.userData.location}</span></p>
            <p><strong>Bio:</strong><span>{coreData.userData.bio}</span></p>
            </div>
        </div>
    </div>
    </Layout1>);


}
export default MyProfile;