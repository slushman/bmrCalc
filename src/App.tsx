import { useState } from "react";
import { useForm } from "react-hook-form";

import "./App.css";

const sixtySix = 66;
const weightMultiplier = 6.2;
const heightMultiplier = 12.7;
const ageMultiplier = 6.76;

type FormValues = {
  activityFactor: number;
  age: number;
  desiredWeight: number;
  height: number;
};

export const App = () => {
  const [bmrResult, setBMRResult] = useState<number>();
  const [activityCaloriesResult, setActivityCaloriesResult] =
    useState<number>();
  const { register, handleSubmit } = useForm<FormValues>();

  const getBmr = (data: FormValues) => {
    const weightMultiplied = weightMultiplier * data.desiredWeight;
    const heightMultiplied = heightMultiplier * data.height;
    const ageMultiplied = ageMultiplier * data.age;

    return sixtySix + weightMultiplied + heightMultiplied - ageMultiplied;
  };

  const calculateBMR = handleSubmit((data) => {
    const bmr = getBmr(data);

    setBMRResult(Math.round(bmr));
  });

  const calculateActivityCalories = handleSubmit((data) => {
    const bmr = getBmr(data);
    const activityCalories = bmr * data.activityFactor;

    setActivityCaloriesResult(Math.round(activityCalories));
  });

  return (
    <div className="prose">
      <form className="flex flex-col items-end mb-8" onSubmit={calculateBMR}>
        <div className="mb-4">
          <label className="mr-2" htmlFor="age">
            Age
          </label>
          <input id="age" {...register("age")} />
        </div>
        <div className="mb-4">
          <label className="mr-2" htmlFor="desiredWeight">
            Desired weight (in pounds)
          </label>
          <input id="desiredWeight" {...register("desiredWeight")} />
        </div>
        <div className="mb-4">
          <label className="mr-2" htmlFor="height">
            Height (in inches)
          </label>
          <input id="height" {...register("height")} />
        </div>
        <button>Submit</button>
      </form>
      {bmrResult && (
        <div className="mb-16">
          Your BMR is <span className="font-bold">{bmrResult} calories</span>.
        </div>
      )}

      {bmrResult && (
        <form
          className="flex flex-col items-end mb-8"
          onSubmit={calculateActivityCalories}
        >
          <h2 className="mb-8">How much activity do you get?</h2>
          <div className="flex mb-4">
            <div className="mb-4">
              <input
                id="activityFactor12"
                name="activityFactor"
                type="radio"
                value={1.2}
                {...register("activityFactor")}
              />
              <label
                className="mr-2 appearance-[button] rounded border-2 border-solid border-sky-500 p-4 relative text-center"
                data-type="radio"
                htmlFor="activityFactor12"
              >
                <span className="mr-2">Little to no activity</span>
              </label>
            </div>
            <div className="mb-4">
              <input
                id="activityFactor13"
                name="activityFactor"
                type="radio"
                value={1.3}
                {...register("activityFactor")}
              />
              <label
                className="mr-2 appearance-[button] rounded border-2 border-solid border-sky-500 p-4 relative text-center"
                data-type="radio"
                htmlFor="activityFactor13"
              >
                <span className="mr-2">Mildly active</span>
              </label>
            </div>
            <div className="mb-4">
              <input
                id="activityFactor14"
                name="activityFactor"
                type="radio"
                value={1.4}
                {...register("activityFactor")}
              />
              <label
                className="mr-2 appearance-[button] rounded border-2 border-solid border-sky-500 p-4 relative text-center"
                data-type="radio"
                htmlFor="activityFactor14"
              >
                <span className="mr-2">Moderately active</span>
              </label>
            </div>
            <div className="mb-4">
              <input
                id="activityFactor15"
                name="activityFactor"
                type="radio"
                value={1.5}
                {...register("activityFactor")}
              />
              <label
                className="mr-2 appearance-[button] rounded border-2 border-solid border-sky-500 p-4 relative text-center"
                data-type="radio"
                htmlFor="activityFactor15"
              >
                <span className="mr-2">Extremely active</span>
              </label>
            </div>
          </div>
          <button>Submit activity</button>
        </form>
      )}
      {activityCaloriesResult && (
        <div className="mb-16">
          You will need{" "}
          <span className="font-bold">{activityCaloriesResult} calories</span>{" "}
          every day to reach your desired weight.
        </div>
      )}
      {activityCaloriesResult && (
        <div>
          <h2 className="mb-4">Required macros</h2>
          <ul className="flex gap-8 justify-center" role="list">
            <li>
              <h3>Protein</h3>
              <div>
                {Math.round((activityCaloriesResult * 0.25) / 4)} grams per day
              </div>
            </li>
            <li>
              <h3>Carbohydrates</h3>
              <div>
                {Math.round((activityCaloriesResult * 0.5) / 4)} grams per day
              </div>
            </li>
            <li>
              <h3>Fat</h3>
              <div>
                {Math.round((activityCaloriesResult * 0.25) / 9)} grams per day
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
