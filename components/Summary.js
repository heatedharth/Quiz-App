import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export function Summary({ route }) {
    const { data, answers } = route.params;

    let score = 0;

    const renderChoices = (question, userAnswer, index) => {
        return question.choices.map((choice, i) => {
            const isCorrect =
                question.type === 'multiple-answer'
                    ? question.correct.includes(i)
                    : question.correct === i;

            const wasSelected = question.type === 'multiple-answer'
                ? userAnswer && userAnswer.includes(i)
                : userAnswer === i;

            const choiceStyle = wasSelected
                ? isCorrect
                    ? styles.correctAnswer
                    : styles.wrongAnswer
                : isCorrect
                    ? styles.correctAnswer
                    : styles.defaultAnswer;

            return (
                <Text key={i} style={choiceStyle}>
                    - {choice}
                </Text>
            );
        });
    };

    // Calculate the score by checking each answer
    data.forEach((question, index) => {
        const userAnswer = answers[index];
        if (question.type === 'multiple-answer') {
            if (userAnswer && userAnswer.length === question.correct.length && userAnswer.every(answer => question.correct.includes(answer))) {
                score++;
            }
        } else {
            if (userAnswer === question.correct) {
                score++;
            }
        }
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.scoreText}>Score: {score} / {data.length}</Text>

                {data.map((question, i) => (
                    <View key={i} style={styles.questionBlock}>
                        <Text style={styles.questionText}>{question.prompt}</Text>
                        {renderChoices(question, answers[i], i)}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    inner: {
        maxWidth: 1000,
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    scoreText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    questionBlock: {
        marginBottom: 25,
    },
    questionText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    correctAnswer: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 2,
    },
    wrongAnswer: {
        color: 'red',
        textDecorationLine: 'line-through',
        textAlign: 'center',
        marginVertical: 2,
    },
    defaultAnswer: {
        textAlign: 'center',
        marginVertical: 2,
    },
});