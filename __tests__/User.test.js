//const {login} = require('../src/controllers/validators/UserAuth');
const ManagerRepository = require('../src/controllers/repositories/ManagerRepository');
const DriverRepository = require('../src/controllers/repositories/DriverRepository');
const {Car} = require('../src/models');

var driver;
var manager;

describe("User.Driver", ()=>{
    it("should create a Driver",async ()=>{
        driver = await DriverRepository.createDriver({
            name:'test1',
            email:'tes1@email.com',
            home_location:'Porto',
            password:'banana',
            cars:[{
                "brand":"test1",
                "model":"test1",
                "plate_number": "test1"
            }]
        });
        expect(driver).toBeDefined();
    });
    
    it("should update a Driver",async ()=>{
         let driverUpdated = await await DriverRepository.updateDriver({
            name:'test1.1'
        },{driver_id: driver.UserId});
        expect(driverUpdated).toBeDefined();
    });

    it("should delete a Driver",async ()=>{
        let driverDeleted = await DriverRepository.deleteDriver({driver_id:driver.UserId});
        expect(driverDeleted).toBeUndefined();
    });

    //Clean up
    it('cleanUp',async()=>{
        await Car.destroy({where:{plate_number:'test1'}});
        await driver.destroy();
    })
});

describe("User.Manager", ()=>{
    it("should create a Manager",async ()=>{
        manager = await ManagerRepository.createManager({
            name:'manager_test1',
            email:'manager_test1@email.com',
            password:'banana',
        });
        expect(manager).toBeDefined();
        expect(manager.userType).toBe('manager');
    });

    //Clean up
    it('cleanUp',async()=>{
        await manager.destroy();
        
    })
});