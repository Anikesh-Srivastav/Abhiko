import type { Post, Restaurant, User } from './types';

export const AVATARS = [
  'https://placehold.co/100x100.png',
  'https://placehold.co/100x100.png',
  'https://placehold.co/100x100.png',
  'https://placehold.co/100x100.png',
  'https://placehold.co/100x100.png',
];


export const RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'The Royal Tandoor',
    location: 'Mumbai, Maharashtra',
    image: 'https://placehold.co/600x400.png',
    cuisine: 'North Indian',
    menu: [
      { id: 'm1', name: 'Paneer Butter Masala', image: 'https://placehold.co/300x200.png', description: 'Cubes of fresh paneer simmered in a rich, creamy tomato and cashew gravy.', price: 370 },
      { id: 'm2', name: 'Dal Makhani', image: 'https://placehold.co/300x200.png', description: 'A classic slow-cooked black lentil curry with kidney beans, butter, and cream.', price: 320 },
      { id: 'm3', name: 'Garlic Naan', image: 'https://placehold.co/300x200.png', description: 'Soft, fluffy leavened bread baked in a tandoor and brushed with garlic butter.', price: 80 },
      { id: 'm4', name: 'Tandoori Chicken', image: 'https://placehold.co/300x200.png', description: 'Chicken marinated overnight in yogurt and a blend of spices, then roasted in a clay oven.', price: 480 },
      { id: 'm5', name: 'Mango Lassi', image: 'https://placehold.co/300x200.png', description: 'A creamy and refreshing yogurt drink blended with sweet mango pulp.', price: 140 },
      { id: 'm6', name: 'Gulab Jamun', image: 'https://placehold.co/300x200.png', description: 'Soft, melt-in-your-mouth milk-solid balls soaked in a fragrant rose-cardamom syrup.', price: 160 },
    ],
  },
  {
    id: 'r2',
    name: 'Coastal Curry House',
    location: 'Chennai, Tamil Nadu',
    image: 'https://placehold.co/600x400.png',
    cuisine: 'South Indian',
    menu: [
      { id: 'm7', name: 'Masala Dosa', image: 'https://placehold.co/300x200.png', description: 'A thin, crispy rice and lentil crepe filled with a savory spiced potato mash.', price: 160 },
      { id: 'm8', name: 'Idli Sambar', image: 'https://placehold.co/300x200.png', description: 'Pillowy soft steamed rice and lentil cakes served with a tangy vegetable stew.', price: 110 },
      { id: 'm9', name: 'Medu Vada', image: 'https://placehold.co/300x200.png', description: 'Crispy on the outside, fluffy on the inside savory lentil doughnuts, served with coconut chutney.', price: 90 },
      { id: 'm10', name: 'Rasam', image: 'https://placehold.co/300x200.png', description: 'A traditional tangy and spicy soup made with tamarind, tomatoes, and spices.', price: 70 },
      { id: 'm11', name: 'South Indian Filter Coffee', image: 'https://placehold.co/300x200.png', description: 'A strong, aromatic, and frothy milk coffee brewed with a traditional filter.', price: 60 },
      { id: 'm12', name: 'Chicken Chettinad', image: 'https://placehold.co/300x200.png', description: 'A fiery and aromatic chicken curry made with a blend of 28 roasted spices.', price: 400 },
    ],
  },
  {
    id: 'r3',
    name: 'Bengal Spice',
    location: 'Kolkata, West Bengal',
    image: 'https://placehold.co/600x400.png',
    cuisine: 'Bengali',
    menu: [
      { id: 'm13', name: 'Chicken Kathi Roll', image: 'https://placehold.co/300x200.png', description: 'Juicy chicken tikka, onions, and sauces wrapped in a flaky, pan-fried paratha.', price: 190 },
      { id: 'm14', name: 'Paneer Kathi Roll', image: 'https://placehold.co/300x200.png', description: 'Spiced paneer, mixed peppers, and tangy sauces in a soft paratha wrap.', price: 170 },
      { id: 'm15', name: 'Bhetki Fish Fry', image: 'https://placehold.co/300x200.png', description: 'A classic Kolkata snack featuring a crumb-fried fillet of Bhetki fish.', price: 280 },
      { id: 'm16', name: 'Kosha Mangsho', image: 'https://placehold.co/300x200.png', description: 'A rich, slow-cooked mutton curry with a thick, spicy gravy and tender meat.', price: 520 },
      { id: 'm17', name: 'Mishti Doi', image: 'https://placehold.co/300x200.png', description: 'A traditional sweet yogurt, fermented and caramelized to perfection.', price: 110 },
      { id: 'm18', name: 'Sondesh', image: 'https://placehold.co/300x200.png', description: 'A delicate Bengali sweet made from fresh cottage cheese (chhena) and sugar.', price: 100 },
    ],
  },
   {
    id: 'r4',
    name: 'Nizami Kitchens',
    location: 'Hyderabad, Telangana',
    image: 'https://placehold.co/600x400.png',
    cuisine: 'Hyderabadi',
    menu: [
      { id: 'm19', name: 'Chicken Dum Biryani', image: 'https://placehold.co/300x200.png', description: 'Fragrant basmati rice and tender chicken, slow-cooked in a sealed pot with saffron and spices.', price: 420 },
      { id: 'm20', name: 'Mutton Haleem', image: 'https://placehold.co/300x200.png', description: 'A rich, creamy paste of meat, lentils, and pounded wheat, cooked for hours.', price: 550 },
      { id: 'm21', name: 'Mirchi ka Salan', image: 'https://placehold.co/300x200.png', description: 'A tangy curry of green chillies cooked in a peanut, sesame, and coconut gravy.', price: 220 },
      { id: 'm22', name: 'Qubani ka Meetha', image: 'https://placehold.co/300x200.png', description: 'A classic Hyderabadi dessert of dried apricots, topped with fresh cream or custard.', price: 190 },
      { id: 'm23', name: 'Pathar ka Gosht', image: 'https://placehold.co/300x200.png', description: 'Mutton marinated and cooked on a hot stone slab, resulting in incredibly tender meat.', price: 600 },
      { id: 'm24', name: 'Double ka Meetha', image: 'https://placehold.co/300x200.png', description: 'A decadent bread pudding made of fried bread slices soaked in hot milk with saffron.', price: 170 },
    ],
  },
  {
    id: 'r5',
    name: 'Gujarat Grills',
    location: 'Ahmedabad, Gujarat',
    image: 'https://placehold.co/600x400.png',
    cuisine: 'Gujarati',
    menu: [
      { id: 'm25', name: 'Dhokla', image: 'https://placehold.co/300x200.png', description: 'A soft and spongy steamed cake made from fermented rice and chickpea flour.', price: 120 },
      { id: 'm26', name: 'Khandvi', image: 'https://placehold.co/300x200.png', description: 'Tightly rolled, bite-sized pieces of gram flour and yogurt, seasoned with mustard seeds.', price: 140 },
      { id: 'm27', name: 'Undhiyu', image: 'https://placehold.co/300x200.png', description: 'A classic mixed vegetable dish, slow-cooked upside down in an earthen pot.', price: 300 },
      { id: 'm28', name: 'Thepla', image: 'https://placehold.co/300x200.png', description: 'Soft flatbreads made from whole wheat flour, fenugreek leaves, and spices.', price: 90 },
      { id: 'm29', name: 'Basundi', image: 'https://placehold.co/300x200.png', description: 'A sweetened, dense milk dessert flavored with cardamom and nuts.', price: 180 },
      { id: 'm30', name: 'Fafda-Jalebi', image: 'https://placehold.co/300x200.png', description: 'The ultimate Gujarati breakfast combo of savory crunchy strips and sweet crispy spirals.', price: 150 },
    ],
  },
  {
    id: 'r6',
    name: 'Rajasthani Rasoi',
    location: 'Jaipur, Rajasthan',
    image: 'https://placehold.co/600x400.png',
    cuisine: 'Rajasthani',
    menu: [
      { id: 'm31', name: 'Dal Baati Churma', image: 'https://placehold.co/300x200.png', description: 'The iconic Rajasthani trio: baked wheat balls, spicy lentil curry, and sweet powdered wheat.', price: 450 },
      { id: 'm32', name: 'Laal Maas', image: 'https://placehold.co/300x200.png', description: 'A fiery mutton curry made with a paste of red Mathania chillies and hot spices.', price: 580 },
      { id: 'm33', name: 'Gatte ki Sabzi', image: 'https://placehold.co/300x200.png', description: 'Gram flour dumplings cooked in a tangy yogurt-based curry.', price: 280 },
      { id: 'm34', name: 'Ker Sangri', image: 'https://placehold.co/300x200.png', description: 'A unique tangy side dish made from desert beans and berries.', price: 320 },
      { id: 'm35', name: 'Pyaaz Kachori', image: 'https://placehold.co/300x200.png', description: 'A deep-fried pastry filled with a spicy onion mixture, served with chutney.', price: 80 },
      { id: 'm36', name: 'Ghevar', image: 'https://placehold.co/300x200.png', description: 'A disc-shaped sweet cake made from flour, soaked in sugar syrup, and topped with rabri.', price: 220 },
    ],
  },
];
