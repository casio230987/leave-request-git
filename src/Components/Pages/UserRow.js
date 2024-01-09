function UserRow({user}){
    let userAtt = Object.keys(user);
    let subDiv = [];
    for(let i =0; i < userAtt.length; i++){
        subDiv.push(<div class="col-sm">{user[userAtt[i]]}</div>)
    }
    return <div class="row">
        {subDiv}
    </div>
}
export default UserRow;