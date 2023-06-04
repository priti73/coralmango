const otp=document.querySelector('#otp');

async function login(e){
    try{
         e.preventDefault();
         let otpdetails={
          otp:otp.value
        }
        console.log(otpdetails)
        const email=localStorage.getItem("email")
        console.log(email)
         const response= await axios.post(`http://localhost:3000/validateotp/${email}`,otpdetails )
         if(response.status==201){
          window.alert(response.data.message)
          window.location.href="./succesful.html"
         }
         else if(response.status==202){
          window.alert(response.data.message)
          window.location.href="./signup.html"
         }
         else if(response.status==203){
          window.alert(response.data.message)
          window.location.href="./validateotp.html"
         }
         else if(response.status==204){
          window.alert(response.data.message)
          window.location.href="./succesful.html"
         }
        }
        catch(err){
          console.log(err);
          document.body.innerHTML=`<div style="color:red;">${err.message} <div>`
     }
 }