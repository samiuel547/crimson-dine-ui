import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  ArrowLeft, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ChevronRight,
  User as UserIcon,
  Home as HomeIcon,
  History,
  Heart,
  LogOut,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import { useStore } from './store/useStore';
import { RESTAURANTS, CATEGORIES } from './data/mockData';
import { Restaurant, MenuItem, CartItem } from './types';
import { Toaster, toast } from 'sonner';

// --- COMPONENTS ---

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }: any) => {
  const baseStyles = "w-full py-4 rounded-2xl font-semibold transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants: any = {
    primary: "bg-[#E63946] text-white shadow-lg shadow-red-200",
    secondary: "bg-[#F1FAEE] text-[#E63946]",
    outline: "border-2 border-[#E63946] text-[#E63946]",
    ghost: "bg-transparent text-gray-500",
  };
  
  return (
    <button 
      disabled={disabled}
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

const Input = ({ icon: Icon, label, type = 'text', value, onChange, placeholder }: any) => (
  <div className="space-y-2">
    {label && <label className="text-sm font-medium text-gray-700 ml-1">{label}</label>}
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E63946] transition-colors">
        <Icon size={20} />
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#E63946]/20 focus:border-[#E63946] outline-none transition-all"
      />
    </div>
  </div>
);

// --- SCREENS ---

