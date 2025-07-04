import type { AssessmentStep } from "./types"

export const assessmentSteps: AssessmentStep[] = [
  {
    id: 1,
    title: "Personal Strengths",
    image: "/images/strength-woman.jpg",
    questions: [
      {
        id: "personal_admire",
        type: "textarea",
        question: "What do you admire or like the most about yourself?",
        description: "Consider your personal qualities, values, or accomplishments...",
        required: true,
      },
      {
        id: "personal_qualities",
        type: "textarea",
        question: "What personal qualities or strengths help you navigate difficult times in life?",
        description: "Think about resilience, patience, creativity, determination...",
        required: true,
      },
    ],
  },
  {
    id: 2,
    title: "Personal Qualities and Characteristics",
    image: "/images/self-reflection.jpg",
    questions: [
      {
        id: "characteristics",
        type: "checkbox",
        question: "Mark your top 3 personal characteristics out of this list:",
        description: "I am...",
        options: [
          "Honest",
          "Caring",
          "Hopeful",
          "Hardworking",
          "Easy to talk to",
          "Sensitive",
          "Intelligent",
          "Reliable",
          "Friendly",
          "Generous",
        ],
        maxSelections: 3,
        required: true,
      },
    ],
  },
  {
    id: 3,
    title: "Talents and Skills",
    image: "/images/talents-skills.jpg",
    questions: [
      {
        id: "talents_skills",
        type: "multiple-text",
        question: "List your top 3 personal talents and skills:",
        description:
          "Examples: I am a good cook, I am good at budgeting, I am good at computers, I have a good memory, I know a lot about music, I am good at writing poetry",
        required: true,
      },
    ],
  },
  {
    id: 4,
    title: "Coping",
    image: "/images/self-care.jpg",
    questions: [
      {
        id: "enjoy_doing",
        type: "textarea",
        question: "What do you enjoy doing the most?",
        description: "Activities, hobbies, or moments that bring you joy...",
        required: true,
      },
      {
        id: "coping_activities",
        type: "textarea",
        question: "What activities or routines help you cope with stress and difficult emotions?",
        description: "Consider exercise, nature, art, music, journaling...",
        required: true,
      },
      {
        id: "manage_challenges",
        type: "textarea",
        question: "How do you manage life challenges or painful feelings?",
        description: "Think about strategies that help you feel better when you're struggling...",
        required: true,
      },
    ],
  },
  {
    id: 5,
    title: "Social Support",
    image: "/images/community-support.jpg",
    questions: [
      {
        id: "rely_on_support",
        type: "textarea",
        question: "Who can you rely on for your safety and support?",
        description: "Consider friends, family, mentors, community members...",
        required: true,
      },
      {
        id: "past_support",
        type: "textarea",
        question: "What support systems have helped you in the past?",
        description: "Think about people, organizations, or services that were helpful...",
        required: true,
      },
      {
        id: "feel_safe",
        type: "textarea",
        question: "If you don't have someone to rely on, what would help you feel safe?",
        description: "Consider resources, connections, or supports that might help...",
        required: false,
      },
    ],
  },
  {
    id: 6,
    title: "Strengths in Your Environment",
    image: "/images/community-connections.jpg",
    questions: [
      {
        id: "environment_strengths",
        type: "multiple-text",
        question: "List the top 3 strengths you find in your environment:",
        description:
          "Examples: I have a safe and comfortable home I really like, I have a good relationship with the local shopkeeper, I have someone who goes with me to appointments, I am part of a local church, mosque, temple or other place of my religion, I have a pet I am very fond of, I use local library service, I have a neighbor I get on well with, I have links to local healthcare facility, Any other strengths in your environment that are not mentioned",
        required: true,
      },
    ],
  },
  {
    id: 7,
    title: "Resilience and Growth",
    image: "/images/growth-resilience.jpg",
    questions: [
      {
        id: "big_challenge",
        type: "textarea",
        question:
          "Can you share a time when you faced a big challenge after a stressful experience? How did you handle it?",
        description: "Think about how you responded and what helped you through it...",
        required: true,
      },
      {
        id: "learned_from_challenge",
        type: "textarea",
        question: "What did you learn from a challenging experience?",
        description: "Consider insights, wisdom, or understanding you gained...",
        required: true,
      },
      {
        id: "personal_growth",
        type: "textarea",
        question: "In what ways have you noticed yourself changing or growing as a person since experiencing trauma?",
        description: "Think about positive changes in perspective, priorities, or strengths...",
        required: true,
      },
    ],
  },
  {
    id: 8,
    title: "Personal Interests & Aspirations",
    image: "/images/goals-aspirations.jpg",
    questions: [
      {
        id: "interests_aspirations",
        type: "multiple-text",
        question: "List your top 3 interests or aspirations and the 1st step you will need to accomplish them:",
        description:
          "Examples: I would like to have a paid job, I would like to be happy and settled, I would like to have my own car one day, I would like to learn how to cook, I would like to buy a new house",
        required: true,
      },
    ],
  },
]
