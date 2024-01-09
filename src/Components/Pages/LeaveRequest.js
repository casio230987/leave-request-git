import { useState, useContext } from 'react';
import { LeaveRequestContextDispatchContext } from "../../Context/LeaveRequestContext";
function LeaveRequest({ indexNumber, request }) {
    const [isEditing, setIsEditing] = useState(false);
    const {requests,dispatch} = useContext(LeaveRequestContextDispatchContext);
    const [newText, setNewText] = useState(request.text);
    let requestContent;
    if (isEditing) {
        requestContent = (
            <>
                <input
                    value={newText}
                    onChange={e => {
                        setNewText(e.target.value);
                    }} />
                <button onClick={() => {
                    dispatch({
                        type: 'changed',
                        request: { ...request, text: newText }
                    });
                    setIsEditing(false);
                }
                }>
                    Save
                </button>
            </>
        );
    } else {
        requestContent = (
            <>
                {request.text}
                <button onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            </>
        );
    }


    return (
        <div><span>{indexNumber}</span>
            <input
                type="checkbox"
                checked={request.done}
                onChange={e => {

                    request.done = e.target.checked;
                    dispatch({
                        type: 'changed',
                        request: { ...request, done: e.target.checked }
                    });
                }}
            />
            {requestContent}
            {isEditing &&
                 <button onClick={() => {
                    setNewText(request.text);
                    setIsEditing(false);
                }}>
                    Cancel Editing
                </button>
            }

            <button onClick={() => {
                dispatch({
                    type: 'deleted',
                    id: request.id
                });
            }}>
                Cancel
            </button>
        </div>
    );
}

export default LeaveRequest;