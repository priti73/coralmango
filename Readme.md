* if admin want to see details total reviews, restauarnt name, id

SELECT
  r.id AS ID,
  r.name AS `Restaurant Name`,
  COUNT(rv.id) AS `Total Reviews`
FROM
  restaurant r
  LEFT JOIN review rv ON r.id = rv.restaurantId
GROUP BY
  r.id, r.name;

* install npm, express,otp-generater, bycrpt, sequelize,mysql2, sib-api-v3-sdk,@sendinblue/client,dotenv

* OTP-based login implemented
* JSON Web Token is used for authentication. The code for authentication is written in the auth.js file in the middleware folder.

* Sendinblue is used for sending the OTP to the user's email. The code for sending emails is written in the sendemail.js file in the util folder. I have created a function to send emails to make the code more readable.This function is used twice in the code.

* An OTP generator is used to generate a new OTP.The function written in the generateuniqueotp.js file in the util folder is responsible for generating a unique OTP. It ensures that each OTP generated is unique and not repeated. This function is used twice in the code.

* Bcrypt.hash is used for hashing the OTP so that others cannot retrieve the OTP from the database even if they have access to it. Bcrypt.compare and salt are used for OTP verification.

* The validateemail function, presumably written using regular expressions (regex), is responsible for validating the format of an email address. It uses a pattern defined by the regex to check if the provided email address matches the expected format. This helps ensure that the email entered by the user is in a valid format before further processing.

* Secrets and important information are stored in the .env file.

* All possible edge cases are handled in the controller folder.



