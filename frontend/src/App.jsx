import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChefHat,
  Clock3,
  Flame,
  Camera,
  MapPin,
  Menu,
  Minus,

  Plus,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import './App.css';


const categories = [
  { name: 'Burgers', detail: 'Big bites, bold flavour', emoji: '🍔', tone: 'peach' },
  { name: 'Pizza', detail: 'A slice of happiness', emoji: '🍕', tone: 'yellow' },
  { name: 'Chicken', detail: 'Crispy. Juicy. Irresistible.', emoji: '🍗', tone: 'sage' },
  { name: 'Sides', detail: 'Little things, big joy', emoji: '🍟', tone: 'lavender' },
];

const products = [
  {
    id: 1,
    name: 'The Cravory Classic',
    description: 'Smashed beef, cheddar, house sauce, toasted brioche.',
    price: 890,
    category: 'Burgers',
    emoji: '🍔',
    tag: 'BESTSELLER',
    tone: 'product-peach',
  },
  {
    id: 2,
    name: 'Firecracker Burger',
    description: 'Crispy chicken, spicy mayo, fresh slaw, pickles.',
    price: 790,
    category: 'Burgers',
    emoji: '🍔',
    tag: 'A LITTLE HEAT',
    tone: 'product-yellow',
  },
  {
    id: 3,
    name: 'Garden Party Pizza',
    description: 'Mozzarella, roasted peppers, olives, herby tomato sauce.',
    price: 1190,
    category: 'Pizza',
    emoji: '🍕',
    tag: 'VEGGIE FAVOURITE',
    tone: 'product-sage',
  },
  {
    id: 4,
    name: 'Golden Crunch Box',
    description: 'Golden fried chicken, seasoned fries, signature dip.',
    price: 990,
    category: 'Chicken',
    emoji: '🍗',
    tag: 'CRUNCH TIME',
    tone: 'product-lavender',
  },
  {
    id: 5,
    name: 'Double Trouble Burger',
    description: 'Two juicy beef patties, melted cheese, pickles and house sauce.',
    price: 1290,
    category: 'Burgers',
    emoji: '🍔',
    tag: 'DOUBLE THE JOY',
    tone: 'product-lavender',
  },
  {
    id: 6,
    name: 'Smoky BBQ Burger',
    description: 'Grilled beef, smoky BBQ glaze, cheddar and crispy onions.',
    price: 1090,
    category: 'Burgers',
    emoji: '🍔',
    tag: 'SMOKY & BOLD',
    tone: 'product-sage',
  },
  {
    id: 7,
    name: 'Pepperoni Party Pizza',
    description: 'Classic tomato sauce, mozzarella and savoury pepperoni.',
    price: 1390,
    category: 'Pizza',
    emoji: '🍕',
    tag: 'A CLASSIC',
    tone: 'product-peach',
  },
  {
    id: 8,
    name: 'Fiery Fajita Pizza',
    description: 'Spiced chicken, peppers, onions and melted mozzarella.',
    price: 1490,
    category: 'Pizza',
    emoji: '🍕',
    tag: 'SPICE IT UP',
    tone: 'product-yellow',
  },
  {
    id: 9,
    name: 'Crispy Chicken Strips',
    description: 'Golden crunchy chicken strips served with signature dip.',
    price: 750,
    category: 'Chicken',
    emoji: '🍗',
    tag: 'CRUNCHY FAVOURITE',
    tone: 'product-yellow',
  },
  {
    id: 10,
    name: 'Hot Wings Box',
    description: 'Juicy wings tossed in a tangy, spicy house glaze.',
    price: 850,
    category: 'Chicken',
    emoji: '🍗',
    tag: 'TURN UP THE HEAT',
    tone: 'product-peach',
  },
  {
    id: 11,
    name: 'Loaded Cheese Fries',
    description: 'Crispy seasoned fries topped with creamy cheese sauce.',
    price: 490,
    category: 'Sides',
    emoji: '🍟',
    tag: 'COMFORT FOOD',
    tone: 'product-lavender',
  },
  {
    id: 12,
    name: 'Garlic Parmesan Bites',
    description: 'Golden potato bites with garlic, herbs and parmesan-style seasoning.',
    price: 550,
    category: 'Sides',
    emoji: '🥔',
    tag: 'GREAT FOR SHARING',
    tone: 'product-sage',
  },
];

