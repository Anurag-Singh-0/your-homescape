window.onload = function () {
  var map = L.map("map").setView([lati, long], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; HomeScape",
  }).addTo(map);

  const customIcon = L.icon({
    iconUrl: "/images/Logo.png", // Make sure this image exists in public/images/
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
  });

  L.marker([lati, long], { icon: customIcon })
    .addTo(map)
    .bindPopup(title)
    .openPopup();
};
