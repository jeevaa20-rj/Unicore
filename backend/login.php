<?php
// login.php

include 'config/dbh.class.php';
include 'login.class.php';

if(isset($_POST['login'])){

    // Getting form values
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Checking empty fields
    if(empty($email) || empty($password)){

        echo "<script>alert('Please fill all fields');</script>";
    }

    else{

        // Creating Login object
        $login = new Login();

        // Calling getUser method
        $result = $login->getUser($email, $password);

        // Checking login status
        if($result){

            echo "<script>alert('Login Successful');</script>";
        }
        else{

            echo "<script>alert('Invalid Email or Password');</script>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>UniCore Login</title>

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
            width:400px;
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

        .signup-link{
            text-align:center;
            margin-top:18px;
        }

        .signup-link a{
            text-decoration:none;
            color:#4a90e2;
            font-weight:bold;
        }

    </style>

</head>

<body>

<div class="container">

    <h2>UniCore Login</h2>

    <form method="POST">

        <!-- Email -->
        <div class="input-box">

            <label>University Email Address</label>

            <input
                type="email"
                name="email"
                placeholder="Enter your university email address"
                required
            >

        </div>

        <!-- Password -->
        <div class="input-box">

            <label>Password</label>

            <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
            >

        </div>

        <!-- Login Button -->
        <button type="submit" name="login">

            Login

        </button>

    </form>

    <!-- Signup Link -->
    <div class="signup-link">

        Don't have an account?

        <a href="signup.php">Create Account</a>

    </div>

</div>

</body>
</html>