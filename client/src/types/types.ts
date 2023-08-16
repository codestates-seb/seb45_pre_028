export interface Question {
  id: string;
  title: string;
  createdAt: string;
  modifiedAt: string;
  member_id: number;
  content: string;
}

export interface Answer {
  answer_id: number;
  title: string;
  createdAt: string;
  modifiedAt: string;
  member_id: number;
  question_id: string;
}
