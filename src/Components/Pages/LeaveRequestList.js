import LeaveRequest from "./LeaveRequest";
import { CoreDataContext, LeaveRequestContextDispatchContext } from "../../Context/LeaveRequestContext";
import { useContext, useEffect, useState } from "react";
import Layout1 from "../Layout1/Layout1";
import UserRow from "./UserRow";
function LeaveRequestList() {
    const { requests, dispatch } = useContext(LeaveRequestContextDispatchContext);
    const { coreData, coreDataDispatch } = useContext(CoreDataContext);
    const [userRow, updateUserRow] = useState([]);
    const [isLoading, updateIsLoading] = useState(true);
    const [currentPageIndex, updateCurrentPageIndex] = useState(0);
    const [pageSize, updatePageSize] = useState(100);
    const [totalCount, updateTotalCount] = useState(0);


    useEffect(() => {
        var jwt = coreData.jwt;
        if (jwt) {
            updateIsLoading(true);
            var url = new URL('https://queenslandraildev.service-now.com/api/queen/reactauth/getusers');
            var params = { pageIndex: currentPageIndex, pageSize: pageSize }
            url.search = new URLSearchParams(params).toString();
            const response = fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "JWT": jwt
                    }
                }).then(response => response.json()).then(t => {
                    var userList = t.result.user_list;
                    var userRow = [];
                    for (var i = 0; i < userList.length; i++) {
                        userRow.push(<UserRow user={userList[i]} />);
                    }
                    updateIsLoading(false);
                    updateUserRow(userRow);
                    updateTotalCount(t.result.totalCount);

                });
        }
    }, [currentPageIndex]);




    var x = [];

    /*for (var i = 0; i < requests.length; i++) {
        x.push(<LeaveRequest key={i} indexNumber={i} request={requests[i]} />)
    }*/
    return <Layout1><div>Leave request Management</div>
        <Paging currentPageIndex={currentPageIndex} pageIndexUpdater={updateCurrentPageIndex}
            totalCount={totalCount} pageSize={pageSize} />
        {isLoading ? <div>Loading... please wait</div>
            : <div>{userRow}</div>
        }

        <div>{x}</div>
    </Layout1>;

}
function Paging({ currentPageIndex, pageIndexUpdater, totalCount, pageSize }) {
    let disabled1 = false;
    if (currentPageIndex <= 0) {
        disabled1 = true;
    }
    let disabled2 = false;
    let lastPageIndex = Math.floor(totalCount / pageSize);
    if (currentPageIndex >= lastPageIndex) {
        disabled2 = true;
    }
    return <div>
        <button disabled={disabled1} onClick={() => {
            pageIndexUpdater(0);
        }}>First</button>
        <button disabled={disabled1} onClick={() => {
            pageIndexUpdater(currentPageIndex - 1);
        }}>Prev</button>
        <button disabled={disabled2} onClick={() => {
            pageIndexUpdater(Math.max(currentPageIndex + 1));
        }}>Next</button>
        <button disabled={disabled2} onClick={() => {
            pageIndexUpdater(lastPageIndex);
        }}>Last</button>
        <span>Viewing {currentPageIndex * pageSize + 1} to {Math.min(totalCount, (currentPageIndex + 1) * pageSize)} of {totalCount} </span>
    </div>
}
export default LeaveRequestList;