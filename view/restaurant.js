document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch("http://localhost:3000/restaurants");
    const data = await response.json();
    const restaurants = data.restaurants;
    
    const restaurantList = document.getElementById('restaurantList');
    restaurants.forEach(restaurant => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `restaurantdetails.html?id=${restaurant.id}`;
      link.innerHTML = `${restaurant.name} - ${restaurant.address}`;

      listItem.appendChild(link);
      restaurantList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
    // Handle error
  }
});
