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
  createdAt: string;
  modifiedAt: string;
  member_id: number;
  content: string;
}
