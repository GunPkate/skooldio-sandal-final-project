// GA4 e-commerce events for Google Tag Manager.
// GTM reads window.dataLayer; the container ID is set in index.html (VITE_GTM_ID).

export function toGaItem({ skuCode, name, price, quantity = 1, color, size }) {
  return {
    item_id: skuCode,
    item_name: name,
    price: Number(price) || 0,
    quantity: Number(quantity) || 1,
    item_variant: [color, size].filter(Boolean).join(" / ") || undefined,
  };
}

export function trackEcommerce(event, items) {
  const gaItems = items.map(toGaItem);
  const value = gaItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  window.dataLayer = window.dataLayer || [];
  // Clear the previous ecommerce object so its items do not leak into this event
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event,
    ecommerce: { currency: "THB", value, items: gaItems },
  });
}
