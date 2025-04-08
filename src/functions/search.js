function filterGuests( guests, guest ) {
    const regex = new RegExp(guest, "i"); // "i" para ignorar mayúsculas/minúsculas
    return guests.filter(guest => 
      regex.test(guest.name || "") || 
      regex.test(guest.email || "")
    );
  }

export default filterGuests