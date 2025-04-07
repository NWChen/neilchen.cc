import { GetStaticProps } from 'next';

export enum Tag {
  Project = "project",
  Note = "note"
}

export type PostMetadata = {
  title?: string;
  date?: string;
  description?: string;
  slug: string;
  image_path?: string;
  tag?: Tag;
}

export type PostProps = {
  metadata: PostMetadata;
  content: string;
};

