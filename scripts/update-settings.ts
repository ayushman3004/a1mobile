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
      googleMapsUrl: "https://www.google.com/maps/place/26%C2%B046'32.2%22N+83%C2%B022'19.0%22E/@26.77561,83.3719368,17z",
      storeImageUrl: "/shop-front.png",
    };

    const res = await StoreSettings.updateMany({}, { $set: updateData });
    console.log("Updated StoreSettings in DB:", res);
  } catch (err: any) {
    console.log("DB update skipped or offline:", err.message);
  }
  process.exit(0);
}

main();
