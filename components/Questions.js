import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

export function Question({ route, navigation }) {
    const { data, index, answers } = route.params;
    const question = data[index];
    const [selected, setSelected] = useState(
        question.type === 'multiple-answer' ? [] : null
    );

    const handlePress = (i) => {
        if (question.type === 'multiple-answer') {
            setSelected((prev) =>
                prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
            );
        } else {
            setSelected(i);
        }
    };

    const isCorrect = () => {
        if (question.type === 'multiple-answer') {
            const correctSet = new Set(question.correct);
            const selectedSet = new Set(selected);
            return correctSet.size === selectedSet.size &&
                [...correctSet].every(x => selectedSet.has(x));
        } else {
            return selected === question.correct;
        }
    };

    const handleNext = () => {
        const updatedAnswers = [...answers, { selected, correct: question.correct, type: question.type }];
        if (index + 1 < data.length) {
            navigation.push('Question', {
                data,
                index: index + 1,
                answers: updatedAnswers,
            });
        } else {
            navigation.navigate('Summary', { data, answers: updatedAnswers });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.prompt}>{question.prompt}</Text>
            <ButtonGroup
                buttons={question.choices}
                vertical
                onPress={handlePress}
                selectedIndexes={question.type === 'multiple-answer' ? selected : undefined}
                selectedIndex={question.type !== 'multiple-answer' ? selected : undefined}
                testID="choices"
                containerStyle={styles.group}
            />
            <Button title="Next" onPress={handleNext} testID="next-question" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    prompt: { fontSize: 18, marginBottom: 20 },
    group: { marginBottom: 20 }
});
