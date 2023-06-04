document.addEventListener('DOMContentLoaded', async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('id');

    await fetchRestaurantDetails(restaurantId);
    await fetchRestaurantReviews(restaurantId);
  } catch (error) {
    console.error(error);
    // Handle error
  }
});

async function fetchRestaurantDetails(restaurantId) {
  try {
    const response = await fetch(`http://localhost:3000/restaurant/${restaurantId}`);
    const data = await response.json();
    const { restaurant } = data;

    const restaurantName = document.getElementById('restaurantName');
    restaurantName.innerHTML = restaurant.name;

    const restaurantAddress = document.getElementById('restaurantAddress');
    restaurantAddress.innerHTML = `Address: ${restaurant.address}`;

    const restaurantDescription = document.getElementById('restaurantDescription');
    restaurantDescription.innerHTML = `Description: ${restaurant.description}`;
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

async function fetchRestaurantReviews(restaurantId) {
  try {
    const response = await fetch(`http://localhost:3000/restaurant/${restaurantId}/reviews`);
    const data = await response.json();
    console.log(data)
    const { reviews } = data;
    console.log(reviews)
    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = ''; // Clear existing reviews

    reviews.forEach(review => {
      const listItem = document.createElement('li');
      listItem.innerText = review.review;
      reviewList.appendChild(listItem);
    });
  } catch (error) {
    console.log(error);
    // Handle error
  }
}
document.getElementById('reviewForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from being submitted normally

  const reviewInput = document.getElementById('reviewInput');
  const review = reviewInput.value;
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantId = urlParams.get('id');
  console.log(review)
  try {
    const response = await axios.post(`http://localhost:3000/restaurant/${restaurantId}/reviews`, {
      review
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response)
    if (response.status === 200) {
      // Review submitted successfully
      reviewInput.value = ''; // Clear the input field
      await fetchRestaurantReviews(restaurantId); // Refresh the review list
    } else {
      // Handle the error if the review submission fails
      console.error('Failed to submit review');
    }
  } catch (error) {
    console.error(error);
    // Handle error
  }
});
