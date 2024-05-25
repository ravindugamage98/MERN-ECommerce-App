import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const searchRestaurant = async (req: Request, res: Response) => {
  try {
    // Getting the city parameter
    const city = req.params.city;

    // Filtering and searching options if they are in the request query parameters
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdate";
    const page = parseInt(req.query.page as string) || 1;

    // Initializing the query object
    let query: any = {};

    // Checking if there any rests in the given city
    // Defining an option for getting all the rests
    // RegExp basically means ignore case
    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);

    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      // url : selectedCuisines = italian, chinese, mexican
      // [italian, chinese, mexican]
      const cuisinesArray = selectedCuisines
        .split(",") // gives an array
        .map((cuisine) => new RegExp(cuisine, "i")); // For each cuisine in the array we will make a regexp that will be our search criteria

      // Finding a restaurant which includes all the items in the cuisines array
      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      // restaurantName = pizza palace
      // cuisines = [pizza, pasta, italian]
      // if search term equals to pasta then it will return the restaurant
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    // skip will determine how many records in the search results should skip based on the page n the page size
    const skip = (page - 1) * pageSize;

    // sortOption == "lastUpdate" then  we sort by last update date
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean(); // It trips out all mongoose ID and all  _v values

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  searchRestaurant,
  getRestaurant,
};
