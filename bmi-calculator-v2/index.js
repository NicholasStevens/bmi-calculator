function calculateBMI(weight, height) {
    return weight / (height * height);
}

function calculateBMR(weight, height, ageOfUser, genderOfUser) {
    const heightInCm = height * 100;
    let BMR;
    if (genderOfUser === "m") {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50;
    } else {
        BMR = BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150;
    }
    return BMR;
}

function calculateIdealWeight(height) {
    return 22.5 * height * height;
}

function calculateDailyCalories(BMR, dailyExercise) {
    let dailyCalories;
    if (dailyExercise === "yes") {
        dailyCalories = BMR * 1.6
    } else {
        dailyCalories = BMR * 1.4
    };
    return dailyCalories;
}

function calculateDietWeeks(weightToLose) {
    return Math.abs(weightToLose / 0.5);
}

function calculateDietCalories(weightToLose, dailyCalories) {
    let dietCalories;
    if (weightToLose > 0) {
        dietCalories = dailyCalories - 500;
    } else {
        dietCalories = dailyCalories + 500;
    }
    return dietCalories;
}

function validateNumberOfInputs(argv) {
    if (argv.length !== 7) {
        console.log(`
        You gave ${argv.length - 2} argument(s) to the program
    
        Please provide 5 arguments for
        
        weight (kg), 
        height (m), 
        age (years), 
        wether you exercise daily (yes or no)
        and your gender (m or f)
        
        Example:
    
        $ node index.js 82 1.79 32 yes m
      `);

        process.exit();
    };
}

function validateWeightHeightAndAge(weight, height, ageOfUser, argv) {
    if (isNaN(weight) || isNaN(height) || isNaN(ageOfUser)) {
        console.log(`
           Please make sure weight, height and age are numbers:

       weight(kg) example: 82 | your input: ${argv[2]}
         height(m) example 1.79 | your input: ${argv[3]}
     age(years) example 32 | your input: ${argv[4]} 

     $ node index.js 82 1.79 32 yes m
                 `);
        process.exit();
    }
}
function validateDailyExercise(exercise, argv) {
    if (exercise !== "yes" && exercise !== "no") {
        console.log
            (
                "Please tell us whether you exercise or not using 'yes' or 'no'"
            );
        process.exit();
    }
}

function validateGender(userGender) {
    if (userGender !== "m" && userGender !== "f") {
        console.log(
            "Please let us know your gender by using 'm' or 'f'"
        );
        process.exit()
    }
}

function formatOutput(userObject) {
    return ` ***************

    BMI Calculator: 
   
    ***************
   
    Age: ${userObject.age}
    Weight: ${userObject.weightInKg}
    Height: ${userObject.heightInM}
    Do you exercise daily? ${userObject.dailyExercise}
    Gender: ${userObject.gender}
    ****************
    FACING THE FACTS
    ****************
   
    Your BMI is: ${userObject.BMI}
   
   
    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight
   
    ****************
   
    Your ideal weight is: ${userObject.idealWeight}Kg
   
    With a normal lifestyle you burn ${userObject.dailyCalories} calories per day. 
   
    ******************
    DIET PLAN
    ******************
   
    If you want to acheive your ideal weight of ${userObject.idealWeight}kg:
   
    Try consuming ${userObject.dietCalories} 
    For ${userObject.dietWeeks} weeks.
    `;
}
function bmiCalculator() {
    validateNumberOfInputs(process.argv);
    const weightInKg = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const age = parseInt(process.argv[4]);
    const dailyExercise = process.argv[5];
    const gender = process.argv[6];

    validateWeightHeightAndAge(weightInKg, heightInM, age, process.argv);
    validateDailyExercise(dailyExercise, process.argv);
    validateGender(gender, process.argv);

    const BMI = calculateBMI(weightInKg, heightInM);
    const BMR = calculateBMR(weightInKg, heightInM, age, gender);
    const idealWeight = calculateIdealWeight(heightInM)
    const dailyCalories = calculateDailyCalories(BMR, dailyExercise);
    const weightToLoseKg = weightInKg - idealWeight;
    const dietWeeks = calculateDietWeeks(weightToLoseKg);
    const dietCalories = calculateDietCalories(weightToLoseKg, dailyCalories);

    const user = {
        weightInKg: weightInKg,
        heightInM: heightInM,
        age: age,
        dailyExercise: dailyExercise,
        gender: gender,
        BMI: BMI,
        idealWeight: idealWeight,
        weightToLoseKg: weightToLoseKg,
        BMR: BMR,
        dailyCalories: dailyCalories,
        dietWeeks: dietWeeks,
        dietCalories: dietCalories,
    }
    const output = formatOutput(user);
    console.log(output);
}

bmiCalculator()