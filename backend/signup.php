<?php
// signup.php

include 'dbh.class.php';
include 'signup.class.php';

if(isset($_POST['signup'])){

    // Getting form values
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $phone = $_POST['phone'];
    $enrollment = $_POST['enrollment'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm_password'];

    // Validation for empty fields
    if(
        empty($firstname) ||
        empty($lastname) ||
        empty($phone) ||
        empty($enrollment) ||
        empty($email) ||
        empty($password) ||
        empty($confirmPassword)
    ){

        echo "<script>alert('Please fill all fields');</script>";
    }

    // Password matching validation
    elseif($password != $confirmPassword){

        echo "<script>alert('Passwords do not match');</script>";
    }

    else{

        // Creating Signup object
        $signup = new Signup();

        // Calling setUser method
        $result = $signup->setUser(
            $firstname,
            $lastname,
            $phone,
            $enrollment,
            $email,
            $password
        );

        // Checking registration status
        if($result){

            echo "<script>alert('Registration Successful');</script>";
        }
        else{

            echo "<script>alert('Registration Failed');</script>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>UniCore Registration</title>

    <style>

        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
            font-family:Arial, sans-serif;
        }

        body{
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            background:#f4f6f9;
        }

        .container{
            width:420px;
            background:#ffffff;
            padding:35px;
            border-radius:12px;
            box-shadow:0px 4px 15px rgba(0,0,0,0.1);
        }

        h2{
            text-align:center;
            margin-bottom:25px;
            color:#333;
        }

        .input-box{
            margin-bottom:18px;
        }

        .input-box label{
            display:block;
            margin-bottom:6px;
            color:#555;
            font-size:14px;
            font-weight:bold;
        }

        .input-box input{
            width:100%;
            padding:12px;
            border:1px solid #ccc;
            border-radius:8px;
            outline:none;
            font-size:14px;
        }

        .input-box input:focus{
            border-color:#4a90e2;
        }

        button{
            width:100%;
            padding:12px;
            border:none;
            border-radius:8px;
            background:#4a90e2;
            color:white;
            font-size:16px;
            cursor:pointer;
            transition:0.3s;
        }

        button:hover{
            background:#357abd;
        }

        .login-link{
            text-align:center;
            margin-top:18px;
        }

        .login-link a{
            text-decoration:none;
            color:#4a90e2;
            font-weight:bold;
        }

    </style>

</head>

<body>

<div class="container">

    <h2>UniCore Registration</h2>

    <form method="POST">

        <!-- First Name -->
        <div class="input-box">

            <label>First Name</label>

            <input 
                type="text" 
                name="firstname" 
                placeholder="Enter your first name"
                required
            >

        </div>

        <!-- Last Name -->
        <div class="input-box">

            <label>Last Name</label>

            <input 
                type="text" 
                name="lastname" 
                placeholder="Enter your last name"
                required
            >

        </div>

        <!-- Phone Number -->
        <div class="input-box">

            <label>Phone Number</label>

            <input 
                type="text" 
                name="phone" 
                placeholder="Enter your phone number"
                required
            >

        </div>

        <!-- Enrollment Number -->
        <div class="input-box">

            <label>Enrollment Number</label>

            <input 
                type="text" 
                name="enrollment" 
                placeholder="Enter your enrollment number"
                required
            >

        </div>

        <!-- Email -->
        <div class="input-box">

            <label>University Email Address</label>

            <input 
                type="email" 
                name="email" 
                placeholder="Enter your university email"
                required
            >

        </div>

        <!-- Password -->
        <div class="input-box">

            <label>Password</label>

            <input 
                type="password" 
                name="password" 
                placeholder="Create a password"
                required
            >

        </div>

        <!-- Confirm Password -->
        <div class="input-box">

            <label>Confirm Password</label>

            <input 
                type="password" 
                name="confirm_password" 
                placeholder="Re-enter your password"
                required
            >

        </div>

        <!-- Submit Button -->
        <button type="submit" name="signup">

            Sign Up

        </button>

    </form>

    <!-- Login Link -->
    <div class="login-link">

        Already have an account?

        <a href="login.php">Login</a>

    </div>

</div>

</body>
</html>