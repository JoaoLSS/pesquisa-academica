export {};

declare global {
	export interface Alternative {
		title: string;
	}

	export interface Question {
		title: string;
		alternatives: Alternative[];
	}

	export interface Survey {
		title: string;
		questions: Question[];
	}
}
