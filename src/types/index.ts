export interface Option {
	id: string;
	text: string;
}

export interface QuestionBase {
	id: string;
	question: string;
	type: "single-choice" | "multiple-choice" | "textual";
	correctAnswer: string;
}

export interface ChoiceQuestion extends QuestionBase {
	options: Option[];
}

export interface TextQuestion extends QuestionBase {
	textType: "short" | "long";
}

export type QuestionData = ChoiceQuestion | TextQuestion;
