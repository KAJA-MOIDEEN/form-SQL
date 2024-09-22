const { sqlConnection } = require("../config/sqlConnection");
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    console.log(req.body);
    const { name, email, password, phone } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone) {
        
        return res.status(400).send("<h1>All fields are required</h1>");

    }

    try {
        // Check if the email already exists in the database
        const checkEmailQuery = 'SELECT email FROM users WHERE email = ?';
        sqlConnection.query(checkEmailQuery, [email], async (err, results) => {
            if (err) {
                console.error('Error checking email in the database:', err);
                return res.status(500).send('<h1>Server error occurred</h1>'); // Return to stop further execution
            }

            // If email exists, return error and stop further execution
            if (results.length > 0) {
                return res.status(404).json({message:"Email already exists"})
                
            }

            // If email doesn't exist, hash the password and insert new user
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
            const insertQuery = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
            sqlConnection.query(insertQuery, [name, email, hashedPassword, phone], (err, result) => {
                if (err) {
                    console.error('Error inserting data into the database:', err);
                    return res.status(500).send('<h1>Error saving user details</h1>'); // Return after sending response
                }

                return res.status(201).json({
                    message: "User registered successfully"
                }); // Always return after sending response
            });
        });
    } catch (error) {
        console.error('Error hashing the password:', error);
        return res.status(500).send('<h1>Server error occurred</h1>'); // Ensure you return here as well
    }
};

const login = (req, res) => {
    const { email, password } = req.body;

    // Validate email and password presence
    if (!email || !password) {
        return res.status(400).send('<h1>Email and password are required</h1>');
    }

    // Query to get the user by email
    const query = 'SELECT * FROM users WHERE email = ?';
    sqlConnection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('<h1>Server error occurred</h1>');
        }

        // Check if user exists
        if (results.length === 0) {
            return res.status(404).send('<h1>User not found</h1>');
        }

        const user = results[0];
        console.log(user)

        // Compare provided password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).send('<h1>Server error occurred</h1>');
            }

            if (!isMatch) {
                return res.status(401).send('<h1>Invalid email or password</h1>');
            }   

            // Successful login
            res.status(200).json({
                message: "Login successful",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                }
            });
        });
    });
};



const update = (req,res)=>{
    const { id, name, email, password, phone } = req.body;
    const query = 'UPDATE'

}

const deleteDetail = ()=>{

}

module.exports = {
    signUp,
    login,
    update,
    deleteDetail
}
