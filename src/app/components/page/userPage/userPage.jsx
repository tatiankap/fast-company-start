import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useUser } from "./../../../hooks/useUsers";
import { useAuth } from "./../../../hooks/useAuth";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const user = useUser().getUserById(userId);
    const { currentUser } = useAuth();
    const newUser = user._id === currentUser._id ? currentUser : user;

    if (newUser) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={newUser} />
                        <QualitiesCard data={newUser.qualities} />
                        <MeetingsCard value={newUser.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
