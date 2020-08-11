import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBMedia } from "mdbreact";


const Profile = ({ authorName, avatar, cv,  email }) => {

    return (
        <MDBContainer>
            <MDBMedia className="d-block d-md-flex mt-4">
                <img className="card-img-64 d-flex mx-auto mb-3" src={avatar} alt="avatar" />
                <MDBMedia body className="text-center text-md-left ml-md-3 ml-0">
                    <h5 className="font-weight-bold mt-0">
                        {authorName}
                    </h5>
                    {cv}
                </MDBMedia>
              
            </MDBMedia>
            <div>Contact details: <span> {email}</span></div>
        </MDBContainer>
    );

}
export default Profile;