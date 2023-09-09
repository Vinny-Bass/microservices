import axios from "axios";
import React, { useState } from "react";

const CommentCreate = ({ postId }) => {
    const [comment, setComment] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault()

        if (comment !== "") {
            await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content: comment })

            setComment("")
        }
    } 
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New comment</label>
                    <input 
                        className="form-control"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <br />
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate