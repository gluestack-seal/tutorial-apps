"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queries {
    constructor() {
        this.FileByPath = `query ($path: String!) {
    files(where: {path: {_eq: $path}}) {
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
        this.FileById = `query ($id: Int!) {
    files(where: {id: {_eq: $id}}) {
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
}
exports.default = new Queries();
