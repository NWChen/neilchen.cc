export enum Tag {
  Project = "project",
  Note = "note"
}

export type PostMetadata = {
  title?: string;
  date?: string;
  description?: string;
  slug: string;
  hidden?: boolean;
  image_path?: string;
  redirect_uri?: string;
  tag?: Tag;
}

export type PostProps = {
  metadata: PostMetadata;
  content: string;
};
