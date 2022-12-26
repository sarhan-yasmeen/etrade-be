import { faker } from "@faker-js/faker";
import { Product, IProduct } from "../modules/products/products.models";
import { ADMIN_ID } from "./config";
import mongoose from "mongoose";

const id = new mongoose.Types.ObjectId(ADMIN_ID);
const generateProducts = () => {
  const products: IProduct[] = [];
  //
  Array.from({ length: 500 }).forEach(() => {
    const fakeProduct: IProduct = {
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      category: faker.helpers.arrayElement(["office", "kitchen", "bedroom"]),
      averageRating: faker.datatype.number({ min: 1, max: 100 }),
      colors: faker.helpers.arrayElements(
        [
          faker.color.rgb(),
          faker.color.rgb(),
          faker.color.rgb(),
          faker.color.rgb(),
        ],
        faker.datatype.number({ min: 1, max: 4 })
      ),
      company: faker.helpers.arrayElement(["ikea", "liddy", "marcos"]),
      description: faker.commerce.productDescription(),
      featured: faker.datatype.boolean(),
      freeShipping: faker.datatype.boolean(),
      image: faker.image.fashion(640, 480, true),
      inventory: faker.datatype.number({ min: 1, max: 50 }),
      user: ADMIN_ID,
    };
    products.push(fakeProduct);
  });

  return products;
};

export const seedProducts = async () => {
  const products = generateProducts();
  // console.log("products", products);

  try {
    await Product.deleteMany({});
    console.log("product", products[0]);
    await Product.create(products);
  } catch (error) {
    console.log("error", error);
  }
};
