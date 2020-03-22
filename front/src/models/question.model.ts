export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
    id: number;
}

export interface Question {
    label: string;
    answers: Answer[];
    iconClass?: string;
    id: number;
}
