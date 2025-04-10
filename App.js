import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Question } from './components/Question';
import { Summary } from './components/Summary';

const Stack = createNativeStackNavigator();

const quizData = [
  {
    prompt: "What is the logo on the UCF tab?",
    type: "multiple-choice",
    choices: ["Pegasus", "Prince", "Cardinal", "Mustang"],
    correct: 0, // correct: "choice 1"
  },
  {
    prompt: "Which animal breathes underwater?",
    type: "multiple-answer",
    choices: ["Fish", "Lizard", "Seahorse", "Cats"],
    correct: [0, 2], // correct: "choice 1", "choice 3"
  },
  {
    prompt: "Is grass green?",
    type: "true-false",
    choices: ["False", "True"],
    correct: 1, // correct: "True"
  }
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen name="Question" component={Question} initialParams={{ data: quizData, index: 0, answers: [] }} />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { Question, Summary };
