export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  rating: number;
  image: string;
};

import doc1 from "@/assets/doc-1.jpg";
import doc2 from "@/assets/doc-2.jpg";
import doc3 from "@/assets/doc-3.jpg";
import doc4 from "@/assets/doc-4.jpg";

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Sarah Malik",
    specialty: "Cardiologist",
    experience: "12+ yrs",
    availability: "Mon – Fri",
    rating: 4.9,
    image: doc1,
  },
  {
    id: "d2",
    name: "Dr. Ahmed Raza",
    specialty: "Neurologist",
    experience: "10+ yrs",
    availability: "Tue – Sat",
    rating: 4.8,
    image: doc2,
  },
  {
    id: "d3",
    name: "Dr. Ayesha Khan",
    specialty: "Pediatrician",
    experience: "8+ yrs",
    availability: "Mon – Sat",
    rating: 4.9,
    image: doc3,
  },
  {
    id: "d4",
    name: "Dr. Imran Sheikh",
    specialty: "Orthopedic Surgeon",
    experience: "15+ yrs",
    availability: "Wed – Sun",
    rating: 4.7,
    image: doc4,
  },
];

export const departments = [
  { name: "Cardiology", desc: "Advanced heart care and diagnostics." },
  { name: "Neurology", desc: "Brain, spine & nervous system specialists." },
  { name: "Pediatrics", desc: "Loving care for infants and children." },
  { name: "Orthopedics", desc: "Bone, joint & sports injury experts." },
  { name: "Radiology", desc: "High-precision imaging & scans." },
  { name: "Emergency", desc: "24 / 7 rapid response and trauma." },
];

export const testimonials = [
  {
    name: "Hina R.",
    role: "Patient",
    quote:
      "From the moment I walked in, the team made me feel safe. Diagnosis was quick and the care was truly world-class.",
  },
  {
    name: "Bilal A.",
    role: "Patient",
    quote:
      "The facilities feel like a five-star hotel, but the medical expertise is what really stands out. Highly recommended.",
  },
  {
    name: "Fatima S.",
    role: "Parent",
    quote:
      "Dr. Ayesha was incredible with our daughter. Warm, patient and deeply knowledgeable. Thank you Al Meer.",
  },
];
