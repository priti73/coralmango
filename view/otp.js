const otp = document.querySelector("#otp");

async function login(e) {
  try {
    e.preventDefault();
    let otpdetails = {
      otp: otp.value,
    };
    const token = localStorage.getItem("token");
    const response = await axios.post(`http://localhost:3000/otp`, otpdetails, {
      headers: { Authentication: token },
    });
    if (response.status == 400) {
      window.alert(response.data.error);
      window.location.href = "./otp.html";
    } else if (response.status == 201) {
      window.alert(response.data.message);

      // Store the user details in session storage or local storage
      const userDetails = response.data.userdetails;
      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      // Redirect to the new HTML page
      window.location.href = "restaurant.html";
    } else if (response.status == 202) {
      window.alert(response.data.message);
      window.location.href = "./login.html";
    } else if (response.status == 203) {
      window.alert(response.data.message);
      window.location.href = "./otp.html";
    }
  } catch (err) {
    console.log(err);
    document.body.innerHTML = `<div style="color:red;">${err.message} <div>`;
  }
}
