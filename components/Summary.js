import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Summary({ route }) {
    const { data, answers } = route.params;

    const getScore = () => {
        return answers.reduce((score, answer, i) => {
            const correct = data[i].correct;
            if (answer.type === 'multiple-answer') {
                const aSet = new Set(answer.selected);
                const cSet = new Set(correct);
                if (aSet.size === cSet.size && [...aSet].every(x => cSet.has(x))) return score + 1;
            } else if (answer.selected === correct) {
                return score + 1;
            }
            return score;
        }, 0);
    };

    return (
        <View style={styles.container}>
            <Text testID="total" style={styles.score}>Score: {getScore()} / {data.length}</Text>
            {data.map((q, i) => (
                <View key={i} style={styles.questionBlock}>
                    <Text style={styles.prompt}>{q.prompt}</Text>
                    {q.choices.map((choice, j) => {
                        const userSelected = answers[i].selected;
                        const isCorrect = Array.isArray(q.correct) ? q.correct.includes(j) : q.correct === j;
                        const wasChosen = Array.isArray(userSelected) ? userSelected.includes(j) : userSelected === j;
                        const style = {
                            fontWeight: isCorrect && wasChosen ? 'bold' : 'normal',
                            textDecorationLine: !isCorrect && wasChosen ? 'line-through' : 'none',
                        };
                        return (
                            <Text key={j} style={style}>- {choice}</Text>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    score: { fontSize: 22, marginBottom: 20 },
    questionBlock: { marginBottom: 15 },
    prompt: { fontSize: 16, fontWeight: '600', marginBottom: 5 }
});
