import { useState } from "react";
import '../SignupPage/signup.css';
import axios from "axios";
import { toast } from 'react-toastify';


export const SignUp = () => {
    const initialvalue = {
        name: "",
        phone: "",
        email: "",
        password: ""
    };

    const [getform, setform] = useState(initialvalue);

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setform((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await axios.post('http://localhost:3000/v1/signup', getform);
            toast.success(res.data.message)  // Show success message
            // console.log(res.data.message);  // Log the server response
        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data.message);  // Show specific error message from server
            } else {
                toast.error("Something went wrong. Please try again.");  // Generic error message
            }
            
            console.error("Error during form submission:", err);  // Log the error
        }
    
        
    };
    

    console.log(getform)

    return (
        <>
            <div className="signup-body">
                <div className="signup-container">
                    <h2>Signup</h2>
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                value={getform.name}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                onChange={handleChange}
                                value={getform.phone}
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                value={getform.email}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                value={getform.password}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <input type="submit" value="Sign Up" />
                        <br />
                        <input
                            type="reset"
                            value="Reset"
                            onClick={() => setform(initialvalue)}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};
