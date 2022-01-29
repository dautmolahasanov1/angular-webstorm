export interface Listing {
  id: number;
  title: string;
  description?: string;
  likeCount: number;
  type: string;
  category: string;
  applicantIds: number[]
}
