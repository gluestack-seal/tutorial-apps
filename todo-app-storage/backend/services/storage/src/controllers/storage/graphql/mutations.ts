class Mutations {
  public InsertFile = `mutation ($name: String!, $original_name: String!, $size: Int!, $mime_type: String!, $etag: String!, $path: String!, $is_public: Boolean) {
    insert_files_one(object: {name: $name, original_name: $original_name, size: $size, mime_type: $mime_type, etag: $etag, path: $path, is_public: $is_public}) {
      id
      name
      original_name
      size
      mime_type
      etag
      path
      is_public
      created_at
      updated_at
    }
  }`;
}

export default new Mutations();
