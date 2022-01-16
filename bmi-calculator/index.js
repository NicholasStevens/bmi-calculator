console.log("What does process.argv contain?", process.argv);


const weightInKg = parseInt(process.argv[2]);
const heightInM = parseFloat(process.argv[3]);
const ageInYears = parseInt(process.argv[4]);
const dailyExercise = process.argv[5];
const gender = process.argv[6];

if (process.argv.length !== 7) {
    console.log(`
      You gave ${process.argv.length - 2} arguments(s) to the program
  
      Please provide 5 arguments for
      
      weight (kg), 
      height (m), 
      age (years), 
      whether you exercise daily (yes or no)
      and your gender (m or f)
      
      Example:
  
      $ node index.js 82 1.79 32 yes m
    `);

    process.exit();
};

if (isNaN(weightInKg) || isNaN(heightInM) || isNaN(ageInYears)) {
    console.log(`
      Please make sure weight, height and age are numbers:
  
      weight (kg) example: 82 | your input: ${process.argv[2]}
      height (m) example 1.79 | your input: ${process.argv[3]}
      age (years) example 32  | your input: ${process.argv[4]} 
  
      $ node index.js 82 1.79 32 yes m
    `);

    process.exit();
};

if (ageInYears < 20) {
    console.log("Sorry, this app only works for users over 20 years of age.");
    process.exit();
};

if (dailyExercise !== "yes" && dailyExercise !== "no") {
    console.log(
        "Please tell us whether you exercise or not using 'yes' or 'no'");
    process.exit();
};

if (weightInKg < 30 || weightInKg > 300) {
    console.log("Please provide a number for weight in kilograms between 30 and 300  eg. '100' ");
    process.exit();
};
// The formula for BMI is: weight (kg) / (height (m) x height (m))

const BMI = weightInKg / (heightInM * heightInM);

// The formula for ideal weight is: ideal BMI * height * height

const idealWeight = 22.5 * heightInM * heightInM;

// The formula for BMR = 10 x weight (kg) + 6.25 x height (cm) - 5 x age

let BMR;
if (gender === "m") {
    BMR = (10 * weightInKg) + (6.25 * (heightInM * 100)) - (5 * ageInYears) + 50;
} else if (gender === "f") {
    BMR = (10 * weightInKg) + (6.25 * (heightInM * 100)) - (5 * ageInYears) - 150;
} else {
    console.log("Please specify gender");
}
// The formula for "Normal lifestyle" calorie usage is BMR * 1.4

let dailyCalories;

if (dailyExercise === "yes") {
    dailyCalories = BMR * 1.6;
} else {
    dailyCalories = BMR * 1.4;
}


// Weight to lose formula: weight (kg) - ideal weight (kg)

const weightToLose = weightInKg - idealWeight;

// time to reach ideal weight:  amount of weight to lose / 0.5

const timeToIdealWeight = Math.abs(weightToLose / 0.5);

// amount of calories you need to consume while dieting is: your daily usage - 500

let caloriesOnDiet;
if (weightToLose > 0) {
    caloriesOnDiet = dailyCalories - 500;
} else {
    caloriesOnDiet = dailyCalories + 500;
}


console.log(`
 ***************

 BMI Calculator: 

 ***************

 Age: ${ageInYears}
 Weight: ${weightInKg}
 Height: ${heightInM}
 Do you exercise daily? ${dailyExercise}
 Gender: ${gender}
 ****************
 FACING THE FACTS
 ****************

 Your BMI is: ${Math.round(BMI)}


 A BMI under 18.5 is considered underweight
 A BMI above 25 is considered overweight

 ****************

 Your ideal weight is: ${Math.round(idealWeight)}Kg

 With a normal lifestyle you burn ${Math.round(dailyCalories)} calories per day. 

 ******************
 DIET PLAN
 ******************

 If you want to acheive your ideal weight of ${Math.round(idealWeight)}kg:

 Try consuming ${Math.round(caloriesOnDiet)} 
 For ${Math.round(timeToIdealWeight)} weeks.
 `
)