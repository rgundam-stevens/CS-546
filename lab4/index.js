const restaurants = require("./data/restaurants");
const connection = require('./config/mongoConnection');


async function main() {
    let safrronLounge1;
    let safrronLounge;
    try {
        safrronLounge1 = await restaurants.create("The Saffron Lounge", "New York City, New York", "123-456-7890", "http://www.saffronlounge.com", "$$$$", ["Cuban", "Italian"], 3, {dineIn: true, takeOut: true, delivery: false});
        console.log(safrronLounge1);
    } 
catch (e) {
    console.log(e);
}
try {
        safrronLounge = await restaurants.create("The Rohit Lounge", "Jersey City, New Jersey", "123-456-4560", "http://www.jerseycity.com", "$$$$", ["Mexican", "Italian"], 4, {dineIn: false, takeOut: true, delivery: false});
        console.log(safrronLounge);
    } 
     catch (e) {
        console.log(e);
}
try {
        const allResturants = await restaurants.getAll();
        console.log(allResturants);
} catch (e) {
    console.log(e);
}
try {
        const safrronLounge2= await restaurants.create("The Varun Lounge", "Mexico City, Mexico", "321-987-7890", "http://www.mexicocanvas.com", "$$$$", ["french", "indian"], 5, {dineIn: true, takeOut: true, delivery: true});
        console.log(safrronLounge2);
    }
 catch (e) {
    console.log(e);
}     
try {
    
    const renamedSaffronLounge3 = await restaurants.rename(safrronLounge1._id, "http://www.thesaffronlounge.com"); 
 console.log(renamedSaffronLounge3); 
}  catch (e) {
    console.log(e);
}
try {
    const removeBlackBear = await restaurants.remove(safrronLounge._id); 
 console.log(removeBlackBear); 
}  catch (e) {
    console.log(e);
}
try {
    const allResturants1 = await restaurants.getAll();
    console.log(allResturants1);
} catch (e) {
    console.log(e);
}
try {
    const safrronLounge4 = await restaurants.create("The Saffron Lounge", "New York City, New York", "12345-456-7890", "http://www.saffronlounge.com", "$$$$", ["Cuban", "Italian"], 1, {dineIn: false, takeOut: true, delivery: false});
    console.log(safrronLounge4);
} catch (e) {
    console.log(e);
}
try {
    const removeBlackBear1 = await restaurants.remove("6165bf81e47c7f404dd94897"); 
 console.log(removeBlackBear1); 
}
catch (e) {
    console.log(e);
    }
    try {
        const renamedSaffronLounge5= await restaurants.rename("6165bf81e47c7f404dd94897", "http://www.mtgarunlounge.com"); 
     console.log(renamedSaffronLounge5); 
    }    
    catch (e) {
    console.log(e);
    }
    try {
        const renamedSaffronLounge5= await restaurants.rename("", "http://www.mtgarunlounge.com"); 
     console.log(renamedSaffronLounge5); 
    }    
    catch (e) {
    console.log(e);
    }
    try {
        const pizzaLounge1 = await restaurants.get("6165bf81e47c7f404dd94897"); 
     console.log(pizzaLounge1); 
    }
    catch (e) {
    console.log(e);
    };

    const db = await connection.connectToDb();
  await connection.closeConnection();
  console.log('Done!');
    }
    

    main().catch((error) => {
        console.log(error);
      });