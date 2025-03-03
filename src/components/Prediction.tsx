import React from "react";
import {
  education,
  occupation,
  dwelling,
  refuse,
  religion,
  income,
  tribe,
  sanitation,
  howOften,
  marital,
  source,
} from "@/utils/dataTools";

function Prediction() {
  const [formData, setFormData] = React.useState({
    age: "",
    education: "Tertiary education",
    income: ">250,000",
    occupation: "Private sector employee",
    religion: "Christian",
    tribe: "Hausa",
    maritalStatus: "Married",
    malaria: "Yes",
    infection: "Yes",
    diarrhea: "Yes",
    protein: "Daily",
    greenLeaf: "Daily",
    fruits: "Daily",
    iron: "Daily",
    breastfed: "Yes",
    vitamins: "Yes",
    dewormed: "Yes",
    dwelling: "> / = 4 Bedroom house",
    householdNum: "",
    sanitation: "Flush toilet",
    toiletNum: "",
    waterSource: "Borehole",
    mosquitoNet: "Yes",
    refuse: "Daily",
    weight: "",
    height: "",
    bmi: "",
    gender: "Male",
    hemoglobin: "",
  });
  const [prediction, setPrediction] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const options = ["Yes", "No"];

  const datagender: Record<string, number> = { Male: 0, Female: 1 };

  const dataeducation: Record<string, number> = {
    "Tertiary education": 0,
    "Primary education": 1,
    "Secondary education": 2,
    "No formal education": 3,
  };

  const dataoccupation: Record<string, number> = {
    "Private sector employee": 0,
    "Self-employed": 1,
    Unemployed: 2,
    "Government employee": 3,
    Others: 4,
  };

  const dataincome: Record<string, number> = {
    ">250,000": 0,
    ">200,000 - 250,000": 1,
    ">100,000 - 150,000": 2,
    ">50,000 - 100,000": 3,
    ">25,000 - 50,000": 4,
    "<25,000": 5,
  };

  const datareligion: Record<string, number> = { Christian: 0, Muslim: 1, Other: 2 };

  const datatribe: Record<string, number> = { Hausa: 0, Igbo: 1, Yoruba: 2 };

  const datamarital: Record<string, number> = {
    Married: 0,
    Single: 1,
    "Widowed / Widower": 2,
    Divorced: 3,
    Separated: 4,
  };

  const dataoption: Record<string, number> = { Yes: 0, No: 1 };

  const datahowOften: Record<string, number> = {
    Daily: 0,
    Weekly: 1,
    Rarely: 2,
    "N/A": 3,
    "0 - 6 months": 4,
    Never: 5,
  };

  const datadwelling: Record<string, number> = {
    "> / = 4 Bedroom house": 0,
    "2 Bedroom flat": 1,
    "One Bedroom self-contained": 2,
    Others: 3,
  };

  const datasanitation: Record<string, number> = { "Flush toilet": 0, "Pit latrine": 1, None: 2 };

  const datasource: Record<string, number> = { Borehole: 0, "Tap water": 1, Well: 2 };

  const datarefuse: Record<string, number> = { Daily: 0, Weekly: 1, "Twice Weekly": 2 };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setPrediction("");

    const form = {
      Age: Number(formData.age), // Convert to integer
      Gender: datagender[formData.gender], // Keep as string
      Education: dataeducation[formData.education],
      Income: dataincome[formData.income],
      Occupation: dataoccupation[formData.occupation],
      Religion: datareligion[formData.religion],
      Tribe: datatribe[formData.tribe],
      MaritalStatus: datamarital[formData.maritalStatus],
      Malaria: dataoption[formData.malaria],
      RespiratoryInfection: dataoption[formData.infection],
      Diarrhea: dataoption[formData.diarrhea],
      Protein: datahowOften[formData.protein],
      GreenLeaf: datahowOften[formData.greenLeaf],
      Fruits: datahowOften[formData.fruits],
      IronFortified: datahowOften[formData.iron],
      Breastfed: dataoption[formData.breastfed],
      Vitamins: dataoption[formData.vitamins],
      Dewormed: dataoption[formData.dewormed],
      Dwelling: datadwelling[formData.dwelling],
      HouseholdNum: Number(formData.householdNum),
      Sanitation: datasanitation[formData.sanitation],
      ToiletNum: Number(formData.toiletNum),
      WaterSource: datasource[formData.waterSource],
      MosquitoNet: dataoption[formData.mosquitoNet],
      Refuse: datarefuse[formData.refuse],
      Weight: Number(formData.weight), // Convert to float
      Height: Number(formData.height),
      Bmi: Number(formData.bmi),
      Hemoglobin: Number(formData.hemoglobin),
    };

    console.log(form)

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      
      setPrediction(data.anemia);
    } catch (err: any) {
      setPrediction(
        "There was trouble receiving your prediction: " + err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Predict Childhood Anemia
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-black"
      >
        <input
          className="mb-2 p-2 border rounded w-full"
          type="number"
          step="1"
          min={1}
          placeholder="Age (in months)"
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
        />
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, education: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Parent/Guardian's Education Level
          </option>
          {education.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) => setFormData({ ...formData, income: e.target.value })}
          required
        >
          <option value="" disabled>
            Approximate Combined Monthly Family Income (Naira)
          </option>
          {income.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, occupation: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Parent/Guardian's Occupation
          </option>
          {occupation.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, religion: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Parent/Guardian's Religion
          </option>
          {religion.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) => setFormData({ ...formData, tribe: e.target.value })}
          required
        >
          <option value="" disabled>
            Parent/Guardian's Tribe
          </option>
          {tribe.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, maritalStatus: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Marital Status of Informant
          </option>
          {marital.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, malaria: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Malaria?
          </option>
          {options.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, infection: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Respiratory infection?
          </option>
          {options.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, diarrhea: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Diarrhea?
          </option>
          {options.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, protein: e.target.value })
          }
          required
        >
          <option value="" disabled>
            How often does the child eat food rich in Protein (e.g meat, eggs,
            beans)
          </option>
          {howOften.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, greenLeaf: e.target.value })
          }
          required
        >
          <option value="" disabled>
            How often does the child eat food that contains Green leaf
            vegetables?
          </option>
          {howOften.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) => setFormData({ ...formData, iron: e.target.value })}
          required
        >
          <option value="" disabled>
            How often does the child eat Iron-fortified foods?
          </option>
          {howOften.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) => setFormData({ ...formData, fruits: e.target.value })}
          required
        >
          <option value="" disabled>
            How often does the child eat fruits
          </option>
          {howOften.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, vitamins: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Does your child take Vitamin Supplements?
          </option>
          {options.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, breastfed: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Was the child exclusively breastfed?
          </option>
          {options.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, dewormed: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Has the child been dewormed before?
          </option>
          {options.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, sanitation: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Sanitation Facilities in Household
          </option>
          {sanitation.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, dwelling: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Family Dwelling
          </option>
          {dwelling.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, mosquitoNet: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Does the child regularly sleep under an insecticide-treated mosquito
            net?
          </option>
          {options.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) =>
            setFormData({ ...formData, waterSource: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Water Source for Household
          </option>
          {source.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) => setFormData({ ...formData, refuse: e.target.value })}
          required
        >
          <option value="" disabled>
            Refuse/Waste Disposal Frequency
          </option>
          {refuse.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <input
          className="mb-2 p-2 border rounded w-full"
          type="number"
          step="1"
          min={1}
          placeholder="Number of People in the Household"
          onChange={(e) =>
            setFormData({ ...formData, householdNum: e.target.value })
          }
          required
        />
        <input
          className="mb-2 p-2 border rounded w-full"
          type="number"
          step="1"
          min={1}
          placeholder="Number of Toilets"
          onChange={(e) =>
            setFormData({ ...formData, toiletNum: e.target.value })
          }
          required
        />
        <input
          className="mb-2 p-2 border rounded w-full"
          type="number"
          step="any"
          min={1}
          placeholder="Weight (kg)"
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          required
        />
        <input
          className="mb-2 p-2 border rounded w-full"
          type="number"
          step="any"
          min={1}
          placeholder="Height (cm)"
          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
          required
        />
        <input
          className="mb-2 p-2 border rounded w-full"
          type="number"
          step="any"
          min={15}
          max={35}
          placeholder="BMI (calculated)"
          onChange={(e) => setFormData({ ...formData, bmi: e.target.value })}
          required
        />
        <select
          className="mb-2 p-2 border rounded w-full"
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          required
        >
          <option defaultValue="" disabled>
            Gender of child
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          className="mb-2 p-2 border rounded w-full"
          step="any"
          type="number"
          min={1}
          placeholder="Hemoglobin Level (Hb) (g/dL) by Non-Invasive Device"
          onChange={(e) =>
            setFormData({ ...formData, hemoglobin: e.target.value })
          }
          required
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          {loading ? "Loading..." : "Predict"}
        </button>
      </form>
      {prediction && (
        <p className="text-lg text-center mt-4 text-black">
          Prediction: {prediction === "true" ? "Anemia is high" : "No anemia / normal" }
        </p>
      )}
    </div>
  );
}

export default Prediction;
