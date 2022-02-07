import React, { useEffect } from "react";
import { orderBy } from "lodash";
import CommentsList, { AddCommentForm } from "../common/comments";
// import { useComments } from "./../../hooks/useComments";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";
import {
    loadCommentsList,
    getComments,
    createComment,
    removeComment,
    getCommentsLoadingStatus
} from "./../../store/comments";
import { nanoid } from "nanoid";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoadingStatus());
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const comments = useSelector(getComments());
    const currentUserId = useSelector(getCurrentUserId());

    const handleSubmit = (data) => {
        dispatch(
            createComment({
                ...data,
                pageId: userId,
                created_at: Date.now(),
                userId: currentUserId,
                _id: nanoid()
            })
        );
    };
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
