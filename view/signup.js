const name=document.querySelector('#name');
const email=document.querySelector('#email');

 async function signup(e){
   try{
        e.preventDefault();
        let userdetails={
            name:name.value,
            email:email.value,
          }
        
  console.log(userdetails);
    const response= await axios.post("http://localhost:3000/users/signup",
    userdetails)
    if(response.status==200){
     window.alert(response.data.message)
     window.location.href="./succesful.html"
    }
    else if(response.status==201){
      console.log(response)
      localStorage.setItem("email",response.data.email)
      window.alert(response.data.message)
      window.location.href="./validateotp.html"
    }
    else if(response.status==202){
      localStorage.setItem("email",response.data.email)
      window.alert(response.data.message)
      window.location.href="./validateotp.html"
    }
    }catch(err){
         console.log(err);
         document.body.innerHTML=`<div style="color:red;">${err.message} <div>`
    }
}