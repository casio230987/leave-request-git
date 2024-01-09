import UserCard from "./UserCard";
import TopMenu from "./TopMenu";
import { CoreDataContext } from "../../Context/LeaveRequestContext";
import { useContext } from "react";
function Header(){
    const{coreData,coreDataDispatch} = useContext(CoreDataContext);
    return <>
   
    <div class="row">
        <div class="col-sm-8">Welcome to <b>{coreData.portal}</b></div>
        <div class="col-sm-4"><UserCard userData={coreData.userData} /></div>
        </div>
        <div class="row"><div class="col-sm-12"><TopMenu /></div></div>
        </> ;
}
export default Header;