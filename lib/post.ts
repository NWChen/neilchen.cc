enum Tag {
  Project = "project",
  Note = "note"
}

type PostMetadata = {
  title?: string;
  date?: string;
  description?: string;
  slug: string;
  image_path?: string;
  tag?: Tag;
}

type PostProps = {
  metadata: PostMetadata;
  content: string;
};