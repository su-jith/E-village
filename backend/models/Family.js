const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Sub-schema for Personal Details (collected by the employee)
const PersonalDetailsSchema = new Schema({
  fullName: { type: String, required: true },
  gender: { type: String },
  dateOfBirth: { type: Date },
  relationship: { type: String }, // Relationship to head of family
  maritalStatus: { type: String },
  contact: {
    phone: { type: String },
    email: { type: String }
  },
  identification: {
    aadhaar: { type: String },
    voterId: { type: String },
    rationCard: { type: String },
    panCard: { type: String }
  },
  education: {
    highestQualification: { type: String },
    currentStatus: { type: String }, // e.g., School/College Name, Grade, etc.
    skills: [{ type: String }]
  },
  employment: {
    occupation: { type: String },
    employer: { type: String },
    monthlyIncome: { type: Number },
    employmentType: { type: String }, // Government/Private/Self-employed/Unemployed
    jobPreferences: { type: String }
  },
  governmentBenefits: {
    pension: { type: String },
    scholarship: { type: String },
    rationEntitlement: { type: String },
    otherAssistance: { type: String }
  },
  property: {
    landOwnership: { type: Boolean },
    agriculturalLandDetails: { type: String }, // e.g., Size, Crops Grown
    houseType: { type: String } // Owned/Rented
  }
}, { _id: false });

// Sub-schema for Health Details (collected by the health worker)
const HealthDetailsSchema = new Schema({
  // Basic Health Information
  bloodGroup: { type: String },
  height: { type: Number },
  weight: { type: Number },
  allergies: { type: String },
  disabilityStatus: { type: String },
  // Medical History
  chronicDiseases: { type: String }, // e.g., Diabetes, Hypertension, etc.
  pastSurgeries: { type: String },
  familyMedicalHistory: { type: String },
  // Vaccination & Immunization
  routineVaccines: { type: String },
  covidStatus: { type: String },
  seasonalVaccines: { type: String }, // e.g., Flu, Pneumonia
  // Maternal & Child Health
  pregnancyStatus: { type: String },
  expectedDeliveryDate: { type: Date },
  childGrowthMonitoring: { type: String }, // e.g., Weight, Height monitoring
  // Health Checkups & Screenings
  lastCheckupDate: { type: Date },
  bloodSugar: { type: String },
  bpReadings: { type: String },
  eyeDentalCheckup: { type: String },
  // Medication & Treatment
  currentMedications: { type: String },
  hospitalizationHistory: { type: String },
  // Mental Health
  mentalHealthHistory: { type: String },
  therapySessions: { type: String },
  // Health Insurance & Government Schemes
  insuranceType: { type: String },
  insuranceCoverage: { type: String },
  govtHealthScheme: { type: String },
  // Lifestyle & Hygiene
  lifestyle: { type: String }, // e.g., Smoking, Alcohol, Exercise, Nutrition
  // Disease Outbreak Monitoring
  infectiousDiseaseHistory: { type: String }, // e.g., TB, Malaria, Dengue
  epidemicSymptoms: { type: String } // e.g., COVID-19, Swine Flu
}, { _id: false });

// Family member schema that embeds both personal and health details
const FamilyMemberSchema = new Schema({
  personalDetails: { type: PersonalDetailsSchema, required: true },
  healthDetails: { type: HealthDetailsSchema } // This may be added later by the health worker
}, { _id: false });

// Family schema: aggregates all family members under the same house number
const FamilySchema = new Schema({
  houseNumber: { type: String, required: true, unique: true },
  ward: { type: Number, required: true },
  address: { type: String },
  familyMembers: [FamilyMemberSchema]
}, { timestamps: true });

module.exports = mongoose.model('Family', FamilySchema);
