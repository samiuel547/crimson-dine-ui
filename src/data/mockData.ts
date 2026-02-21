import { Restaurant, Category } from '../types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Burger', icon: '🍔' },
  { id: '2', name: 'Pizza', icon: '🍕' },
  { id: '3', name: 'Sushi', icon: '🍣' },
  { id: '4', name: 'Salad', icon: '🥗' },
  { id: '5', name: 'Dessert', icon: '🍰' },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'res-1',
    name: 'Burger King Master',
    rating: 4.8,
    deliveryTime: '20-30 min',
    priceRange: '$$',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3975a0ae-5fc7-44c9-8078-dacbce71ffff/burger-hero-3784af2f-1771628771284.webp',
    categories: ['Burger', 'Fast Food'],
    menu: [
      {
        id: 'm1',
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with cheddar cheese, lettuce, and our secret sauce.',
        price: 12.99,
        image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3975a0ae-5fc7-44c9-8078-dacbce71ffff/burger-hero-3784af2f-1771628771284.webp',
        category: 'Burger'
      },
      {
        id: 'm2',
        name: 'Double Bacon Burger',
        description: 'Two beef patties, crispy bacon, and smoky BBQ sauce.',
        price: 15.99,
        image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3975a0ae-5fc7-44c9-8078-dacbce71ffff/burger-hero-3784af2f-1771628771284.webp',
        category: 'Burger'
      }
    ]
  },
  {
    id: 'res-2',
    name: 'Pizza Napoletana',
    rating: 4.9,
    deliveryTime: '30-45 min',
    priceRange: '$$$',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3975a0ae-5fc7-44c9-8078-dacbce71ffff/pizza-hero-cb319ee6-1771628776153.webp',
    categories: ['Pizza', 'Italian'],
    menu: [
      {
        id: 'm3',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomato sauce, and basil leaves.',
        price: 18.50,
        image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3975a0ae-5fc7-44c9-8078-dacbce71ffff/pizza-hero-cb319ee6-1771628776153.webp',
        category: 'Pizza'
      }
    ]
  },
  {
    id: 'res-3',
    name: 'Sushi Zen Garden',
    rating: 4.7,
    deliveryTime: '25-40 min',
    priceRange: '$$$',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3975a0ae-5fc7-44c9-8078-dacbce71ffff/sushi-hero-3dee0beb-1771628771833.webp',
    categories: ['Sushi', 'Japanese'],
    menu: [
      {
        id: 'm4',
        name: 'Salmon Nigiri Set',
        description: '6 pieces of fresh Atlantic salmon nigiri.',
        price: 22.00,
        image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3975a0ae-5fc7-44c9-8078-dacbce71ffff/sushi-hero-3dee0beb-1771628771833.webp',
        category: 'Sushi'
      }
    ]
  },
  {
    id: 'res-4',
    name: 'Green & Fresh',
    rating: 4.5,
    deliveryTime: '15-25 min',
    priceRange: '$',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3975a0ae-5fc7-44c9-8078-dacbce71ffff/salad-hero-0038b1f2-1771628778593.webp',
    categories: ['Salad', 'Healthy'],
    menu: [
      {
        id: 'm5',
        name: 'Chicken Caesar Salad',
        description: 'Grilled chicken breast, romaine lettuce, croutons, and parmesan.',
        price: 14.50,
        image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3975a0ae-5fc7-44c9-8078-dacbce71ffff/salad-hero-0038b1f2-1771628778593.webp',
        category: 'Salad'
      }
    ]
  }
];