const formatPrice = (price) =>
  `Rs. ${price.toLocaleString('en-PK')}`;

const WHATSAPP_ORDER_NUMBER = '923277495256';

function App() {
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [fulfillmentMethod, setFulfillmentMethod] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderReviewOpen, setOrderReviewOpen] = useState(false);

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = products.reduce(
    (sum, product) => sum + product.price * (cart[product.id] || 0),
    0,
  );

  const visibleProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory);

  function resetOrderingState() {
    setCart({});
    try {
      localStorage.removeItem('cravory-cart');
    } catch {
      // Reset still works if browser storage is unavailable.
    }
    setActiveCategory('All');
    setMobileMenuOpen(false);
    setNotice('');
    setFulfillmentMethod(null);
    setCustomerName('');
    setCustomerPhone('');
    setDeliveryAddress('');
    setPickupLocation('');
    setOrderNotes('');
    setOrderReviewOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateCart(productId, change) {
    setCart((current) => {
      const nextQuantity = Math.max(0, (current[productId] || 0) + change);
      const next = { ...current };

      if (nextQuantity === 0) {
        delete next[productId];
      } else {
        next[productId] = nextQuantity;
      }

      return next;
    });

    if (change > 0) {
      const product = products.find((item) => item.id === productId);
      setNotice(`${product.name} added to your bag`);
      window.setTimeout(() => setNotice(''), 2400);
    }
  }

  function scrollToMenu(category = 'All') {
    setActiveCategory(category);
    window.setTimeout(() => {
      document.getElementById('product-grid')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 80);
    setMobileMenuOpen(false);
  }

  function scrollToFulfillment() {
    window.setTimeout(() => {
      document.querySelector('.fulfillment-options-compact')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 80);
  }

  function handleCheckout() {
    if (!cartCount) {
      setNotice('Your bag is empty. Pick something delicious first!');
      window.setTimeout(() => setNotice(''), 3500);
      return;
    }

    if (!fulfillmentMethod) {
      setNotice('Choose delivery or pickup before checkout.');
      document.getElementById('ordering')?.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => setNotice(''), 3500);
      return;
    }

    document.getElementById('order-details')?.scrollIntoView({ behavior: 'smooth' });
  }

  /* Cravory order review step */
  function handleWhatsAppOrder(event) {
    event.preventDefault();

    if (!cartCount || !fulfillmentMethod) {
      setNotice('Choose your order type and add items before continuing.');
      return;
    }

    setOrderReviewOpen(true);

    // Scroll to the review panel after React renders it.
    window.setTimeout(() => {
      document.querySelector('.order-review-panel')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }

  function handleConfirmOrder() {
    handleSendOrderRequest();
  }


  function handleSendOrderRequest() {
    if (!cartCount || !fulfillmentMethod) {
      setOrderReviewOpen(false);
      setNotice('Your bag is empty or your order type is missing.');
      return;
    }

    const orderItems = products
      .filter((product) => (cart[product.id] || 0) > 0)
      .map((product) => {
        const quantity = cart[product.id];
        return `- ${product.name} x ${quantity} = ${formatPrice(product.price * quantity)}`;
      });

    const orderType = fulfillmentMethod === 'delivery'
      ? 'Delivery'
      : 'Pickup / Takeaway';

    const lines = [
      '*NEW CRAVORY ORDER*',
      '',
      `*Order type:* ${orderType}`,
      `*Customer:* ${customerName.trim()}`,
      `*Phone:* ${customerPhone.trim()}`,
      ...(fulfillmentMethod === 'delivery'
        ? [`*Delivery address:* ${deliveryAddress.trim()}`]
        : [`*Preferred pickup location:* ${pickupLocation.trim()}`]),
      '',
      '*Order items:*',
      ...orderItems,
      '',
      `*Subtotal:* ${formatPrice(cartTotal)}`,
      ...(orderNotes.trim() ? ['', `*Additional notes:* ${orderNotes.trim()}`] : []),
      '',
      'Please confirm availability, any delivery fee, and the final total.',
    ];

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;

    window.location.assign(whatsappUrl);
  }

  return (
    <div className="site-shell">
      <div className="announcement-bar">
        <Sparkles size={14} aria-hidden="true" />
        <span>GOOD FOOD, GOOD MOOD. THAT'S THE CRAVORY WAY.</span>
        <span className="announcement-right">MADE FRESH. MADE FOR YOU.</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Cravory home">
          <span className="brand-mark">c.</span>
          <span className="brand-name">cravory<span>.</span></span>
        </a>

        <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <a className="nav-link nav-active" href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a className="nav-link" href="#menu" onClick={() => setMobileMenuOpen(false)}>Our Menu</a>
          <a className="nav-link" href="#deals" onClick={() => setMobileMenuOpen(false)}>The Good Deals</a>
          <a className="nav-link" href="#about" onClick={() => setMobileMenuOpen(false)}>Our Story</a>
        </nav>

        <div className="header-actions">
          <a className="location-link" href="#locations">
            <MapPin size={16} />
            <span>Find us</span>
          </a>
          <button className="bag-button" onClick={handleCheckout} aria-label={`Shopping bag, ${cartCount} items`}>
            <ShoppingBag size={18} />
            <span>My Bag</span>
            <span className="bag-count">{cartCount}</span>
          </button>
          <button
            className="mobile-menu-button"
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEW FAVOURITE FOOD SPOT</div>
            <h1>Big cravings.<br /> <span>Little wait.</span><br />All good.</h1>
            <p className="hero-description">
              The kind of food that turns an ordinary day into a really good one.
              Freshly made, packed with flavour, and always worth the craving.
            </p>
            <div className="hero-actions">
              <button className="button-primary" onClick={() => document.getElementById("ordering")?.scrollIntoView({ behavior: "smooth" })}>
                Explore the menu <ArrowRight size={18} />
              </button>
              <a className="text-link" href="#deals">See what's cooking <ArrowUpRight size={17} /></a>
            </div>
            <div className="hero-perks">
              <div className="perk-icon"><Truck size={19} /></div>
              <div><strong>At your doorstep</strong><span>Delivery made easy</span></div>
              <span className="perk-divider" />
              <div className="perk-icon"><Clock3 size={19} /></div>
              <div><strong>Fresh, always</strong><span>Made when you order</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-backdrop" />
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <img
              className="hero-food-photo"
              src={`${import.meta.env.BASE_URL}images/cravory-burger.png`}
              alt="Delicious burger served with golden fries"
              fetchPriority="high"
            />
            <div className="floating-note note-top"><Flame size={17} /> <span>Made with<br /><strong>extra love</strong></span></div>
            <div className="floating-note note-bottom"><span className="rating-star">★</span><span><strong>Worth every bite</strong><br />Your next food obsession</span></div>
            <div className="hero-sticker">CRAVE<br />MORE<span>!</span></div>
            <div className="hero-caption">G

        
OOD FOOD. YOUR WAY.</div>
          </div>
        </section>

        <section className="ordering-experience" id="ordering">
        <div className="category-section section-wrap" aria-labelledby="category-heading">
          <div className="section-heading">
            <div>
              <div className="eyebrow">FOLLOW YOUR APPETITE</div>
              <h2 id="category-heading">What are you <span>feeling?</span></h2>
            </div>
            <button
              type="button"
              className="text-link category-all"
              onClick={() => scrollToMenu('All')}
            >
              Everything, please <ArrowDownRight size={18} />
            </button>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`category-card ${category.tone}`}
                onClick={() => scrollToMenu(category.name)}
              >
                <span className="category-emoji" role="img" aria-label={category.name}>{category.emoji}</span>
                <span className="category-card-text"><strong>{category.name}</strong><small>{category.detail}</small></span>
                <span className="category-arrow"><ArrowUpRight size={18} /></span>
              </button>
            ))}
          </div>
        </div>

        <div className="menu-section" id="menu">
          <div className="section-wrap">
            <div className="section-heading menu-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-dot" /> THE CROWD PLEASERS</div>
                <h2>Meet your next <span>favourite.</span></h2>
                <p className="section-description">Good ingredients. Big flavour. Absolutely no boring bites.</p>
              </div>
              <div className="menu-heading-actions">
                <div className="menu-stamp"><ChefHat size={20} /><span>MADE FRESH<br />JUST FOR YOU</span></div>
                <button
                  type="button"
                  className="menu-refresh-button"
                  onClick={resetOrderingState}
                  aria-label="Refresh page and menu"
                  title="Refresh page"
                >
                  <span aria-hidden="true">↻</span> Refresh
                </button>
              </div>
            </div>

            <div className="fulfillment-options fulfillment-options-compact">
            <button
              type="button"
              className={`fulfillment-card ${fulfillmentMethod === 'delivery' ? 'fulfillment-card-active' : ''}`}
              aria-pressed={fulfillmentMethod === 'delivery'}
              onClick={() => { setFulfillmentMethod('delivery'); scrollToFulfillment(); }}
            >
              <span className="fulfillment-icon"><Truck size={28} /></span>
              <span className="fulfillment-card-copy">
                <strong>Delivery</strong>
                <span>Bring the good stuff to my door.</span>
                <span className="fulfillment-card-link">
                  {fulfillmentMethod === 'delivery' ? 'Selected' : 'Choose delivery'} <ArrowRight size={16} />
                </span>
              </span>
            </button>

            <button
              type="button"
              className={`fulfillment-card ${fulfillmentMethod === 'pickup' ? 'fulfillment-card-active' : ''}`}
              aria-pressed={fulfillmentMethod === 'pickup'}
              onClick={() => { setFulfillmentMethod('pickup'); scrollToFulfillment(); }}
            >
              <span className="fulfillment-icon"><MapPin size={28} /></span>
              <span className="fulfillment-card-copy">
                <strong>Pickup / Takeaway</strong>
                <span>I’ll collect my order from a branch.</span>
                <span className="fulfillment-card-link">
                  {fulfillmentMethod === 'pickup' ? 'Selected' : 'Choose pickup'} <ArrowRight size={16} />
                </span>
              </span>
            </button>
          </div>

            <div className="filter-row" aria-label="Filter menu by category">
              {['All', 'Burgers', 'Pizza', 'Chicken', 'Sides'].map((category) => (
                <button
                  key={category}
                  className={`filter-chip ${activeCategory === category ? 'filter-active' : ''}`}
                  onClick={() => scrollToMenu(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="product-grid" id="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className={`product-visual ${product.tone}`}>
                    <span className="product-tag">{product.tag}</span>
                    <span className="product-emoji" role="img" aria-label={product.name}>{product.emoji}</span>
                    <span className="product-decoration">✳</span>
                  </div>
                  <div className="product-info">
                    <div className="product-category">{product.category}</div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-bottom">
                      <strong className="product-price">{formatPrice(product.price)}</strong>
                      {(cart[product.id] || 0) === 0 ? (
                        <button className="add-button" onClick={() => updateCart(product.id, 1)} aria-label={`Add ${product.name} to bag`}>
                          <Plus size={19} />
                        </button>
                      ) : (
                        <div className="quantity-control" aria-label={`${product.name} quantity`}>
                          <button onClick={() => updateCart(product.id, -1)} aria-label="Remove one"><Minus size={15} /></button>
                          <span>{cart[product.id]}</span>
                          <button onClick={() => updateCart(product.id, 1)} aria-label="Add one"><Plus size={15} /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="menu-bottom">
              <p>Can't decide? That's a good problem to have.</p>
              <button
                type="button"
                className="button-outline"
                onClick={() => {
                  setActiveCategory('All');
                  setNotice('Showing all Cravory favourites!');
                  window.setTimeout(() => setNotice(''), 2400);
                }}
              >
                Show all favourites <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>


        <div className="order-details-section section-wrap" id="order-details">
          <div className="order-details-heading">
            <div className="eyebrow"><span className="eyebrow-dot" /> ALMOST THERE</div>
            <h2>Let's get your <span>order.</span></h2>
            <p>Share your details, review your order, and submit your order request.</p>
          </div>

          {!cartCount ? (
            <div className="order-checkout-message">
              <ShoppingBag size={25} />
              <p>Your bag is empty. Add something delicious from our menu to continue.</p>
              <button type="button" className="button-primary" onClick={() => scrollToMenu()}>
                Browse menu <ArrowRight size={17} />
              </button>
            </div>
          ) : !fulfillmentMethod ? (
            <div className="order-checkout-message">
              <MapPin size={25} />
              <p>Choose delivery or pickup first so we know how you want to receive your order.</p>
              <button
                type="button"
                className="button-primary"
                onClick={scrollToFulfillment}
              >
                Choose order type <ArrowRight size={17} />
              </button>
            </div>
          ) : orderReviewOpen ? (
            <div className="order-review-panel">
              <div className="order-review-header">
                <div className="eyebrow"><span className="eyebrow-dot" /> PLEASE CHECK YOUR ORDER</div>
                <h3>Everything <span>look right?</span></h3>
                <p>Review your details before sending your order request.</p>
              </div>

              <div className="order-review-grid">
                <div className="order-review-card">
                  <h4>Customer details</h4>
                  <div className="order-review-detail">
                    <span>Name</span>
                    <strong>{customerName.trim()}</strong>
                  </div>
                  <div className="order-review-detail">
                    <span>Phone</span>
                    <strong>{customerPhone.trim()}</strong>
                  </div>
                  <div className="order-review-detail">
                    <span>{fulfillmentMethod === 'delivery' ? 'Delivery address' : 'Pickup location'}</span>
                    <strong>
                      {fulfillmentMethod === 'delivery'
                        ? deliveryAddress.trim()
                        : pickupLocation.trim()}
                    </strong>
                  </div>
                  {orderNotes.trim() && (
                    <div className="order-review-detail">
                      <span>Order notes</span>
                      <strong>{orderNotes.trim()}</strong>
                    </div>
                  )}
                  <button
                    type="button"
                    className="order-review-back"
                    onClick={() => setOrderReviewOpen(false)}
                  >
                    Edit details
                  </button>
                </div>

                <div className="order-review-card">
                  <h4>Your items</h4>
                  <div className="checkout-items">
                    {products.filter((product) => (cart[product.id] || 0) > 0).map((product) => (
                      <div className="checkout-item" key={product.id}>
                        <span className="checkout-item-emoji" aria-hidden="true">{product.emoji}</span>
                        <div className="checkout-item-copy">
                          <strong>{product.name}</strong>
                          <small>{cart[product.id]} × {formatPrice(product.price)}</small>
                        </div>
                        <strong>{formatPrice(product.price * cart[product.id])}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="checkout-subtotal">
                    <span>Subtotal</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>
                  <p className="checkout-fee-note">
                    {fulfillmentMethod === 'delivery'
                      ? 'Delivery charges and the final total will be confirmed by Cravory.'
                      : 'Cravory will confirm pickup availability and the final total.'}
                  </p>
                </div>
              </div>

              <div className="order-review-actions">
                <button
                  type="button"
                  className="button-outline"
                  onClick={() => setOrderReviewOpen(false)}
                >
                  Go back
                </button>
                <button
                  type="button"
                  className="whatsapp-order-button"
                  onClick={handleConfirmOrder}
                >
                  <ShoppingBag size={19} />
                  Confirm Order
                  <ArrowRight size={18} />
                </button>
              </div>
              <p className="checkout-disclaimer">
                Confirm to open your prepared WhatsApp order message. You must press Send, and Cravory must reply to confirm your order.
              </p>
            </div>
          ) : (
            <div className="order-checkout-layout">
              <form className="customer-details-form" onSubmit={handleWhatsAppOrder}>
                <div className="checkout-type-label">
                  <span>{fulfillmentMethod === 'delivery' ? '🚚' : '📍'}</span>
                  <div>
                    <strong>{fulfillmentMethod === 'delivery' ? 'Delivery order' : 'Pickup / Takeaway order'}</strong>
                    <p>
                      {fulfillmentMethod === 'delivery'
                        ? 'Where should we bring your food?'
                        : 'Where would you prefer to collect your food?'}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="checkout-change-type"
                    onClick={scrollToFulfillment}
                  >
                    Change
                  </button>
                </div>

                <label className="checkout-field">
                  <span>Your name *</span>
                  <input
                    type="text"
                    autoComplete="name"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder="Enter your full name"
                    maxLength={100}
                    required
                  />
                </label>

                <label className="checkout-field">
                  <span>Phone number *</span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={customerPhone}
                    onChange={(event) => setCustomerPhone(event.target.value)}
                    placeholder="e.g. 03XXXXXXXXX"
                    maxLength={25}
                    required
                  />
                </label>

                {fulfillmentMethod === 'delivery' ? (
                  <label className="checkout-field">
                    <span>Full delivery address *</span>
                    <textarea
                      autoComplete="street-address"
                      value={deliveryAddress}
                      onChange={(event) => setDeliveryAddress(event.target.value)}
                      placeholder="House / street, area, city, and nearby landmark"
                      rows={3}
                      maxLength={500}
                      required
                    />
                  </label>
                ) : (
                  <label className="checkout-field">
                    <span>Preferred pickup branch / location *</span>
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(event) => setPickupLocation(event.target.value)}
                      placeholder="Enter the branch or location you prefer"
                      maxLength={200}
                      required
                    />
                    <small>Our team will confirm the available pickup location with you.</small>
                  </label>
                )}

                <label className="checkout-field">
                  <span>Order notes <span className="optional-label">(optional)</span></span>
                  <textarea
                    value={orderNotes}
                    onChange={(event) => setOrderNotes(event.target.value)}
                    placeholder="Special instructions or preferences"
                    rows={2}
                    maxLength={500}
                  />
                </label>

                <button type="submit" className="whatsapp-order-button">
                  <ShoppingBag size={20} />
                  Place Order
                  <ArrowRight size={18} />
                </button>
                <p className="checkout-disclaimer">
                  Your order details open in your messaging app. Review the message and press Send. Your order is confirmed only after Cravory replies.
                </p>
              </form>

              <aside className="checkout-order-summary">
                <h3>Your order</h3>
                <div className="checkout-items">
                  {products.filter((product) => (cart[product.id] || 0) > 0).map((product) => (
                    <div className="checkout-item" key={product.id}>
                      <span className="checkout-item-emoji" aria-hidden="true">{product.emoji}</span>
                      <div className="checkout-item-copy">
                        <strong>{product.name}</strong>
                        <small>{cart[product.id]} × {formatPrice(product.price)}</small>
                      </div>
                      <strong>{formatPrice(product.price * cart[product.id])}</strong>
                    </div>
                  ))}
                </div>
                <div className="checkout-subtotal">
                  <span>Subtotal</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <p className="checkout-fee-note">
                  Our team will confirm delivery charges, availability, and the final total.
                </p>
              </aside>
            </div>
          )}
        </div>

        </section>

      <section className="deal-section section-wrap" id="deals">
          <div className="deal-card">
            <div className="deal-copy">
              <div className="eyebrow deal-eyebrow"><Sparkles size={14} /> A LITTLE SOMETHING EXTRA</div>
              <h2>Good food is<br />better <span>together.</span></h2>
              <p>Round up your favourite people, pick your favourite bites, and make a meal out of it. Your next happy moment starts here.</p>
              <button className="button-light" onClick={() => scrollToMenu()}>
                Find your favourites <ArrowRight size={17} />
              </button>
            </div>
            <div className="deal-art">
              <div className="deal-circle"><span>GOOD<br />VIBES<br /><strong>ONLY</strong></span></div>
              <span className="deal-food deal-food-one">🍟</span>
              <span className="deal-food deal-food-two">🍕</span>
              <span className="deal-food deal-food-three">🥤</span>
              <span className="deal-art-star">✳</span>
            </div>
          </div>
        </section>

        <section className="promise-section section-wrap" id="about">
          <div className="promise-heading">
            <div className="eyebrow">A NOTE FROM OUR KITCHEN</div>
            <h2>We take food<br /><span>personally.</span></h2>
          </div>
          <div className="promise-copy">
            <p>We believe a great meal is more than something on a plate. It's a little break in a busy day, a shared laugh, a craving finally satisfied.</p>
            <p>That's why we're here to make food you look forward to, with flavour worth coming back for.</p>
            <a className="text-link" href="#locations">A little more about us <ArrowUpRight size={17} /></a>
          </div>
          <div className="promise-note"><Check size={18} /><span>GOOD FOOD<br />NO COMPLICATED STUFF</span></div>
        </section>

        <section className="location-section" id="locations">
          <div className="section-wrap location-inner">
            <div><div className="eyebrow">COME SAY HELLO</div><h2>Your table,<br /><span>your way.</span></h2></div>
            <div className="location-action">
              <p>Ordering in or picking up on the way? We're building a simpler way to get your Cravory favourites.</p>
              <button className="button-primary" onClick={() => scrollToMenu()}>Order something good <ArrowRight size={18} /></button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main section-wrap">
          <div className="footer-brand-column">
            <a className="brand footer-brand" href="#home"><span className="brand-mark">c.</span><span className="brand-name">cravory<span>.</span></span></a>
            <p>Good food. Your way.<br />That's the whole idea.</p>
            <a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={19} /></a>
          </div>
          <div className="footer-column"><h3>Hungry?</h3><a href="#menu">Our menu</a><a href="#deals">The good deals</a><a href="#locations">Find us</a></div>
          <div className="footer-column"><h3>The Cravory bit</h3><a href="#about">Our story</a><a href="mailto:hello@cravory.example">Get in touch</a><a href="#locations">Delivery info</a></div>
          <div className="footer-signoff"><span className="footer-star">✳</span><p>Made for cravings.<br /><strong>Built around good food.</strong></p></div>
        </div>
        <div className="footer-bottom section-wrap"><span>© {new Date().getFullYear()} Cravory. Made with appetite.</span><span>FRESH THINKING. GOOD EATING.</span></div>
      </footer>

      {notice && (
        <div className="toast-message" role="status">
          <Check size={18} /> <span>{notice}</span>
          <button aria-label="Dismiss notification" onClick={() => setNotice('')}><X size={16} /></button>
        </div>
      )}

      {cartCount > 0 && (
        <button className="floating-cart" onClick={handleCheckout}>
          <ShoppingBag size={19} /><span>{cartCount} {cartCount === 1 ? 'item' : 'items'}</span><strong>{formatPrice(cartTotal)}</strong><ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}

export default App;
