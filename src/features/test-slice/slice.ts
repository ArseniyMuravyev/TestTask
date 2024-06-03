import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { questionData } from "../../data/questions";
import { RootState } from "../../store/store";

interface InitialState {
	currentQuestionIndex: number;
	selectedAnswers: { [questionId: string]: string[] };
	correctCount: number;
	showResults: boolean;
}

const initialState: InitialState = {
	currentQuestionIndex: 0,
	selectedAnswers: {},
	correctCount: 0,
	showResults: false,
};

const testSlice = createSlice({
	name: "test",
	initialState: initialState,
	reducers: {
		answerQuestion: (
			state,
			action: PayloadAction<{ questionId: string; answer: string[] }>
		) => {
			const { questionId, answer } = action.payload;
			state.selectedAnswers[questionId] = answer;
		},
		nextQuestion: (state) => {
			state.currentQuestionIndex += 1;
		},
		restartTest: (state) => {
			state.currentQuestionIndex = 0;
			state.selectedAnswers = {};
			state.correctCount = 0;
			state.showResults = false;
		},
		setShowResults: (state, action) => {
			state.showResults = action.payload;
		},
		setCorrectCount: (state, action) => {
			state.correctCount = action.payload;
		},
		previousQuestion: (state) => {
			if (state.currentQuestionIndex > 0) {
				state.currentQuestionIndex -= 1;
				const currentQuestion = questionData[state.currentQuestionIndex];
				const previousAnswers = state.selectedAnswers[currentQuestion.id] || [];

				if (currentQuestion.type === "multiple-choice") {
					const correctAnswers = currentQuestion.correctAnswer.split(",");
					const correctCount = previousAnswers.reduce((count, answer) => {
						return correctAnswers.includes(answer) ? count + 1 : count;
					}, 0);
					state.correctCount = Math.max(0, state.correctCount - correctCount);
				} else {
					const isCorrectAnswer = previousAnswers.includes(
						currentQuestion.correctAnswer
					);
					state.correctCount = isCorrectAnswer
						? state.correctCount - 1
						: state.correctCount;
				}
			}
		},
	},
});

export const saveState = (state: RootState) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem("state", serializedState);
	} catch (error) {
		console.error(error);
	}
};

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem("state");
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch {
		return undefined;
	}
};

export const {
	answerQuestion,
	nextQuestion,
	restartTest,
	setShowResults,
	setCorrectCount,
	previousQuestion,
} = testSlice.actions;

export default testSlice.reducer;
