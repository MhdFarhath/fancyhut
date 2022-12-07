import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const ResetPassword = () => {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    if(user){
        navigate('/AdminHome')
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/AdminHome");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/home");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="p-4 box">
                <h3 className="mb-3">Password Reset</h3>
                {/*{error && <Alert variant="danger">{error.replace('email', 'user name')}</Alert>}*/}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            placeholder="Enter your mail to sent reset password link"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Reset Password
                        </Button>
                    </div>
                </Form>
                <hr />
                {/* <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div> */}
            </div>
            {/* <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/Signups">Sign up</Link>
      </div> */}
        </>
    );
};

export default ResetPassword;
