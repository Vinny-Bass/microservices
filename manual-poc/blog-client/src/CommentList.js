import React from "react";

const CommentList = ({ comments }) => {

    const renderedComments = comments.map(comment => {
        let content

        if (comment.status === "approved") {
            content = comment.content
        }

        if (comment.status === "denied") {
            content = "This comment has been moderated"
        }

        if (comment.status === "pending") {
            content = "This comment is waiting for moderation"
        }


        return (
            <li key={comment.id}>
                {content}
            </li>
        )
    })

    return (
        <div>
            {renderedComments}
        </div>
    )
}

export default CommentList