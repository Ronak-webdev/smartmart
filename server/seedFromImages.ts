import fs from "fs";
import path from "path";
import { prisma } from "./config/prisma.js";

const SOURCE_DIR = "C:\\Users\\shail\\OneDrive\\Desktop\\Images";
const DEST_DIR = path.resolve("../client/public/products");

// Mapping folder names to category slugs
const categoryMap: Record<string, string> = {
  "Babby Products": "baby-care",
  Bakery: "bakery",
  Beverages: "beverages",
  "Dairy&Milk": "dairy", // Wait, earlier I renamed it to dairy-eggs, wait no, the slug in assets.ts is "dairy-eggs"
  "Frozen Foods": "frozen-foods",
  "Fruits&Vegetables": "fruits-vegetables",
  "Pantry&Staples": "pantry-staples",
  "Personal Care": "personal-care",
  Snacks: "snacks",
};

// Spelling fixes for filenames
const spellingFixes: Record<string, string> = {
  "Bringle": "Brinjal",
  "cauliflower": "Cauliflower",
  "cooriander": "Coriander",
  "cucumber": "Cucumber",
  "OrangPumpkins": "Orange Pumpkins",
  "Pinaple": "Pineapple",
  "Potatos": "Potatoes",
  "Tomatos": "Tomatoes",
  "Black Papper": "Black Pepper",
  "Cardmom": "Cardamom",
  "Fresh MIlk": "Fresh Milk",
  "penuts": "Peanuts",
  "Sweet Papperika": "Sweet Paprika",
  "Tumeric Powder": "Turmeric Powder",
  "atural Glow Herbal Shampoo": "Natural Glow Herbal Shampoo",
  "Darmi Cool Powder": "Dermi Cool Powder",
  "Facemist and Tonor": "Facemist and Toner",
  "Suns cream": "Sunscreen",
  "Vitamin B3 fashwash": "Vitamin B3 Facewash",
  "Vitamin C cerum": "Vitamin C Serum",
  "Dairymilk": "Dairy Milk",
  "ChholeDosa": "Chhole Dosa",
  "Kajukatli": "Kaju Katli",
  "Mamra Laddu": "Mamra Laddu",
  "MenduVada": "Mendu Vada",
  "Hot Chilli Wafer": "Hot Chilli Wafers",
};

// Price generators based on category (INR)
const getPriceForCategory = (category: string) => {
  switch (category) {
    case "fruits-vegetables":
      return Math.floor(Math.random() * 150) + 20; // 20 to 170
    case "dairy":
    case "dairy-eggs":
      return Math.floor(Math.random() * 200) + 40;
    case "snacks":
    case "bakery":
    case "beverages":
      return Math.floor(Math.random() * 100) + 10;
    case "personal-care":
      return Math.floor(Math.random() * 400) + 100;
    case "baby-care":
      return Math.floor(Math.random() * 500) + 150;
    case "pantry-staples":
    case "frozen-foods":
      return Math.floor(Math.random() * 300) + 50;
    default:
      return Math.floor(Math.random() * 200) + 50;
  }
};

const seedDB = async () => {
  try {
    // Clear existing products
    await prisma.product.deleteMany({});
    console.log("Cleared existing products");

    if (!fs.existsSync(DEST_DIR)) {
      fs.mkdirSync(DEST_DIR, { recursive: true });
    }

    const products = [];

    const categories = fs.readdirSync(SOURCE_DIR);

    for (const folder of categories) {
      const folderPath = path.join(SOURCE_DIR, folder);
      if (fs.statSync(folderPath).isDirectory()) {
        const categorySlug = categoryMap[folder] || folder.toLowerCase().replace(/\s+/g, "-");
        // Ensure slug matches existing assets if necessary. Note: dairy-eggs is the slug in assets.ts for Dairy & Milk
        const finalSlug = categorySlug === "dairy" ? "dairy-eggs" : categorySlug;

        const categoryDestPath = path.join(DEST_DIR, finalSlug);
        if (!fs.existsSync(categoryDestPath)) {
          fs.mkdirSync(categoryDestPath, { recursive: true });
        }

        const files = fs.readdirSync(folderPath);
        for (const file of files) {
          const ext = path.extname(file);
          const baseName = path.basename(file, ext);
          
          let cleanName = baseName;
          if (spellingFixes[baseName]) {
            cleanName = spellingFixes[baseName];
          }

          const newFileName = cleanName.replace(/[^a-zA-Z0-9.\- ]/g, "").replace(/\s+/g, "_") + ext;
          const srcFilePath = path.join(folderPath, file);
          const destFilePath = path.join(categoryDestPath, newFileName);

          fs.copyFileSync(srcFilePath, destFilePath);

          const price = getPriceForCategory(finalSlug);
          // Give 30% of items a discount
          const originalPrice = Math.random() > 0.7 ? price + Math.floor(Math.random() * 50) + 10 : price;

          products.push({
            name: cleanName,
            description: `Premium quality ${cleanName} for your daily needs.`,
            price: price,
            originalPrice: originalPrice,
            image: `/products/${finalSlug}/${newFileName}`,
            category: finalSlug,
            unit: finalSlug === "beverages" ? "1L" : finalSlug === "fruits-vegetables" ? "1kg" : "1 pack",
            stock: Math.floor(Math.random() * 100) + 20,
            isOrganic: Math.random() > 0.8,
            rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5 to 5.0
            reviewCount: Math.floor(Math.random() * 200) + 10,
          });
        }
      }
    }

    await prisma.product.createMany({ data: products });
    console.log(`Created ${products.length} products successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seedDB();
