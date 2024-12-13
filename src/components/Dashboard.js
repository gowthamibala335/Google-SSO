import React from 'react';
import './Dashboard.css';
import suvImage from '../assets/suv.jpg';
import electic from '../assets/electric.png';
import minivan from '../assets/minivan.jpg';
import sedan from '../assets/sedan.jpg';
import truck from '../assets/truck.png';
import convertible from '../assets/convertable.jpg';
import coupe from '../assets/coupe.jpg';
import hatchback from '../assets/hatchback.jpg';

const automobileData = [
  { title: 'SUV', price: '$30,000', rating: 4.5, image: suvImage, description: 'A spacious and comfortable vehicle for families.' },
  { title: 'Sedan', price: '$20,000', rating: 4.2, image: sedan, description: 'A sleek, stylish, and affordable option.', badge: 'Best Seller' },
  { title: 'Truck', price: '$40,000', rating: 4.7, image: truck, description: 'Perfect for heavy-duty tasks.', badge: 'Trending' },
  { title: 'Convertible', price: '$50,000', rating: 4.0, image: convertible, description: 'Experience the open road with this stylish car.' },
  { title: 'Coupe', price: '$25,000', rating: 4.3, image: coupe, description: 'Sporty and compact for a thrilling ride.' },
  { title: 'Hatchback', price: '$18,000', rating: 4.6, image: hatchback, description: 'Perfect blend of practicality and style.' },
  { title: 'Minivan', price: '$35,000', rating: 4.4, image: minivan, description: 'Spacious and versatile for families.', badge: 'Family Friendly' },
  { title: 'Electric', price: '$60,000', rating: 4.8, image: electic, description: 'Eco-friendly and high-tech.' },
  { title: 'Luxury', price: '$70,000', rating: 4.9, image: 'https://via.placeholder.com/150', description: 'Top-of-the-line luxury vehicle.', badge: 'Premium' },
  { title: 'Sports Car', price: '$80,000', rating: 5.0, image: 'https://via.placeholder.com/150', description: 'Unmatched speed and performance.', badge: 'Performance' },
];

const badgeColors = {
  'Popular': '#ff6347',
  'Best Seller': '#32cd32',
  'Trending': '#ff9900',
  'Luxury': '#4b0082',
  'Sporty': '#ff1493',
  'Affordable': '#1e90ff',
  'Family Friendly': '#00bfff',
  'Eco-Friendly': '#228b22',
  'Premium': '#8a2be2',
  'Performance': '#ff4500',
};

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="automobile-categories">
        {automobileData.map((auto, index) => (
          <div key={index} className="automobile-card">
            <div className="card-header">
              {auto.image ? (
                <img src={auto.image} alt={auto.title} className="automobile-image" />
              ) : (
                <div className="placeholder-image">No Image Available</div>
              )}
              <span className="badge" style={{ backgroundColor: badgeColors[auto.badge] }}>
                {auto.badge}
              </span>
            </div>
            <div >
              <h2 className="title" style={{ margin: 4 }}>{auto.title}</h2>
              <p className="price" style={{ margin: 4 }}>{auto.price}</p>
              <p className="rating" style={{ margin: 4 }}>Rating: {auto.rating} ⭐</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
