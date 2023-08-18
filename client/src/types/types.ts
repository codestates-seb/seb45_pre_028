export interface Question {
  questionData: QuestionData[];
  pageInfo: PageInfo;
}

export interface QuestionData {
  id?: string;
  questionId: number;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

export interface Answer {
  answerData: AnswerData[];
  pageInfo: PageInfo;
}

export interface AnswerData {
  id?: string;
  questionId: number;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