const Onboarding = ({ onFinish }: { onFinish: () => void }) => {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Choose Your Favorites",
      desc: "Order from your favorite restaurants and track them in real-time.",
      img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3975a0ae-5fc7-44c9-8078-dacbce71ffff/restaurant-bg-1-1f233963-1771628771082.webp"
    },
    {
      title: "Fastest Delivery",
      desc: "Our delivery partners are lightning fast and reliable.",
      img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3975a0ae-5fc7-44c9-8078-dacbce71ffff/delivery-person-8494762a-1771628778865.webp"
    },
    {
      title: "Hot & Fresh",
      desc: "Delicious meals delivered straight to your doorstep.",
      img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3975a0ae-5fc7-44c9-8078-dacbce71ffff/burger-hero-3784af2f-1771628771284.webp"
    }
  ];

  return (
    <div className="h-screen flex flex-col bg-[#F1FAEE]">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-full aspect-square rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <img src={steps[step].img} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{steps[step].title}</h1>
            <p className="text-gray-500 leading-relaxed max-w-xs">{steps[step].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 space-y-4">
        <div className="flex justify-center gap-2 mb-4">
          {steps.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === step ? 'w-8 bg-[#E63946]' : 'w-2 bg-gray-300'}`} />
          ))}
        </div>
        <Button onClick={() => step < 2 ? setStep(step + 1) : onFinish()}>
          {step === 2 ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
};

const Auth = ({ onAuth }: { onAuth: () => void }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) return toast.error("Please fill all fields");
    toast.success(mode === 'signin' ? "Welcome back!" : "Account created successfully!");
    onAuth();
  };

  return (
    <div className="min-h-screen bg-[#F1FAEE] p-8 flex flex-col">
      <div className="mt-12 mb-12">
        <h1 className="text-4xl font-black text-[#E63946] mb-2">Foodie</h1>
        <p className="text-gray-500 font-medium">Deliciousness delivered.</p>
      </div>

      <div className="flex-1 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {mode === 'signin' ? "Welcome Back" : "Create Account"}
        </h2>
        
        <Input 
          icon={Mail} 
          label="Email Address" 
          placeholder="hello@example.com" 
          value={email}
          onChange={setEmail}
        />
        
        <div className="relative">
          <Input 
            icon={Lock} 
            label="Password" 
            type={showPass ? 'text' : 'password'} 
            placeholder="••••••••" 
            value={password}
            onChange={setPassword}
          />
          <button 
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 bottom-4 text-gray-400"
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {mode === 'signin' && (
          <button className="text-[#E63946] text-sm font-semibold ml-auto block">
            Forgot Password?
          </button>
        )}

        <Button onClick={handleSubmit}>
          {mode === 'signin' ? "Sign In" : "Sign Up"}
        </Button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-4 bg-[#F1FAEE] text-gray-500">Or continue with</span></div>
        </div>

        <button className="w-full py-4 bg-white border border-gray-200 rounded-2xl flex items-center justify-center gap-3 font-semibold text-gray-700 shadow-sm active:scale-95 transition-all">
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
          Google
        </button>
      </div>

      <div className="mt-auto pt-8 text-center">
        <p className="text-gray-500">
          {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="text-[#E63946] font-bold">
            {mode === 'signin' ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

const Dashboard = ({ onSelectRestaurant, onProfile }: any) => {
  const [activeCategory, setActiveCategory] = useState('1');
  const [search, setSearch] = useState('');

  const filteredRestaurants = RESTAURANTS.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.categories.some(c => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-1 bg-[#F1FAEE] overflow-y-auto pb-32">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#E63946]">
            <MapPin size={20} />
            <span className="font-bold text-gray-900">San Francisco, CA</span>
          </div>
          <button onClick={onProfile} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
            <UserIcon size={20} className="text-gray-600" />
          </button>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900">What would you like<br/>to eat today?</h1>
        
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search restaurants, dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 shadow-sm border-none focus:ring-2 focus:ring-[#E63946]/10 outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex overflow-x-auto px-6 gap-4 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[80px] transition-all ${
                activeCategory === cat.id ? 'bg-[#E63946] text-white shadow-lg' : 'bg-white text-gray-500'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-bold">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="px-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Featured Restaurants</h2>
          <button className="text-[#E63946] text-sm font-semibold">See all</button>
        </div>
        
        <div className="space-y-6">
          {filteredRestaurants.map((res) => (
            <motion.div 
              whileTap={{ scale: 0.98 }}
              key={res.id} 
              onClick={() => onSelectRestaurant(res)}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="relative h-48">
                <img src={res.image} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star size={14} className="fill-[#E63946] text-[#E63946]" />
                  <span className="text-xs font-bold">{res.rating}</span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900">{res.name}</h3>
                  <span className="text-[#E63946] font-bold">{res.priceRange}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{res.deliveryTime}</span>
                  </div>
                  <span>•</span>
                  <span>{res.categories.join(', ')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RestaurantDetail = ({ restaurant, onBack }: { restaurant: Restaurant, onBack: () => void }) => {
  const { addToCart, cart } = useStore();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart({ ...selectedItem, quantity });
      toast.success(`${selectedItem.name} added to cart`);
      setSelectedItem(null);
      setQuantity(1);
    }
  };

  return (
    <div className="h-screen bg-[#F1FAEE] flex flex-col relative">
      <div className="relative h-[40vh]">
        <img src={restaurant.image} className="w-full h-full object-cover" />
        <button 
          onClick={onBack}
          className="absolute top-12 left-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-90"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
        <button className="absolute top-12 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-90">
          <Heart size={20} className="text-[#E63946]" />
        </button>
      </div>

      <div className="flex-1 bg-white -mt-10 rounded-t-[40px] px-6 pt-8 pb-32 overflow-y-auto">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl font-black text-gray-900">{restaurant.name}</h1>
          <div className="bg-[#F1FAEE] p-2 rounded-xl flex items-center gap-1">
            <Star size={16} className="fill-[#E63946] text-[#E63946]" />
            <span className="font-bold text-[#E63946]">{restaurant.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-500 mb-6">{restaurant.categories.join(' • ')} • {restaurant.deliveryTime}</p>

        <div className="space-y-8">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          {restaurant.menu.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className="flex gap-4 items-center group cursor-pointer"
            >
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-gray-900 group-hover:text-[#E63946] transition-colors">{item.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                <p className="text-lg font-bold text-[#E63946] mt-1">${item.price.toFixed(2)}</p>
              </div>
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm">
                <img src={item.image} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary Float */}
      {cart.length > 0 && (
        <div className="absolute bottom-10 left-6 right-6 z-10">
          <Button onClick={() => {}} className="flex justify-between px-6">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} />
              <span>{cart.reduce((acc, i) => acc + i.quantity, 0)} items</span>
            </div>
            <span>${cart.reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2)}</span>
          </Button>
        </div>
      )}

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full bg-white rounded-t-[40px] p-8"
            >
              <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto mb-8" />
              <img src={selectedItem.image} className="w-full h-48 object-cover rounded-3xl mb-6 shadow-xl" />
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
                <p className="text-2xl font-black text-[#E63946]">${selectedItem.price.toFixed(2)}</p>
              </div>
              <p className="text-gray-500 mb-8 leading-relaxed">{selectedItem.description}</p>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-2xl">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-600 shadow-sm"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="font-bold text-xl w-6 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl bg-[#E63946] flex items-center justify-center text-white shadow-md"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 font-medium">Total Price</p>
                  <p className="text-2xl font-black text-gray-900">${(selectedItem.price * quantity).toFixed(2)}</p>
                </div>
              </div>

              <Button onClick={handleAddToCart}>Add to Cart</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CartScreen = ({ onCheckout }: any) => {
  const { cart, updateQuantity, removeFromCart } = useStore();
  const subtotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="h-screen bg-[#F1FAEE] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
          <ShoppingBag size={40} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button onClick={onCheckout} variant="secondary">Go back shopping</Button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#F1FAEE] flex flex-col">
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-white">
        <h1 className="text-2xl font-black text-gray-900">Your Cart</h1>
        <button className="text-[#E63946] font-bold">Clear All</button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-4 bg-white p-4 rounded-3xl shadow-sm">
            <img src={item.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
            <div className="flex-1 flex flex-col justify-between py-1">
              <div className="flex justify-between">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <p className="font-bold text-[#E63946]">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}
                    className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-gray-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-[#E63946] flex items-center justify-center text-white"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between text-gray-500">
            <span>Subtotal</span>
            <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <span>Delivery Fee</span>
            <span className="font-bold text-gray-900">${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-black text-[#E63946]">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Delivery Address</h3>
              <button className="text-[#E63946] text-xs font-bold">Change</button>
           </div>
           <div className="flex items-center gap-3 text-gray-500">
              <div className="w-10 h-10 rounded-xl bg-[#F1FAEE] flex items-center justify-center text-[#E63946]">
                <MapPin size={20} />
              </div>
              <p className="text-sm">242 Park Avenue, New York, NY 10003</p>
           </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-gray-100">
        <Button onClick={onCheckout}>Checkout Now</Button>
      </div>
    </div>
  );
};

const OrderTracking = ({ onBack }: any) => {
  const [status, setStatus] = useState(0); // 0: Preparing, 1: Out for Delivery, 2: Delivered

  // Simulate progress
  React.useEffect(() => {
    const timer = setInterval(() => {
      setStatus(s => s < 2 ? s + 1 : s);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const statuses = [
    { label: "Preparing", desc: "The kitchen is making your food", icon: <Clock /> },
    { label: "Out for Delivery", desc: "Rider is on the way", icon: <MapPin /> },
    { label: "Delivered", desc: "Enjoy your meal!", icon: <CheckCircle2 /> },
  ];

  return (
    <div className="h-screen bg-[#F1FAEE] flex flex-col">
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 bg-white">
        <button onClick={onBack}><ArrowLeft size={24} /></button>
        <h1 className="text-xl font-black text-gray-900">Track Order</h1>
      </div>

      <div className="flex-1 p-6 space-y-8">
        <div className="bg-white p-8 rounded-[40px] shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><ShoppingBag size={80} /></div>
          <p className="text-sm font-bold text-[#E63946] mb-2 uppercase tracking-widest">Estimated Time</p>
          <h2 className="text-5xl font-black text-gray-900 mb-8">25-30 Min</h2>
          
          <div className="flex justify-between relative mb-12">
            <div className="absolute top-1/2 -translate-y-1/2 h-1 bg-gray-100 w-full" />
            <div className="absolute top-1/2 -translate-y-1/2 h-1 bg-[#E63946] transition-all duration-1000" style={{ width: `${(status / 2) * 100}%` }} />
            {[0, 1, 2].map((i) => (
              <div 
                key={i} 
                className={`w-6 h-6 rounded-full relative z-10 flex items-center justify-center transition-all ${
                  i <= status ? 'bg-[#E63946] scale-125' : 'bg-white border-2 border-gray-100'
                }`}
              >
                {i < status && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            ))}
          </div>

          <div className="space-y-6 text-left">
            {statuses.map((s, i) => (
              <div key={i} className={`flex gap-4 transition-opacity ${i > status ? 'opacity-30' : 'opacity-100'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${i === status ? 'bg-[#E63946] text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
                  {React.cloneElement(s.icon as any, { size: 24 })}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{s.label}</h4>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm">
          <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3975a0ae-5fc7-44c9-8078-dacbce71ffff/delivery-person-8494762a-1771628778865.webp" className="w-14 h-14 rounded-2xl object-cover" />
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">James Wilson</h4>
            <p className="text-xs text-gray-500">Your Delivery Rider</p>
          </div>
          <button className="w-12 h-12 rounded-2xl bg-[#F1FAEE] flex items-center justify-center text-[#E63946]">
            <Mail size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-6">
         <Button onClick={onBack} variant="outline">Back to Home</Button>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const { onboarded, setOnboarded, user, setUser, selectedRestaurant, setSelectedRestaurant, clearCart } = useStore();
  const [currentTab, setCurrentTab] = useState('home');
  const [view, setView] = useState<'dashboard' | 'restaurant' | 'cart' | 'tracking'>('dashboard');

  if (!onboarded) {
    return <Onboarding onFinish={() => setOnboarded(true)} />;
  }

  if (!user) {
    return <Auth onAuth={() => setUser({ id: '1', name: 'John Doe', email: 'john@example.com' })} />;
  }

  const renderContent = () => {
    switch (view) {
      case 'tracking':
        return <OrderTracking onBack={() => { setView('dashboard'); clearCart(); }} />;
      case 'cart':
        return (
          <CartScreen 
            onCheckout={() => {
              toast.success("Payment successful! Order placed.");
              setView('tracking');
            }} 
          />
        );
      case 'restaurant':
        return selectedRestaurant ? (
          <RestaurantDetail 
            restaurant={selectedRestaurant} 
            onBack={() => { setView('dashboard'); setSelectedRestaurant(null); }} 
          />
        ) : null;
      default:
        return (
          <Dashboard 
            onSelectRestaurant={(res: Restaurant) => {
              setSelectedRestaurant(res);
              setView('restaurant');
            }} 
            onProfile={() => setUser(null)}
          />
        );
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-white shadow-2xl relative flex flex-col overflow-hidden">
      <Toaster position="top-center" richColors />
      
      {renderContent()}

      {/* Bottom Navigation */}
      {view === 'dashboard' && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-4 px-6 pb-8">
          <button onClick={() => setCurrentTab('home')} className={`flex flex-col items-center gap-1 ${currentTab === 'home' ? 'text-[#E63946]' : 'text-gray-400'}`}>
            <HomeIcon size={24} />
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button onClick={() => setCurrentTab('orders')} className={`flex flex-col items-center gap-1 ${currentTab === 'orders' ? 'text-[#E63946]' : 'text-gray-400'}`}>
            <History size={24} />
            <span className="text-[10px] font-bold">Orders</span>
          </button>
          <button onClick={() => setView('cart')} className={`flex flex-col items-center gap-1 relative ${currentTab === 'cart' ? 'text-[#E63946]' : 'text-gray-400'}`}>
            <ShoppingBag size={24} />
            <span className="text-[10px] font-bold">Cart</span>
          </button>
          <button onClick={() => setCurrentTab('profile')} className={`flex flex-col items-center gap-1 ${currentTab === 'profile' ? 'text-[#E63946]' : 'text-gray-400'}`}>
            <UserIcon size={24} />
            <span className="text-[10px] font-bold">Profile</span>
          </button>
        </div>
      )}
    </div>
  );
}