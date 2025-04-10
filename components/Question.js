import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

export function Question() {
    const navigation = useNavigation();
    const route = useRoute();
    const { data, index, answers } = route.params;

    const question = data[index];
    const [selected, setSelected] = useState(
        question.type === 'multiple-answer' ? [] : null
    );

    const isMultipleAnswer = question.type === 'multiple-answer';

    const handleSelect = (i) => {
        if (isMultipleAnswer) {
            if (selected.includes(i)) {
                setSelected(selected.filter((x) => x !== i));
            } else {
                setSelected([...selected, i]);
            }
        } else {
            setSelected(i);
        }
    };

    const handleNext = () => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = selected;

        if (index + 1 < data.length) {
            navigation.push('Question', {
                data,
                index: index + 1,
                answers: updatedAnswers,
            });
        } else {
            navigation.navigate('Summary', {
                data,
                answers: updatedAnswers,
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.prompt}>{question.prompt}</Text>

                <ButtonGroup
                    testID="choices"
                    onPress={handleSelect}
                    selectedIndexes={isMultipleAnswer ? selected : undefined}
                    selectedIndex={!isMultipleAnswer ? selected : undefined}
                    buttons={question.choices}
                    containerStyle={styles.choicesContainer}
                    buttonStyle={styles.choiceButton}
                    selectedButtonStyle={styles.selectedButton}
                    textStyle={styles.choiceText}
                    vertical
                />

                <View style={styles.nextButton}>
                    <Button title="NEXT" onPress={handleNext} testID="next-question" />
                </View>
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
    prompt: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    choicesContainer: {
        marginBottom: 30,
        borderRadius: 8,
        borderWidth: 0,
    },
    choiceButton: {
        marginVertical: 5,
        borderRadius: 8,
    },
    selectedButton: {
        backgroundColor: '#3498db',
    },
    choiceText: {
        textAlign: 'center',
    },
    nextButton: {
        marginTop: 20,
    },
});
