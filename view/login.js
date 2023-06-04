const email=document.querySelector('#email');
const password=document.querySelector('#password');

 async function login(e){
   try{
        e.preventDefault();
        let logindetails={
            email:email.value,
          }
      
    console.log(logindetails);
    const response= await axios.post("http://localhost:3000/users/login",
    logindetails)
    console.log(response)
    if(response.status==204){
      window.alert(response.data.message)
      window.location.href="./login.html"
      
       }
      else if(response.status==200){
        window.alert(response.data.message)
        window.location.href="./validateotp.html"
         }
      else if(response.status==202){
          window.alert(response.data.message)
          window.location.href="./signup.html"
           } 
     else if(response.status==201){
        window.alert(response.data.message)
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('UUID',response.data.UUID)
        window.location.href="./otp.html"
        
         }
    
        }catch(err){
         console.log(err);
         document.body.innerHTML=`<div style="color:red;">${err.message} <div>`
    }
}
