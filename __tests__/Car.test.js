const CarRepository = require('../src/controllers/repositories/CarRepository');

describe("Car", ()=>{
    it("should creater car with: brand, model, plate number and geolocation(optional)",async ()=>{
        const newCar = await CarRepository.createCar(
            {
                brand: "Toyota",
                model:"Yaris",
                plate_number:"JEST-001"
            },{}
        );
        expect(newCar.brand).toBe("Toyota");
        expect(newCar.model).toBe("Yaris");
        expect(newCar.plate_number).toBe("JEST-001");
        //expect(newCar.UserId).toBe(null);
    });

    it("should create car with geolocation",async ()=>{
        const newCar = await CarRepository.createCar(
            {
                brand: "Toyota",
                model:"Yaris",
                plate_number:"JEST-002",
                geolocation:{
                    longitude: -0.1278,
                    latitude: 51.5287
                }
            },{}
        );
        expect(newCar.brand).toBe("Toyota");
        expect(newCar.model).toBe("Yaris");
        expect(newCar.plate_number).toBe("JEST-002");
        expect(newCar.Geolocation.longitude).toBe(-0.1278);
        expect(newCar.Geolocation.latitude).toBe(51.5287);
    });

    it("should view the current geographical location of each car",async ()=>{
        const carsLocations = await CarRepository.showCarsLocations;
        expect(carsLocations).toBeDefined();
    });
    
    it("should search cars by brand",async ()=>{
        const cars = await CarRepository.showCarsByBrand("Toyota");
        expect(cars).toBeDefined();
    });

    it("should search cars by proximity(it must give a longitude, latitude and radius)",async ()=>{
        const cars = await CarRepository.showCarsByProximity(-0.1278,51.5287,100);
        expect(cars).toBeDefined();
    });
});