export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
}

export interface Question {
    label: string;
    answers: Answer[];
    iconClass?: string;
    id: number;
}
