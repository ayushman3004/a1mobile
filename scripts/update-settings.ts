import { connectToDatabase } from "../src/lib/mongodb";
import { StoreSettings } from "../src/models/StoreSettings";

async function main() {
  try {
    await connectToDatabase();
    const updateData = {
      address: "Aluminium Factory Road, Basharatpur",
      city: "Gorakhpur",
      state: "Uttar Pradesh",
      pincode: "273004",
      landmark: "Aluminium Factory Road",
      phone: "+91 87269 42338",
      altPhone: "+91 87269 42338",
      whatsappNumber: "+918726942338",
      googleMapsUrl: "https://maps.google.com/?q=Aluminium+Factory+Road,+Basharatpur,+Gorakhpur,+Uttar+Pradesh+273004",
      storeImageUrl: "/store-real.jpg",
    };

    const res = await StoreSettings.updateMany({}, { $set: updateData });
    console.log("Updated StoreSettings in DB:", res);
  } catch (err: any) {
    console.log("DB update skipped or offline:", err.message);
  }
  process.exit(0);
}

main();
