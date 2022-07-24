declare global {
  interface Window {
    kakao: any;
  }
}

export type CafeType = Array<{
  __typename?: 'Cafe';
  id: number;
  name: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  description?: string | null;
  countLikes: number;
  isLiked: boolean;
  photos?: Array<{ __typename?: 'CafePhoto'; url: string } | null> | null;
  categories?: Array<{
    __typename?: 'Category';
    name: string;
    slug: string;
  } | null> | null;
  user: { __typename?: 'User'; username: string; avatarUrl?: string | null };
} | null>;

interface UpdateCafeFormValues {
  name: string;
  address: string;
  description: string;
  files: FileList;
  result: string;
}

interface IPhotoObjArr {
  id?: number;
  url?: string;
  key?: number;
}
